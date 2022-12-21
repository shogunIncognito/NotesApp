import { Outlet, Navigate } from "react-router-dom";
import { getToken } from "../helpers/auth";

export default function Protected({ isRequired }) {    
    const token = getToken()
    
    if (!token && isRequired) return <Navigate to="/login" />
    if (token && !isRequired) return <Navigate to="/" />

    return (
        <Outlet />
    )
}