import { useContext } from 'react'
import GlobalContext from '../contexts/GlobalContext.jsx'
import TaskRow from '../components/TaskRow.jsx'


export default function TaskList() {

    const { tasks } = useContext(GlobalContext)

    return (
        <section className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-300">Tasks List</h2>
            <div className="overflow-x-auto mt-10">
                <table className="min-w-full bg-gray-200 shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-gray-300">
                        <tr>
                            <th className="py-2 px-4 text-left">Name</th>
                            <th className="py-2 px-4 text-left">Status</th>
                            <th className="py-2 px-4 text-left">Date of creation</th>
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
            </div>
        </section>
    )
}