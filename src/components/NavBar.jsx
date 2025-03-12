import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <section>
            <nav>
                <NavLink to='/tasks'>Home</NavLink>
                <NavLink to='/add-tasks'>Add Task</NavLink>
            </nav>
        </section>
    )
}