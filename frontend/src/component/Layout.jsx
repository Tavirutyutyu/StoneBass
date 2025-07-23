import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";
import "/src/style/layout.css"

export default function Layout() {
    return (
        <div className="page-container">
            <Navbar />
            <div className="content-wrapper">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
