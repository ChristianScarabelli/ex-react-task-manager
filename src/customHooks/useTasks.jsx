import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs"
const API_URL = import.meta.env.VITE_API_URL

export default function useTasks() {

    // Stato per le tasks
    const [tasks, setTasks] = useState([])

    // Funzione di fetch delle tasks
    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_URL}/tasks`)
            const formattedTasks = response.data.map(task => ({
                ...task,
                createdAt: task.createdAt,  // Mantengo la data originale per l'ordinamento
                createdAtFormatted: dayjs(task.createdAt).format('DD/MM/YYYY')  // Data formattata per la UI
            }))
            setTasks(formattedTasks)
        }
        catch (err) {
            console.error(err)
        }
    }

    // effect per il fetch delle tasks al primo render
    useEffect(() => {
        fetchTasks()
    }, [])

    // Funzione per aggiungere una task
    const addTask = async (task) => {
        try {
            const response = await axios.post(`${API_URL}/tasks`, task)
            if (response.data.success) {
                const newTask = {
                    ...response.data.task,
                    createdAt: response.data.task.createdAt,
                    createdAtFormatted: dayjs(response.data.task.createdAt).format('DD/MM/YYYY')
                }
                setTasks([...tasks, newTask])
            } else {
                throw new Error(response.data.message)
            }
        }
        catch (err) {
            console.error(err)
            throw err
        }
    }

    // Funzione per rimuovere una task
    const removeTask = async (taskId) => {
        try {
            const response = await axios.delete(`${API_URL}/tasks/${taskId}`)
            if (response.data.success) {
                setTasks(tasks.filter(task => task.id !== taskId))
            } else {
                throw new Error(response.data.message)
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    // Funzione per modificare una task
    const updateTask = async (taskId, updatedTask) => {
        try {
            const response = await axios.put(`${API_URL}/tasks/${taskId}`, updatedTask)
            if (response.data.success) {
                const updatedTasks = tasks.map(task => task.id === taskId ? {
                    ...response.data.task,
                    createdAt: response.data.task.createdAt,
                    createdAtFormatted: dayjs(response.data.task.createdAt).format('DD/MM/YYYY')
                } : task)
                setTasks(updatedTasks)
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    // Funzione per rimozione multipla delle task
    const removeMultipleTasks = async (taskIds) => {
        try {
            const results = await Promise.allSettled(taskIds.map(taskId => axios.delete(`${API_URL}/tasks/${taskId}`)))
            const failedIds = results
                .filter(result => result.status === 'rejected')
                .map((_, index) => taskIds[index])

            if (failedIds.length > 0) {
                throw new Error(`Failed to delete tasks with IDs: ${failedIds.join(', ')}`)
            }

            const successfulIds = results
                .filter(result => result.status === 'fulfilled')
                .map((_, index) => taskIds[index])

            setTasks(tasks.filter(task => !successfulIds.includes(task.id)))
        }
        catch (err) {
            console.error(err)
            throw err
        }
    }

    return { tasks, fetchTasks, addTask, removeTask, updateTask, removeMultipleTasks }
}