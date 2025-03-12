import { createContext, useEffect, useState } from "react";
import axios from "axios";

const GlobalContext = createContext()
export function GlobalProvider({ children }) {

    // Stato per le tasks
    const [tasks, setTasks] = useState([])

    // Funzione di fetch delle tasks
    const fetchTasks = async () => {
        try {
            const tasks = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`)
            setTasks(tasks.data)
            console.log(tasks.data)
        }
        catch (err) {
            console.error(err)
        }
    }

    // effect per il fecth delle tasks al primo render
    useEffect(() => {
        fetchTasks()
    }, [])

    return (
        <GlobalContext.Provider value={{ tasks }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext