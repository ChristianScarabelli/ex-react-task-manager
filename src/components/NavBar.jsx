import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <section>
            <nav className="flex gap-5 px-5 py-4 bg-gray-800 mb-5">
                <NavLink
                    className={({ isActive }) => isActive ? 'text-yellow-500 hover:text-blue-400 border-b-1' : 'text-gray-300 hover:text-blue-400'}
                    to='/tasks'
                >
                    Home
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive ? 'text-yellow-500 hover:text-blue-400 border-b-1' : 'text-gray-300 hover:text-blue-400'}
                    to='/add-tasks'
                >
                    Add Task
                </NavLink>
            </nav>
        </section>
    )
}