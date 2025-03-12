import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <section className="min-h-screen min-w-screen">
            <div className="flex flex-col justify-center items-center">
                <h3>404</h3>
                <span>Page not found!</span>
                <Link to='/tasks'>Go back to homepage</Link>
            </div>
        </section>
    )
}