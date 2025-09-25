import { useState, useEffect, useCallback } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"
import TaskTable from "../components/TaskTable"
import { getTasks, addTask, updateTask, deleteTask } from "../services/api"

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState({ title: "", description: "" })
  const token = localStorage.getItem("token")

  // Fetch tasks from server
  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await getTasks(token)
      setTasks(data || [])
    } catch (err) {
      console.log(err)
      alert("Failed to fetch tasks")
    }
  }, [token])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // Add a new task
  const handleAdd = async () => {
    if (!newTask.title || !newTask.description) return alert("Fill in both fields")
    try {
      await addTask(newTask, token)
      setNewTask({ title: "", description: "" })
      fetchTasks()
    } catch (err) {
      console.log(err)
      alert("Failed to add task")
    }
  }

  // Delete a task
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return
    try {
      await deleteTask(id, token)
      fetchTasks()
    } catch (err) {
      console.log(err)
      alert("Failed to delete task")
    }
  }

  // Edit a task
  const handleEdit = async (id, updatedTask) => {
    if (!updatedTask.title || !updatedTask.description) return
    try {
      await updateTask(id, updatedTask, token)
      fetchTasks()
    } catch (err) {
      console.log(err)
      alert("Failed to update task")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Your Tasks</h2>
            <div className="bg-white shadow px-5 py-2 rounded-lg">
              <span className="text-gray-600 font-medium">Total Tasks</span>
              <span className="ml-3 text-blue-600 font-bold text-lg">{tasks.length}</span>
            </div>
          </div>


          <div className="bg-white p-4 rounded-lg shadow mb-6 flex space-x-3 items-center">

            <input type="text" placeholder="Task Title" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} className="border p-2 rounded w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400" />

            <input type="text" placeholder="Task Description" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-400 truncate" />

            <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 shadow" >

              Add

            </button>

          </div>


          <div className="bg-white shadow rounded-lg overflow-x-auto">

            <TaskTable tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />

          </div>

        </main>
      </div>
      <Footer />
    </div>
  )
}
