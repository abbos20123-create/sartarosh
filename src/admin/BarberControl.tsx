import axios from "axios";
import { useEffect, useState } from "react";
import type { Barberr } from "../home/HomePage";
import Rodal from "rodal";
import "rodal/lib/rodal.css";

function BarberControl() {
  const [barber, setBarber] = useState<Barberr[]>([]);
  const [visible, setVisible] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [age, setAge] = useState("");
  const [rating, setRating] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    getBarbers();
  }, []);

  const getBarbers = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/barber");
      setBarber(data);
    } catch (error) {
      console.log(error);
    }
  };

  const openAdd = () => {
    setIsEdit(false);
    setId(null);

    setName("");
    setExperience("");
    setAge("");
    setRating("");
    setImg("");

    setVisible(true);
  };

  const openEdit = (item: Barberr) => {
    setIsEdit(true);

    setId(item.id || null);
    setName(item.bName);
    setExperience(String(item.experience));
    setAge(String(item.age));
    setRating(String(item.rating));
    setImg(item.img);

    setVisible(true);
  };

  const saveBarber = async () => {
    const newBarber = {
      bName: name,
      experience,
      age,
      rating,
      img,
    };

    try {
      if (isEdit) {
        await axios.put(
          `http://localhost:3000/barber/${id}`,
          newBarber
        );
      } else {
        await axios.post(
          "http://localhost:3000/barber",
          newBarber
        );
      }

      setVisible(false);
      getBarbers();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBarber = async (id?: number) => {
    try {
      await axios.delete(`http://localhost:3000/barber/${id}`);
      getBarbers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-6">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Barber Control
          </h1>

          <button
            onClick={openAdd}
            className="bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            + Add Barber
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {barber.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={item.img}
                  className="w-full h-48 object-cover"
                />

                <div className="absolute top-3 right-3 bg-black/80 text-white px-3 py-1 rounded-full text-sm">
                  ⭐ {item.rating}
                </div>
              </div>

              <div className="p-5 flex flex-col gap-4">

                <h2 className="text-2xl font-bold text-gray-800">
                  {item.bName}
                </h2>

                <div className="flex justify-between text-sm text-gray-600">
                  <div>
                    <p className="text-gray-400">Experience</p>
                    <p className="font-bold">
                      {item.experience} yrs
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Age</p>
                    <p className="font-bold">{item.age}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => openEdit(item)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-semibold transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteBarber(item.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold transition"
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

      <Rodal
        visible={visible}
        onClose={() => setVisible(false)}
        width={500}
        height={450}
        customStyles={{
          borderRadius: "20px",
          padding: "0",
          overflow: "hidden",
        }}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">
            {isEdit ? "Edit Barber" : "Add Barber"}
          </h2>

          <div className="space-y-4">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full border p-3 rounded-xl"
            />

            <input
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Experience"
              className="w-full border p-3 rounded-xl"
            />

            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              className="w-full border p-3 rounded-xl"
            />

            <input
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Rating"
              className="w-full border p-3 rounded-xl"
            />

            <input
              value={img}
              onChange={(e) => setImg(e.target.value)}
              placeholder="Image URL"
              className="w-full border p-3 rounded-xl"
            />

            <button
              onClick={saveBarber}
              className={`w-full py-3 rounded-xl text-white font-bold ${
                isEdit
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isEdit ? "Save Changes" : "Add Barber"}
            </button>

          </div>
        </div>
      </Rodal>
    </div>
  );
}

export default BarberControl;