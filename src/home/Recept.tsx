import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import type { Barberr } from "./HomePage"
import axios from "axios"
import Rodal from "rodal"
import "rodal/lib/rodal.css"

type Receptt = {
  id?: number
  name: string
  phone: string
  barberId: number
  time?: string
}

function Recept() {

  const [barber, setBarber] = useState<Barberr[]>([])
  const [recept, setRecept] = useState<Receptt[]>([])

  const [openBarber, setOpenBarber] = useState(false)

  const [bName, setBName] = useState("")
  const [rating, setRating] = useState("")
  const [age, setAge] = useState("")
  const [experience, setExperience] = useState("")
  const [img, setImg] = useState("")

  useEffect(() => {
    getBarber()
    getRecepts()
  }, [])

  // GET BARBERS
  const getBarber = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/barber")
      setBarber(data)
    } catch (error) {
      console.log(error)
    }
  }

  // GET RECEPTS
  const getRecepts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/acceptedCustomers")
      setRecept(data)
    } catch (error) {
      console.log(error)
    }
  }

  
  // ADD BARBER
  const addBarber = async () => {

    if (!bName || !rating || !age || !experience || !img) {
      alert("Barcha inputlarni to'ldiring")
      return
    }

    try {

      const newBarber = {
        bName,
        rating: Number(rating),
        age: Number(age),
        experience: Number(experience),
        img,
      }

      await axios.post("http://localhost:3000/barber", newBarber)

      alert("Barber qo'shildi")

      setBName("")
      setRating("")
      setAge("")
      setExperience("")
      setImg("")

      setOpenBarber(false)

      getBarber()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200">

      {/* HEADER */}
      <header className="w-full bg-neutral-900 shadow-xl px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">

        <h1 className="text-3xl font-extrabold tracking-wider text-amber-500 uppercase">
          Barber <span className="text-white font-light">Shop</span>
        </h1>

        {/* SEARCH */}
        <div className="flex items-center gap-2 w-full md:w-auto bg-neutral-800 rounded-full px-4 py-2 border border-neutral-700 focus-within:border-amber-500 duration-300">
          <input
            type="text"
            placeholder="Search master barber..."
            className="w-full md:w-72 bg-transparent text-white outline-none placeholder-neutral-500 text-sm"
          />
          <button className="text-neutral-400 hover:text-amber-500 duration-300">
            🔍
          </button>
        </div>

        {/* BUTTONS */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">

          <button
            onClick={() => setOpenBarber(true)}
            className="bg-amber-500 hover:bg-amber-600 duration-300 text-neutral-900 px-5 py-2.5 rounded-full shadow-lg font-bold text-sm tracking-wide"
          >
            + New Barber
          </button>

          <Link to={"/recept"}>
            <button className="bg-neutral-800 hover:bg-neutral-700 duration-300 text-amber-400 border border-neutral-700 px-5 py-2.5 rounded-full shadow-lg font-medium text-sm">
              Recepts
            </button>
          </Link>

          <Link to={"/"}>
            <button className="bg-neutral-500 hover:bg-neutral-700 duration-300 text-white px-5 py-2.5 rounded-full shadow-lg font-medium text-sm">
              Home
            </button>
          </Link>

        </div>
      </header>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-10 py-12">

        {/* TOP */}
        <div className="flex items-center justify-between mb-12">

          <div>

            <h1 className="text-6xl font-black text-gray-800 leading-tight">
              Customer <br /> Recepts
            </h1>

            <p className="text-gray-500 mt-4 text-xl">
              Premium barber booking dashboard
            </p>

          </div>

          {/* STATS */}
          <div className="bg-black text-white rounded-3xl px-10 py-8 shadow-2xl">

            <p className="text-gray-400 text-lg">
              Total Orders
            </p>

            <h2 className="text-6xl font-black mt-2">
              {recept.length}
            </h2>

          </div>

        </div>

        {/* RECEPT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

          {recept.map((item) => {

            const barberData = barber.find(
              (b) => b.id === item.barberId
            )

            return (

              <div
                key={item.id}
                className="bg-white rounded-[35px] p-7 shadow-xl hover:shadow-2xl hover:-translate-y-2 duration-300 border border-gray-100 relative overflow-hidden"
              >

                {/* BACKGROUND EFFECT */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-50"></div>

                {/* TOP */}
                <div className="flex items-center justify-between relative z-10">

                  <div className="flex items-center gap-4">

                    <div className="w-18 h-18 rounded-full overflow-hidden border-4 border-green-500 shadow-lg">

                      <img
                        src={barberData?.img}
                        alt=""
                        className="w-full h-full object-cover"
                      />

                    </div>

                    <div>

                      <h2 className="text-2xl font-black text-gray-800">
                        {item.name}
                      </h2>

                      <p className="text-gray-500">
                        Premium Client
                      </p>

                    </div>

                  </div>

                  <div className="bg-green-100 text-green-600 px-4 py-2 rounded-full font-bold text-sm">
                    Active
                  </div>

                </div>

                {/* CUSTOMER INFO */}
                <div className="mt-8 space-y-5 relative z-10">

                  <div className="bg-gray-100 rounded-2xl p-4">

                    <p className="text-gray-400 text-sm mb-1">
                      Selected Barber
                    </p>

                    <h3 className="text-2xl font-black text-gray-800">
                      {barberData?.bName}
                    </h3>

                  </div>

                  <div className="bg-black rounded-2xl p-4 text-white">

                    <p className="text-gray-400 text-sm mb-1">
                      Appointment Time
                    </p>

                    <h3 className="text-3xl font-black">
                      {item.time} o'clock
                    </h3>

                  </div>

                </div>

              </div>

            )
          })}

        </div>
      </div>

      {/* ADD BARBER RODAL */}
      <Rodal
        visible={openBarber}
        onClose={() => setOpenBarber(false)}
        width={460}
        height={620}
        customStyles={{ borderRadius: '24px', padding: '24px' }}
      >
        <div className="flex flex-col gap-3">
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold text-neutral-900">
              Yangi usta qo'shish
            </h2>
            <p className="text-xs text-neutral-400 mt-1">Karta uchun usta ma'lumotlarini kiriting</p>
          </div>

          <input
            type="text"
            placeholder="Usta ismi"
            value={bName}
            onChange={(e) => setBName(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-amber-500 focus:bg-white duration-200"
          />

          <input
            type="text"
            placeholder="Reyting (Masalan: 4.9)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-amber-500 focus:bg-white duration-200"
          />

          <input
            type="text"
            placeholder="Yoshi"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-amber-500 focus:bg-white duration-200"
          />

          <input
            type="text"
            placeholder="Tajribasi (yil hisobida)"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-amber-500 focus:bg-white duration-200"
          />

          <input
            type="text"
            placeholder="Rasm URL manzili"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-amber-500 focus:bg-white duration-200"
          />

          <button
            onClick={addBarber}
            className="w-full bg-amber-500 hover:bg-amber-600 duration-300 text-neutral-900 py-3.5 rounded-xl text-sm font-bold tracking-wide shadow-md mt-3"
          >
            Saqlash
          </button>
        </div>
      </Rodal>

    </div>
  )
}

export default Recept