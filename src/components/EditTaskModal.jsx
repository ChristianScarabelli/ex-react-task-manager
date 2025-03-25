import { useState, useRef } from "react"
import Modal from "./Modal.jsx"

export default function EditTaskModal({ show, onClose, task, onSave }) {

    // Stati controllati per il form 
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)
    const [status, setStatus] = useState(task.status)

    // Riferimento per l'intero form
    const editFormRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedTask = { ...task, title, description, status }
        onSave(updatedTask)
        onClose()
    }

    const content = (
        <form ref={editFormRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="title" className="text-gray-300 text-start">Title</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 rounded bg-gray-500 text-gray-300 mb-4"
            />
            <label htmlFor="description" className="text-start text-gray-300">Description</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 rounded bg-gray-500 text-gray-300 mb-4"
            />
            <label htmlFor="status" className="text-start text-gray-300">Status</label>
            <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="p-2 rounded bg-gray-500 text-gray-300 mb-4"
            >
                {['To do', 'Doing', 'Done'].map((value, i) => (
                    <option key={i} value={value}>{value}</option>
                ))}
            </select>
        </form>
    )

    // Ritorno il componente Modal con dentro le caratteristiche della modale di modifica 
    // ( form ed il suo submit alla conferma )
    return (
        <Modal
            title="Modifica Task"
            content={content}
            show={show}
            onClose={onClose}
            onConfirm={() => editFormRef.current.requestSubmit()}   // per non fare un'altro bottone di conferma (per il submit), sfrutto il metodo requestSubmit del tag form per simulare/scatenare un submit
            confirmText="Save"
            confirmButtonClasses="bg-blue-500 hover:bg-blue-600"
        />
    )
}