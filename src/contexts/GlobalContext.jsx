import { createContext } from "react";
import useTasks from "../customHooks/useTasks";

const GlobalContext = createContext()
export function GlobalProvider({ children }) {

    const [fetchTasks, tasks, addTask, removeTask, updateTask, removeMultipleTasks] = useTasks()

    return (
        <GlobalContext.Provider value={{ tasks, fetchTasks, addTask, removeTask, updateTask, removeMultipleTasks }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext