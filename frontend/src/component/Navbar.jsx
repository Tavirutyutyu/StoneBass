import {Outlet} from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <nav>
                <div>
                    <h1>StoneBass</h1>
                </div>
                <div>
                    <ul>
                        <li>
                            <a href="/instruments?hasResonator=true">Resonator</a>
                        </li>
                        <li>
                            <a href="/instruments?hasResonator=false">Traditional</a>
                        </li>
                        <li>History</li>
                        <li>About Me</li>
                    </ul>
                </div>
            </nav>
            <Outlet/>
        </>
    )
}