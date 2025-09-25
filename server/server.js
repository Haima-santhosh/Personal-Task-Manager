const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const errorHandler = require("./middleware/errorHandler")

dotenv.config()
connectDB()

const app = express()

// Middleware Set up


app.use(cors())
app.use(express.json())

// Routes


app.use("/api/auth", require("./routes/auth"))
app.use("/api/tasks", require("./routes/tasks"))


// Error handler

app.use(errorHandler)


// Start server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
