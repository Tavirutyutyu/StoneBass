import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import MainPage from './page/MainPage.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UploadForm from "./component/UploadForm.jsx";
import Navbar from "./component/Navbar.jsx";
import FilterPage from "./page/FilterPage.jsx";
import ProductPage from "./page/ProductPage.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navbar/>,
        children: [
            {path: '/', element: <MainPage/>},
            {path: '/upload', element: <UploadForm/>},
            {path: '/instruments', element: <FilterPage/>},
            {path: '/instrument/:id', element: <ProductPage/>}

        ]
    }
])
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
