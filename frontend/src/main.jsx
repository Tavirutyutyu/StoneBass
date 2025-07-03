import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UploadForm from "./component/UploadForm.jsx";
import Navbar from "./component/Navbar.jsx";
import InstrumentsListPage from "./page/InstrumentsListPage.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navbar/>,
        children: [
            {path: '/', element: <App/>},
            {path: '/upload', element: <UploadForm/>},
            {path: '/instruments/:instrumentType', element: <InstrumentsListPage/>}
        ]
    }
])
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
