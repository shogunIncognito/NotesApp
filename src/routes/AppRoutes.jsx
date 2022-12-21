import { Routes, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Protected from "../pages/Protected"
import Login from "../pages/Login"
import Register from "../pages/Register"

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<Protected isRequired={true} />}>
                <Route path="/" element={<Dashboard />} />
            </Route>
            <Route element={<Protected />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
        </Routes>
    )
}