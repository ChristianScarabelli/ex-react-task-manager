import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
export default function DefaultLayout() {
    return (
        <main className="min-h-screen min-w-screen bg-gradient-to-b from-sky-900 via-sky-600 to-violet-500">
            <NavBar />
            <Outlet />
        </main>
    )
}