import {Link, Outlet} from "react-router-dom";
import logo from "/src/assets/logo.svg";
import "/src/style/navBar.css";
import {useState} from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <nav>
                <div className="navbar-logo">
                    <Link id={"logo"} to="/">
                        <img src={logo} alt="StoneBass"/>
                        <h1>StoneBass</h1>
                    </Link>
                    <button className={"menu-toggle"} onClick={() => setIsOpen(!isOpen)}>
                        ☰
                    </button>
                </div>
                <ul className={isOpen ? "nav-links open" : "nav-links"}>
                    <li>
                        <a href="/gallery">Gallery</a>
                    </li>
                    <li>History</li>
                    <li>
                        <a href="/aboutMe">About Me</a>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </>
    )
}