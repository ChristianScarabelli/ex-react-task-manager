import { memo } from "react"
import { Link } from "react-router-dom"
function TaskRow({ data }) {

    const { title, status, createdAt, id } = data

    // Funzione per lo sfondo dello status
    const statusBgColor = (status) => {
        switch (status) {
            case 'To do':
                return 'bg-red-500'
            case 'Doing':
                return 'bg-yellow-400'
            case 'Done':
                return 'bg-green-400'
            default:
                return ''
        }
    }

    return (
        <tr className="not-last:border-b border-blue-300 hover:bg-gray-100">
            <td className="py-2 px-4 hover:underline hover:text-blue-400">
                <Link to={`/task/${id}`}>{title}</Link>
            </td>
            <td className={`py-2 px-4 ${statusBgColor(status)} rounded-md`}>{status}</td>
            <td className="py-2 px-4">{createdAt}</td>
        </tr>
    )
}

export default memo(TaskRow)