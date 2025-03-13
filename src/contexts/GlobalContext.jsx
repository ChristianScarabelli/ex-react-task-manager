import { createContext } from "react";
import useTasks from "../customHooks/useTasks";

const GlobalContext = createContext()
export function GlobalProvider({ children }) {

    const [fetchTasks, tasks] = useTasks()

    return (
        <GlobalContext.Provider value={{ tasks }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext