import { useNavigate, useParams } from "react-router-dom"
import { useState, useContext } from "react"
import GlobalContext from '../contexts/GlobalContext.jsx'
import Modal from "../components/Modal.jsx"
import EditTaskModal from "../components/EditTaskModal.jsx"
export default function TaskDetail() {
    const { id } = useParams()
    const { tasks, removeTask, fetchTasks, updateTask } = useContext(GlobalContext)
    const navigate = useNavigate()

    // Stato per lo stato di apertura della modale di eliminazione
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    // Stato per lo stato di apertura della modale di modifica
    const [showEditModal, setShowEditModal] = useState(false)

    // Id numerico della task corrente
    const parsedId = parseInt(id)

    // Recupero la task dal context con id corrispondente al path
    const task = tasks.find((task) => task.id === parsedId)

    // Funzione per gestire il bottone di eliminazione che apre la modale
    const handleDeleteClick = () => {
        setShowDeleteModal(true)
    }

    // Funzione per gestire il bottone di chiusura della modale di eliminazione
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false)
    }

    // Funzione per gestire il bottone di eliminazione nella modale di eliminazione
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

    // Funzione per gestire il bottone di modifica che apre la modale
    const handleEditClick = () => {
        setShowEditModal(true)
    }

    // Funzione per gestire il bottone di chiusura della modale di modifica
    const handleCloseEditModal = () => {
        setShowEditModal(false)
    }

    // Funzione per gestire il bottone di salvataggio nella modale di modifica
    const handleSaveEdit = async (updatedTask) => {
        try {
            await updateTask(parsedId, updatedTask)
            await fetchTasks()
            alert('Task updated successfully')
            setShowEditModal(false)
        }
        catch (err) {
            alert(`Failed to update task: ${err.message}`)
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
                <div className="flex items-center justify-between">
                    <button onClick={handleEditClick} className="bg-green-600 text-gray-100 hover:bg-green-700 cursor-pointer px-4 py-2 rounded-lg">Modify</button>
                    <button onClick={handleDeleteClick} className="bg-red-500 text-gray-100 hover:bg-red-600 cursor-pointer px-4 py-2 rounded-lg">Delete</button>
                </div>
            </div>
            <Modal
                title={`Deleting task "${task.title}"`}
                content='Are you sure to delete this task?'
                show={showDeleteModal}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
                confirmText='Delete'
            />
            <EditTaskModal
                show={showEditModal}
                onClose={handleCloseEditModal}
                task={task}
                onSave={handleSaveEdit}
            />
        </section >
    )
}