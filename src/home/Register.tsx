import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

type Userr = {
  email: string
  password: string
  id: string
}

function Register() {
  const [user, setUser] = useState<Userr[]>([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate=useNavigate()
  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/users")
      setUser(data)
    } catch (error) {
      console.log(error)
    }
  }

  const postUser = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/users", {
        email,
        password,
      })

      setUser([...user, data])

      setEmail("")
      setPassword("")
      navigate("/login")
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Register to continue
          </p>
        </div>

        <div className="flex flex-col gap-5">
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <Link to={"/login"} >already have an account</Link>

          <button
            onClick={postUser}
            className="w-full bg-sky-500 hover:bg-sky-400 text-white font-semibold py-3 rounded-xl transition duration-300 cursor-pointer"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register