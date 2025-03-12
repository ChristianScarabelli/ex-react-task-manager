import { memo } from "react"
function TaskRow({ data }) {

    const { title, status, createdAt } = data

    // Funzione per lo sfondo dello status
    const statusBgColor = (status) => {
        switch (status) {
            case 'To do':
                return 'bg-red-500'
            case 'Doing':
                return 'bg-yellow-300'
            case 'Done':
                return 'bg-green-300'
            default:
                return ''
        }
    }

    return (
        <tr>
            <td>{title}</td>
            <td className={statusBgColor(status)}>{status}</td>
            <td>{createdAt}</td>
        </tr>
    )
}

export default memo(TaskRow)