import {Link, Outlet} from "react-router-dom";
import logo from "/src/assets/logo.svg";
import fejlec_szoveg from "/src/assets/fejlec_szoveg.svg";
import "/src/style/navBar.css";
import {useState} from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <nav>
                <Link id="logo" to="/">
                    <img id="logo-icon" src={logo} alt="StoneBass icon"/>
                    <img id="logo-text" src={fejlec_szoveg} alt="StoneBass text"/>
                    <p className={"slogan"}>Basses for bassists from a bassist</p>
                </Link>

                <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </button>

                <ul className={isOpen ? "nav-links open" : "nav-links"}>
                    <li><a href="/gallery">Gallery</a></li>
                    <li>History</li>
                    <li><a href="/aboutMe">About Me</a></li>
                </ul>
            </nav>
            <Outlet/>
        </>
    );
}
