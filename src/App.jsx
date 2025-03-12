import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
// Layout
import DefaultLayout from "./layout/DefaultLayout"
import BlankLayout from "./layout/BlankLayout"
// Pages
import NotFound from "./pages/NotFound"
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"
// Context
import { GlobalProvider } from "./contexts/GlobalContext"

function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          {/* DefaultLayout per la home e le altre pagine principali */}
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Navigate to="/tasks" replace />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/add-tasks" element={<AddTask />} />
          </Route>
          {/* BlankLayout per pagina 404 */}
          <Route element={<BlankLayout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
