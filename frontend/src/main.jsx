import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import MainPage from './page/MainPage.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UploadForm from "./component/UploadForm.jsx";
import FilterPage from "./page/FilterPage.jsx";
import ProductPage from "./page/ProductPage.jsx";
import UploadInstrumentPage from "./page/UploadInstrumentPage.jsx";
import AboutMePage from "./page/AboutMePage.jsx";
import GalleryPage from "./page/GalleryPage.jsx";
import CategoryTilesPage from "./page/CategoryTilesPage.jsx";
import Layout from "./component/Layout.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {path: '/', element: <MainPage/>},
            {path: '/upload', element: <UploadForm/>},
            {path: '/instruments', element: <FilterPage/>},
            {path: '/instrument/:id', element: <ProductPage/>},
            {path: '/admin', element: <GalleryPage isAdminPage={true}/>},
            {path: '/edit', element: <UploadInstrumentPage/>},
            {path: '/aboutMe', element: <AboutMePage />},
            {path: '/gallery', element: <GalleryPage />},
            {path: '/resonator', element: <CategoryTilesPage hasResonator={true} />},
            {path: '/traditional', element: <CategoryTilesPage hasResonator={false} />},
        ]
    }
])
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
