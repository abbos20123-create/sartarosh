import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Rodal from "rodal"

import "rodal/lib/rodal.css"

export type Barberr = {
  id?: number
  bName: string
  rating: number
  age: number
  experience: number
  img: string
}

function HomePage() {

  const [barber, setBarber] = useState<Barberr[]>([])

  // RODALS
  const [openOrder, setOpenOrder] = useState(false)
  const [openBarber, setOpenBarber] = useState(false)

  // ORDER STATES
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [time, setTime] = useState("")

  // BARBER STATES
  const [bName, setBName] = useState("")
  const [rating, setRating] = useState("")
  const [age, setAge] = useState("")
  const [experience, setExperience] = useState("")
  const [img, setImg] = useState("")

  // SELECTED BARBER
  const [selectedBarberId, setSelectedBarberId] = useState<number | null>(null)

  useEffect(() => {
    getBarber()
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

  // SEND ORDER
  const sendOrder = async () => {

    if (!name || !phone || !time) {
      alert("Inputlarni to'ldiring")
      return
    }

    try {

      await axios.post("http://localhost:3000/recepts", {
        name,
        phone,
        time,
        barberId: selectedBarberId,
      })

      alert("Muvaffaqiyatli yuborildi")

      setName("")
      setPhone("")
      setTime("")
      setSelectedBarberId(null)

      setOpenOrder(false)

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

      // CLEAR INPUTS
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
    <div className="min-h-screen bg-neutral-50 text-neutral-600 font-sans antialiased">

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

      {/* BARBERS GRID */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Bizning Ustalar</h2>
          <p className="text-neutral-500 text-sm">O'zingizga ma'qul kelgan professionalni tanlang</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {barber.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 duration-300 flex flex-col group"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden bg-neutral-100">
                <img
                  src={item.img}
                  alt={item.bName}
                  className="w-full h-56 object-cover group-hover:scale-105 duration-500"
                />
                <div className="absolute top-3 right-3 bg-neutral-900/90 backdrop-blur-sm text-amber-400 px-2.5 py-1 rounded-full text-xs font-bold tracking-wider flex items-center gap-1 shadow">
                  ⭐ {item.rating}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between gap-5">

                <div>
                  <h2 className="text-xl font-bold text-neutral-900 tracking-tight group-hover:text-amber-600 duration-300">
                    {item.bName}
                  </h2>
                  <div className="w-8 h-0.5 bg-amber-500 my-2"></div>
                  <p className="text-xs font-medium text-neutral-400 uppercase tracking-widest">
                    Top Stylist / Barber
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100 text-center">
                    <p className="text-neutral-400 text-[11px] uppercase tracking-wider font-semibold">
                      Tajriba
                    </p>
                    <h3 className="font-bold text-base text-neutral-800 mt-0.5">
                      {item.experience} yil
                    </h3>
                  </div>

                  <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100 text-center">
                    <p className="text-neutral-400 text-[11px] uppercase tracking-wider font-semibold">
                      Yoshi
                    </p>
                    <h3 className="font-bold text-base text-neutral-800 mt-0.5">
                      {item.age} da
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setOpenOrder(true)
                    setSelectedBarberId(item.id!)
                  }}
                  className="w-full bg-neutral-950 hover:bg-amber-500 hover:text-neutral-950 duration-300 text-white py-3.5 rounded-xl text-sm font-bold tracking-wide shadow-md hover:shadow-lg mt-2"
                >
                  Navbat olish
                </button>

              </div>
            </div>

          ))}

        </div>
      </main>

      {/* MODAL: ORDER */}
      <Rodal
        visible={openOrder}
        onClose={() => setOpenOrder(false)}
        width={420}
        height={440}
        customStyles={{ borderRadius: '24px', padding: '24px' }}
      >
        <div className="flex flex-col gap-4">
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold text-neutral-900">
              Navbat olish
            </h2>
            <p className="text-xs text-neutral-400 mt-1">Ma'lumotlaringizni qoldiring, biz sizni kutamiz</p>
          </div>

          <input
            type="text"
            placeholder="To'liq ismingiz"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-neutral-900 focus:bg-white duration-200"
          />

          <input
            type="text"
            placeholder="Telefon raqamingiz"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-neutral-900 focus:bg-white duration-200"
          />

          <input
            type="text"
            placeholder="Kelish vaqti (Masalan: 14:30)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-neutral-900 focus:bg-white duration-200"
          />

          <button
            onClick={sendOrder}
            className="w-full bg-neutral-900 hover:bg-neutral-800 duration-300 text-white py-3.5 rounded-xl text-sm font-bold tracking-wide shadow-md mt-2"
          >
            Tasdiqlash
          </button>
        </div>
      </Rodal>

      {/* MODAL: ADD BARBER */}
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

export default HomePage