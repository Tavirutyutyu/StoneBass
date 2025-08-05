import {Navigate, Outlet, useLocation} from "react-router-dom";

function isValidToken(token) {
    try {
        const [, payloadBase64] = token.split('.');
        const payload = JSON.parse(atob(payloadBase64));
        const now = Math.floor(Date.now() / 1000);
        return payload.exp && payload.exp > now;
    } catch {
        return false;
    }
}

export default function ProtectedRoute() {
    const token = localStorage.getItem("token");
    const location = useLocation();

    if (!isValidToken(token)) {
        localStorage.setItem("redirectTo", location.pathname);
        return <Navigate to={"/login"} />;
    }

    return <Outlet />;
}