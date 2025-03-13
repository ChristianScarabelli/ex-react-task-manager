import { useParams } from "react-router-dom"
import { useContext } from "react"
import GlobalContext from '../contexts/GlobalContext.jsx'
export default function TaskDetail() {
    const { id } = useParams()
    const { tasks } = useContext(GlobalContext)


    const parsedId = parseInt(id)

    // Recupero la task dal context con id corrispondente al path
    const task = tasks.find((task) => task.id === parsedId)


    // Stampo in console l'eliminazione al click
    const handleClick = () => {
        console.log(`Task with id ${id} has been deleted`)
    }

    return (
        <section className="container mx-auto p-4">
            <div className="flex flex-col gap-3 text-gray-800 bg-gray-200 shadow-lg p-5 rounded-lg mt-10">
                <h2><strong>Title:</strong>  {task.title}</h2>
                <p><strong>Description:</strong>  {task.description}</p>
                <span><strong>Status:</strong>  {task.status}</span>
                <span><strong>Date of creation:</strong>  {task.createdAt}</span>
                <button onClick={handleClick} className="bg-red-500 hover:bg-red-600 cursor-pointer ms-auto px-4 py-2 rounded-lg">Delete</button>
            </div>
        </section>
    )
}