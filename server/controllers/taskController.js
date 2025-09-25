const Task = require("../models/Tasks")

// Get all tasks


exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}

// Add a task


exports.addTask = async (req, res) => {
  try {
    const { title, description } = req.body
    const task = new Task({ user: req.user.id, title, description })
    await task.save()
    res.status(201).json(task)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}

// Update a task


exports.updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description, completed },
      { new: true }
    )
    if (!task) return res.status(404).json({ message: "Task not found" })
    res.json(task)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}

// Delete a task



exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    })
    if (!task) return res.status(404).json({ message: "Task not found" })
    res.json({ message: "Task deleted" })
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}
