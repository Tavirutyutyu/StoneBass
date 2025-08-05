import {useState} from "react";
import {useNavigate} from "react-router-dom";

async function login(username, password) {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password})
    })
    if (response.status === 200) {
        return response.json();
    } else {
        console.error("Unable to log in!");
    }
}

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        const response = await login(username, password);
        if (response) {
            localStorage.setItem("token", response.token)
            const targetLocation = localStorage.getItem("redirectTo") || "/admin";
            navigate(targetLocation);
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <label htmlFor={"username"}>Username:</label>
            <input type={"text"} id={"username"} name={"username"} value={username}
                   onChange={(e) => setUsername(e.target.value)}/>
            <label htmlFor={"password"}>Password:</label>
            <input type={"password"} id={"password"} name={"password"} value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
            <button type={"submit"}>Login</button>
        </form>
    )
}