import { useContext, useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import GlobalContext from "../contexts/GlobalContext";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask() {
    const { addTask } = useContext(GlobalContext)
    const navigate = useNavigate()

    const [taskTitle, setTaskTitle] = useState('')
    const [isFormValid, setIsFormValid] = useState(false)

    const taskDescriptionRef = useRef()
    const taskStatusRef = useRef()

    // Funzione di validazione per Title
    const taskTitleError = useMemo(() => {
        if (!taskTitle.trim())
            return 'Task title cannot be empty'
        if (taskTitle.trim().split('').some((char) => symbols.includes(char)))
            return 'Task title cannot contain symbols'
        return '' // altrimenti ritorno stringa vuota
    }, [taskTitle])


    // Funzione per il submit del form
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Se il titolo non è valido blocco il submit
        if (taskTitleError) return

        setIsFormValid(true)

        const description = taskDescriptionRef.current.value
        const status = taskStatusRef.current.value

        const newTask = {
            title: taskTitle,
            description,
            status,
        }
        try {
            await addTask(newTask)  // Aggiungo la nuova task
            alert('New task added!')
            // Reset del form
            setTaskTitle('')
            taskDescriptionRef.current.value = ''
            taskStatusRef.current.value = 'To Do'
            setIsFormValid(false)
            navigate('/tasks')
        } catch (error) {
            alert(`Failed to add new task: ${error.message}`)
        }
    }

    return (
        <section className="container mx-auto p-4">
            <span className="text-2xl font-bold mb-4 text-gray-300">Add a new task!</span>
            <form onSubmit={handleSubmit}
                className="flex flex-col gap-5 text-gray-300 mt-10 bg-gray-800 p-4 rounded-lg"
            >
                <label className="" htmlFor="task-name">Insert Task Title</label>
                <input
                    type="text"
                    required
                    autoFocus
                    id="task-name"
                    placeholder="Task name..."
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="bg-gray-300 text-gray-800 border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-3 focus:ring-yellow-500"
                />
                {/* Si mostra il messaggio se ci sono spazi vuoti o caratteri speciali */}
                {taskTitle && taskTitleError && (
                    <span className="text-red-500">{taskTitleError}</span>
                )}
                <label htmlFor="task-description">Insert Task Description</label>
                <textarea
                    id="task-description"
                    ref={taskDescriptionRef}
                    placeholder="Task description..."
                    className="bg-gray-300 text-gray-800 border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-3 focus:ring-yellow-500"

                >
                </textarea>
                <label htmlFor="task-status">Select Task Status</label>
                <select
                    ref={taskStatusRef}
                    id="task-status"
                    className="bg-gray-300 text-gray-800 border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-3 focus:ring-yellow-500"

                >
                    <option value="To do">To do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>
                <div className="flex items-center justify-between">
                    {isFormValid &&
                        <span className="text-lg text-gray-300">Task added!</span>
                    }
                    <button
                        disabled={taskTitleError}
                        className="text-gray-300 ms-auto cursor-pointer p-3 rounded-lg bg-blue-400 hover:bg-yellow-500"
                        type="submit"
                    >
                        Add task
                    </button>

                </div>
            </form>
        </section>
    )
}