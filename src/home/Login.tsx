import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"



function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate=useNavigate()
  
  
  
  const loginUser = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/users")

    const user = data.find(
      (u: any) => u.email === email && u.password === password
    )

    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
      alert("Login successful ✅")
      navigate("/")
    } else {
      alert("Invalid email or password ❌")
    }

  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <div className="flex flex-col gap-4">
          <input
            className="border p-3 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />

          <input
            className="border p-3 rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            type="text"
          />

          <Link to={"/register"}>if you don't have an account</Link>
          <button
            onClick={loginUser}
            className="bg-sky-500 text-white py-3 rounded-xl hover:bg-sky-400"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login