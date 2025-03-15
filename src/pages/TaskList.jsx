import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import GlobalContext from '../contexts/GlobalContext.jsx'
import TaskRow from '../components/TaskRow.jsx'

// Freccine ordinamento
const chevronUp = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
</svg>

const chevronDown = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>

function debounce(callback, delay) {
    let timer
    return (value) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(value)
        }, delay)
    }
}

export default function TaskList() {
    // Destrutturare le funzioni e gli stati necessari dal contesto
    const { tasks, fetchTasks, removeMultipleTasks } = useContext(GlobalContext)
    // Stato per criterio/colonna di ordinamento
    const [sortBy, setSortBy] = useState('createdAt')
    // Stato per la direzione di ordinamento
    const [sortOrder, setSortOrder] = useState(1)
    // Riferimento per la ricerca
    const queryRef = useRef()
    // Stato per memorizzare le task selezionate
    const [selectedTaskIds, setSelectedTaskIds] = useState([])

    useEffect(() => {
        fetchTasks()
    }, [])

    // Funzione per gestire l'ordine
    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder * -1)
        } else {
            setSortBy(field)
            setSortOrder(1)
        }
    }

    // Funzione per la logica di ordinamento e filtraggio
    const tasksSort = useMemo(() => {
        if (!tasks) return []

        // Se non c'è la query, imposto stringa vuota
        const searchQuery = queryRef.current ? queryRef.current.value.trim().toLowerCase() : ''

        // Task filtrate secondo la query di riferimento
        const filteredTasks = tasks.filter(task =>
            task.title.toLowerCase().includes(searchQuery)
        )

        // Task filtrate da ordinare
        const sortedTasks = [...filteredTasks]

        sortedTasks.sort((a, b) => {
            if (sortBy === 'title') {       // Se la colonna di riferimento è 'title, ordine alfabetico secondo la direzione
                return a.title.localeCompare(b.title) * sortOrder
            } else if (sortBy === 'status') {
                const statusOrder = { 'To do': 1, 'Doing': 2, 'Done': 3 }
                return (statusOrder[a.status] - statusOrder[b.status]) * sortOrder
            } else if (sortBy === 'createdAt') {
                return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * sortOrder
            }
            return 0    // Se il campo/nome della colonna da ordinare non è nessuno, lascio l'ordine invariato
        })
        return sortedTasks   // Ritorno le task ordinate
    }, [tasks, sortBy, sortOrder])

    // Funzione per la ricerca con debounce
    const handleSearch = useCallback(debounce(() => {
        fetchTasks()
    }, 300), [])

    // Funzione per la selezione di task
    const toggleSelection = (taskId) => {
        setSelectedTaskIds(prev => {
            if (prev.includes(taskId)) {
                return prev.filter(id => id !== taskId)
            } else {
                return [...prev, taskId]
            }
        })
    }

    // Funzione di gestione dell'eliminazione multipla
    const handleMultipleTasksDelete = async (e) => {
        e.preventDefault()
        try {
            await removeMultipleTasks(selectedTaskIds)
            alert('All tasks deleted successfully')
            setSelectedTaskIds([])
        }
        catch (err) {
            alert(`Failed to remove all tasks: ${err.message}`)
        }
    }

    return (
        <section className="container mx-auto p-4">
            <div className='flex justify-between items-center mb-5'>
                <h2 className="text-2xl font-bold text-gray-300">Tasks List</h2>
                <input
                    type="text"
                    className='text-gray-50 bg-gray-800 rounded-xl px-5 py-3'
                    placeholder='Search tasks for title...'
                    ref={queryRef}
                    onChange={() => handleSearch(queryRef.current.value)}
                />
            </div>
            <div className="overflow-x-auto mt-10">
                <table className="min-w-full bg-gray-200 shadow-md rounded-lg overflow-hidden text-gray-800 mb-5">
                    <thead className="bg-gray-800 text-gray-300 ">
                        <tr>
                            <th onClick={() => handleSort('title')} className="py-2 px-4 text-left cursor-pointer hover:bg-gray-700">
                                <div className="flex justify-between items-center">
                                    Title
                                    {sortOrder === 1 && sortBy === 'title' ? chevronDown : chevronUp}
                                </div>
                            </th>
                            <th onClick={() => handleSort('status')} className="py-2 px-4 text-left cursor-pointer hover:bg-gray-700">
                                <div className="flex justify-between items-center">
                                    Status
                                    {sortOrder === 1 && sortBy === 'status' ? chevronDown : chevronUp}
                                </div>
                            </th>
                            <th onClick={() => handleSort('createdAt')} className="py-2 px-4 text-left cursor-pointer hover:bg-gray-700">
                                <div className="flex justify-between items-center">
                                    Date of creation
                                    {sortOrder === 1 && sortBy === 'createdAt' ? chevronDown : chevronUp}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasksSort &&
                            tasksSort.map((task) => {
                                return <TaskRow
                                    key={task.id}
                                    data={task}
                                    checked={selectedTaskIds.includes(task.id)}
                                    onToggle={toggleSelection} />
                            })
                        }
                    </tbody>
                </table>
                {selectedTaskIds.length > 0 &&
                    <div>
                        <button onClick={handleMultipleTasksDelete} className="bg-red-500 text-gray-100 hover:bg-red-600 cursor-pointer px-4 py-2 rounded-lg">
                            {selectedTaskIds.length === 1 && 'Delete'}
                            {selectedTaskIds.length > 1 && 'Delete all'}
                        </button>
                    </div>
                }
            </div>
        </section>
    )
}