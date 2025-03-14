import { createContext } from "react";
import useTasks from "../customHooks/useTasks";

const GlobalContext = createContext()
export function GlobalProvider({ children }) {

    const [fetchTasks, tasks, addTask, removeTask, updateTask] = useTasks()

    return (
        <GlobalContext.Provider value={{ tasks, fetchTasks, addTask, removeTask, updateTask }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext