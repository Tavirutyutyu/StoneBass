import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import MainPage from './page/MainPage.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UploadForm from "./component/UploadForm.jsx";
import Navbar from "./component/Navbar.jsx";
import FilterPage from "./page/FilterPage.jsx";
import ProductPage from "./page/ProductPage.jsx";
import EditPage from "./page/EditPage.jsx";
import AboutMePage from "./page/AboutMePage.jsx";
import GalleryPage from "./page/GalleryPage.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navbar/>,
        children: [
            {path: '/', element: <MainPage/>},
            {path: '/upload', element: <UploadForm/>},
            {path: '/instruments', element: <FilterPage/>},
            {path: '/instrument/:id', element: <ProductPage/>},
            {path: '/admin', element: <GalleryPage isAdminPage={true}/>},
            {path: '/edit', element: <EditPage/>},
            {path: '/aboutMe', element: <AboutMePage />},
            {path: '/gallery', element: <GalleryPage />},

        ]
    }
])
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
