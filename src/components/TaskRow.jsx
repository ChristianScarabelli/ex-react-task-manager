import { memo } from "react"
function TaskRow({ data }) {

    const { title, status, createdAt } = data

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
            <td className="py-2 px-4">{title}</td>
            <td className={`py-2 px-4 ${statusBgColor(status)} rounded-md`}>{status}</td>
            <td className="py-2 px-4">{createdAt}</td>
        </tr>
    )
}

export default memo(TaskRow)