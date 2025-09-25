const express = require("express")
const router = express.Router()
const auth = require("../middleware/authMiddleware")


const {getTasks, addTask, updateTask, deleteTask} = require("../controllers/taskController")

// GET ALL TASKS

router.get("/", auth, getTasks)

// ADD A TASK

router.post("/", auth, addTask)


// UPDATE A TASK


router.put("/:id", auth, updateTask)


// DELETE A TASK


router.delete("/:id", auth, deleteTask)

module.exports = router
