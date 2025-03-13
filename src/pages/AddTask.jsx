import { useMemo, useRef, useState } from "react"

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask() {

    const [taskTitle, setTaskTitle] = useState('')

    const taskDescriptionRef = useRef()
    const taskStatusRef = useRef()

    // Funzione di validazione per Title
    const isTitleValid = useMemo(() => {
        const titleTrimmed = taskTitle.trim()
        const hasSpecialChars = titleTrimmed.split('').some((char) => symbols.includes(char))

        return !hasSpecialChars && titleTrimmed !== ''
    }, [taskTitle])


    // Funzione per il submit del form
    const handleSubmit = (e) => {
        e.preventDefault()

        // Se il titolo non è valido blocco il submit
        if (!isTitleValid) return

        const description = taskDescriptionRef.current.value
        const status = taskStatusRef.current.value

        console.log({
            taskTitle,
            description,
            status,
        })
    }

    return (
        <section className="container mx-auto">
            <span>Form di aggiunta Task</span>
            <form onSubmit={handleSubmit}>
                <label htmlFor="task-name">Insert Task Title</label>
                <input
                    type="text"
                    required
                    autoFocus
                    id="task-name"
                    placeholder="Task name..."
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                />
                {/* Si mostra il messaggio se ci sono spazi vuoti o caratteri speciali */}
                {taskTitle && !isTitleValid && (
                    <span className="text-red-500">Title is required and cannot contain special characters</span>
                )}
                <label htmlFor="task-description">Insert Task Description</label>
                <textarea
                    id="task-description"
                    ref={taskDescriptionRef}
                    placeholder="Task description..."
                >
                </textarea>
                <label htmlFor="task-status">Select Task Status</label>
                <select ref={taskStatusRef} id="task-status">
                    <option value="To do">To do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>
                <button className="cursor-pointer" type="submit">Add task</button>
            </form>
        </section>
    )
}