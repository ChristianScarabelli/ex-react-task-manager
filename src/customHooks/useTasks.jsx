import { useState, useEffect } from "react";
import axios from "axios";


export default function useTasks() {

    // Stato per le tasks
    const [tasks, setTasks] = useState([])

    // Funzione di fetch delle tasks
    const fetchTasks = async () => {
        try {
            const tasks = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`)
            setTasks(tasks.data)
            console.log(tasks.data)
        }
        catch (err) {
            console.error(err)
        }
    }

    // effect per il fecth delle tasks al primo render
    useEffect(() => {
        fetchTasks()
    }, [])

    //  // Funzione per aggiungere una task
    //  const addTask = async () => {
    //     try{

    //     }
    //     catch (err){
    //         console.error(err)
    //     }
    //  }

    //  // Funzione per rimuovere una task
    //  const removeTask = async () => {
    //     try{

    //     }
    //     catch (err){
    //         console.error(err)
    //     }
    //  }

    //  // Funzione per modificare una task
    //  const updateTask = async () => {
    //     try{

    //     }
    //     catch (err){
    //         console.error(err)
    //     }
    //  }

    return [fetchTasks, tasks]
}