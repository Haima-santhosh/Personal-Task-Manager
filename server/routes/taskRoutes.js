import express from 'express'
import auth from '../middleware/authMiddleware.js'
import { getTasks, addTask, updateTask, deleteTask } from '../controllers/taskController.js'

const router = express.Router()

// GET all tasks for authenticated user
router.get('/', auth, getTasks)

// ADD a new task
router.post('/', auth, addTask)

// UPDATE a task
router.put('/:id', auth, updateTask)

// DELETE a task
router.delete('/:id', auth, deleteTask)

export default router
