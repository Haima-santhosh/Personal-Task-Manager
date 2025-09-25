export default function Navbar() {
  const handleLogout = () => {
    // clear token
    localStorage.removeItem("token")
    // redirect to login 
    window.location.href = "/login"  
  }

  return (
    <nav className="bg-blue-600 text-white p-4 flex items-center justify-between">
     
      <div className="w-1/3"></div>

   
      <h1 className="font-bold text-xl text-center w-1/3">
        Personal Task Manager
      </h1>

      
      <div className="w-1/3 flex justify-end">

        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600" >

          Logout

        </button>
        
      </div>
    </nav>
  )
}
