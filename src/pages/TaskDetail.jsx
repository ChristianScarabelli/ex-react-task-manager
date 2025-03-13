import { useNavigate, useParams } from "react-router-dom"
import { useContext } from "react"
import GlobalContext from '../contexts/GlobalContext.jsx'
export default function TaskDetail() {
    const { id } = useParams()
    const { tasks, removeTask, fetchTasks } = useContext(GlobalContext)
    const navigate = useNavigate()

    // Id numerico della task corrente
    const parsedId = parseInt(id)

    // Recupero la task dal context con id corrispondente al path
    const task = tasks.find((task) => task.id === parsedId)


    // Funzione per gestire il bottone di eliminazione
    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await removeTask(parsedId)
            await fetchTasks()
            alert('Task deleted succesfully')
            navigate('/tasks')
        }
        catch (err) {
            alert(`Failed to delete task: ${error.message}`)
        }
    }

    if (!task) return

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