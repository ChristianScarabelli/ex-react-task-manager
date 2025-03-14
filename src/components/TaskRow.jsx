import { memo } from "react"
import { Link } from "react-router-dom"
function TaskRow({ data, checked, onToggle }) {

    const { title, status, createdAtFormatted, id } = data

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
                <div className="flex gap-5 items-center">
                    <input type="checkbox" checked={checked} onChange={() => onToggle(id)} />
                    <Link to={`/task/${id}`}>{title}</Link>
                </div>
            </td>
            <td className={`py-2 px-4 ${statusBgColor(status)} rounded-md`}>{status}</td>
            <td className="py-2 px-4">{createdAtFormatted}</td>
        </tr>
    )
}

export default memo(TaskRow)