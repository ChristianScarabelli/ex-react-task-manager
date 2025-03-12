import { useContext } from 'react'
import GlobalContext from '../contexts/GlobalContext.jsx'
import TaskRow from '../components/TaskRow.jsx'


export default function TaskList() {

    const { tasks } = useContext(GlobalContext)

    return (
        <section className="container mx-auto">
            <span>Elenco Task</span>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Date of creation</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks &&
                        tasks.map((task) => {
                            return <TaskRow key={task.id} data={task} />
                        })
                    }
                </tbody>
            </table>
        </section>
    )
}