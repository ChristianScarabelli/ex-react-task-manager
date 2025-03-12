import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layout/DefaultLayout"
import BlankLayout from "./layout/BlankLayout"
import NotFound from "./pages/NotFound"
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"


function App() {

  return (
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
  )
}

export default App
