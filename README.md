# Personal Task Manager

A simple web application to manage our personal tasks. Users can register, log in, add tasks, update them, and delete completed tasks. The project is built with **MERN stack** (MongoDB, Express, React, Node.js).

## Features

- User authentication (Register & Login)
- Add, update, and delete tasks
- JWT-based secure API
- Responsive frontend with React and Tailwind CSS

## Tech Stack

- **Frontend:** React, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Haima-santhosh/Personal-Task-Manager.git
   cd personal-task-manager

Install dependencies for server:

cd server
npm install


Install dependencies for client:

cd ../client
npm install


Create a .env file in server/:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


Start development servers:

# server
cd server
npm run dev

# client
cd ../client
npm run dev

Deployment

Frontend: Vercel

Backend: Render   
