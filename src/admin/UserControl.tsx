import { useEffect, useState } from "react"
import axios from "axios"
import Rodal from "rodal"
import "rodal/lib/rodal.css"

type User = {
  id: number
  email: string
  password: string
}

function UserControl() {
  const [users, setUsers] = useState<User[]>([])

  const [openEdit, setOpenEdit] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/users")
      setUsers(data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`)
      setUsers(users.filter((u) => u.id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setEmail(user.email)
    setPassword(user.password)
    setOpenEdit(true)
  }

  const saveEdit = async () => {
    if (!selectedUser) return

    try {
      const updatedUser = {
        email,
        password,
      }

      await axios.put(
        `http://localhost:3000/users/${selectedUser.id}`,
        updatedUser
      )

      setUsers(
        users.map((u) =>
          u.id === selectedUser.id ? { ...u, ...updatedUser } : u
        )
      )

      setOpenEdit(false)
      setSelectedUser(null)
      setEmail("")
      setPassword("")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-100 p-8">

      <div className="bg-neutral-900 text-white p-4 rounded-xl mb-6 shadow-lg">
        <h1 className="text-xl font-bold">User Control Panel</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-neutral-200 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Email</th>
              <th className="p-3">Password</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-neutral-50">

                <td className="p-3">{user.id}</td>

                <td className="p-3 font-medium">{user.email}</td>

                <td className="p-3 text-neutral-700">{user.password}</td>

                <td className="p-3 flex gap-2">

                  <button
                    onClick={() => handleEdit(user)}
                    className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-bold"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <Rodal
        visible={openEdit}
        onClose={() => setOpenEdit(false)}
        width={420}
        height={320}
        customStyles={{ borderRadius: "20px", padding: "20px" }}
      >
        <div className="flex flex-col gap-4">

          <h2 className="text-xl font-bold text-center">
            Edit User
          </h2>

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <button
            onClick={saveEdit}
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-bold"
          >
            Save Changes
          </button>

        </div>
      </Rodal>

    </div>
  )
}

export default UserControl