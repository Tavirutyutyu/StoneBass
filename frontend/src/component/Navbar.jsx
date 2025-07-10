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
                        <h1>StoneBass</h1>
                        <img src={logo} alt="StoneBass"/>
                    </Link>
                    <button className={"menu-toggle"} onClick={() => setIsOpen(!isOpen)}>
                        ☰
                    </button>
                </div>
                <ul className={isOpen ? "nav-links open" : "nav-links"}>
                    <li>
                        <a href="/instruments?hasResonator=true">Resonator</a>
                    </li>
                    <li>
                        <a href="/instruments?hasResonator=false">Traditional</a>
                    </li>
                    <li>History</li>
                    <li>About Me</li>
                </ul>
            </nav>
            <Outlet/>
        </>
    )
}