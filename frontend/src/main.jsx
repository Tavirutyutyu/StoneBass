import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import MainPage from './page/MainPage.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UploadForm from "./component/UploadForm.jsx";
import ProductPage from "./page/ProductPage.jsx";
import UploadPage from "./page/UploadPage.jsx";
import AboutMePage from "./page/AboutMePage.jsx";
import GalleryPage from "./page/GalleryPage.jsx";
import CategoryTilesPage from "./page/CategoryTilesPage.jsx";
import Layout from "./component/Layout.jsx";
import LoginPage from "./page/LoginPage.jsx";
import ProtectedRoute from "./component/ProtectedRoute.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <MainPage /> },
            { path: '/instrument/:id', element: <ProductPage /> },
            { path: '/aboutMe', element: <AboutMePage /> },
            { path: '/gallery', element: <GalleryPage /> },
            { path: '/resonator', element: <CategoryTilesPage hasResonator={true} /> },
            { path: '/traditional', element: <CategoryTilesPage hasResonator={false} /> },
            { path: '/login', element: <LoginPage /> },

            {
                element: <ProtectedRoute />,
                children: [
                    { path: '/upload', element: <UploadForm /> },
                    { path: '/admin', element: <GalleryPage isAdminPage={true} /> },
                    { path: '/edit', element: <UploadPage /> }
                ]
            }
        ]
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
