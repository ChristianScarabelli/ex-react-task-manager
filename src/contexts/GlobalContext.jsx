import { createContext } from "react";
import useTasks from "../customHooks/useTasks";

const GlobalContext = createContext()
export function GlobalProvider({ children }) {

    // Variabile che contiene tutto il return di useTasks()
    const tasksData = useTasks()

    return (
        <GlobalContext.Provider value={{ ...tasksData }}>   {/* con spread passo tutto insieme */}
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext

