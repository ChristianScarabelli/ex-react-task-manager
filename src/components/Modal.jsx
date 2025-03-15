import { createPortal } from "react-dom"

export default function Modal({
    title, content, show, onClose, onConfirm, confirmText = 'Confirm', confirmButtonClasses = 'bg-red-500 hover:bg-red-600' }) {

    if (!show) return null

    return show && createPortal(
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="fixed inset-0 bg-black opacity-50 z-40"></div> {/* Overlay */}
            <div className="relative flex flex-col gap-5 p-8 rounded-lg bg-gray-800 shadow-2xl z-50"> {/* Modale */}
                <h2 className="text-2xl font-bold text-gray-300">{title}</h2>
                <div className='text-center text-gray-300'>{content}</div>
                <div className="flex justify-between items-center">
                    <button onClick={onClose} className="cursor-pointer text-gray-800 text-sm px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Cancel</button>
                    <button onClick={onConfirm} className={`cursor-pointer ml-4 text-sm px-4 py-2 rounded-lg text-gray-300 ${confirmButtonClasses}`} >{confirmText}</button>
                </div>
            </div>
        </div>,
        document.body
    )
}