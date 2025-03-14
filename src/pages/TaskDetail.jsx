import { useNavigate, useParams } from "react-router-dom"
import { useState, useContext } from "react"
import GlobalContext from '../contexts/GlobalContext.jsx'
import Modal from "../components/Modal.jsx"
export default function TaskDetail() {
    const { id } = useParams()
    const { tasks, removeTask, fetchTasks } = useContext(GlobalContext)
    const navigate = useNavigate()

    // Stato per lo stato di apertura della modale
    const [showModal, setShowModal] = useState(false)

    // Id numerico della task corrente
    const parsedId = parseInt(id)

    // Recupero la task dal context con id corrispondente al path
    const task = tasks.find((task) => task.id === parsedId)

    // Funzione per gestire il bottone di eliminazione che apre la modale
    const handleDeleteClick = () => {
        setShowModal(true)
    }

    // Funzione per gestire il bottone di chiusura della modale
    const handleCloseModal = () => {
        setShowModal(false)
    }

    // Funzione per gestire il bottone di eliminazione della modale
    const handleConfirmDelete = async () => {
        try {
            await removeTask(parsedId)
            await fetchTasks()
            alert('Task deleted successfully')
            navigate('/tasks')
        }
        catch (err) {
            alert(`Failed to delete task: ${err.message}`)
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
                <button onClick={handleDeleteClick} className="bg-red-500 text-gray-100 hover:bg-red-600 cursor-pointer ms-auto px-4 py-2 rounded-lg">Delete</button>
            </div>
            <Modal
                title={`Deleting task "${task.title}"`}
                content='Are you sure to delete this task?'
                show={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                confirmText='Delete'
            />
        </section >
    )
}