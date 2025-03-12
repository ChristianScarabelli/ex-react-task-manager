import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <section className="min-h-screen min-w-screen bg-sky-900">
            <div className="flex flex-col items-center justify-center h-full min-h-screen gap-3">
                <h3 className="text-6xl font-bold text-gray-400">404</h3>
                <span className="text-xl font-bold text-gray-400">Page not found!</span>
                <Link className="cursor-pointer text-blue-500 hover:text-blue-600 mt-3" to='/tasks'>Go back to homepage</Link>
            </div>
        </section>
    )
}