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
                        <li>Guitar 1</li>
                        <li>Guitar 2</li>
                        <li>History</li>
                        <li>About Me</li>
                    </ul>
                </div>
            </nav>
            <Outlet/>
        </>
    )
}