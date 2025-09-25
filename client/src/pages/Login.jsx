import { useState } from "react"
import { loginUser } from "../services/api"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
   

    try {
      const { token } = await loginUser({ email, password })
      localStorage.setItem("token", token)
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.")
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Personal Task Manager
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <input type="email" placeholder="Email" className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <input type="password" placeholder="Password" className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" className={`w-full p-3 rounded text-white font-semibold ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}disabled={loading}>
          
          {loading ? "Logging in..." : "Login"}

        </button>

        <p className="text-center text-sm text-gray-600 mt-4"> Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">

            Register

          </Link>
          
        </p>
      </form>
    </div>
  );
}
