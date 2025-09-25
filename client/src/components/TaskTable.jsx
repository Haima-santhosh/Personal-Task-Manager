import { useState } from "react"

export default function TaskTable({ tasks, onEdit, onDelete }) {
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({ title: "", description: "", completed: false })

  const startEdit = (task) => {
    setEditingId(task._id)
    setEditData({ title: task.title, description: task.description, completed: task.completed })
  }

  const saveEdit = (id) => {
    onEdit(id, editData)
    setEditingId(null)
  }

  const cancelEdit = () => setEditingId(null)

  const toggleStatus = (task) => {
    onEdit(task._id, { ...task, completed: !task.completed })
  }

  return (
    <table className="min-w-full border shadow-sm bg-white">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-3 py-2 text-left">#</th>
          <th className="border px-3 py-2 text-left">Title</th>
          <th className="border px-3 py-2 text-left">Description</th>
          <th className="border px-3 py-2 text-left">Status</th>
          <th className="border px-3 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>


        {tasks.map((task, index) => (
          <tr key={task._id} className="hover:bg-gray-50">
            <td className="border px-3 py-2">{index + 1}</td>

            <td className="border px-3 py-2">
              { editingId === task._id ? <input type="text" value={editData.title} onChange={e => setEditData({ ...editData, title: e.target.value })} className="border p-1 rounded w-full"/>
                : task.title
              }
            </td>

            <td className="border px-3 py-2">

              {editingId === task._id ? <input type="text" value={editData.description} onChange={e => setEditData({ ...editData, description: e.target.value })} className="border p-1 rounded w-full" />
                : task.description
              }

            </td>

            <td className="border px-3 py-2">

              <span onClick={() => toggleStatus(task)} className={`px-2 py-1 rounded cursor-pointer text-white ${ task.completed ? "bg-green-500" : "bg-red-500"}`} >
                
                {task.completed ? "Completed" : "Pending"}

              </span>
            </td>

            <td className="border px-3 py-2 space-x-2">
              {editingId === task._id
                ? <>
                    <button onClick={() => saveEdit(task._id)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" >
                      Save

                    </button>

                    <button onClick={cancelEdit} className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500">

                      Cancel

                    </button>
                  </>
                  
                : <>
                    <button onClick={() => startEdit(task)} className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500" >

                      Edit

                    </button>

                    <button onClick={() => onDelete(task._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" >
                      
                      Delete
                      
                    </button>
                  </>
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
