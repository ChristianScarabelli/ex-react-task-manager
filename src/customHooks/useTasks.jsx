import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs"


export default function useTasks() {

    // Stato per le tasks
    const [tasks, setTasks] = useState([])

    // Funzione di fetch delle tasks
    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`)
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


    // effect per il fecth delle tasks al primo render
    useEffect(() => {
        fetchTasks()
    }, [])

    // Funzione per aggiungere una task
    const addTask = async (task) => {
        try {
            // console.log("Sending task:", task) 

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, task)
            if (response.data.success) {
                setTasks([...tasks, response.data.task])
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
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`)
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
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, updatedTask)
            if (response.data.success) {
                const updatedTasks = tasks.map(task => task.id === taskId ? response.data.task : task)
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
            const results = await Promise.allSettled(
                taskIds.map(taskId => axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`))
            )

            // Filtra solo le task eliminate con successo
            const successfulIds = taskIds.filter((_, index) => results[index].status === 'fulfilled')

            setTasks(tasks.filter(task => !successfulIds.includes(task.id)))
        } catch (err) {
            console.error("Error deleting tasks:", err)
            throw err
        }
    }

    return [fetchTasks, tasks, addTask, removeTask, updateTask, removeMultipleTasks]
}