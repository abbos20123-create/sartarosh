import axios from "axios";
import { useEffect, useState } from "react";

type ReceptType = {
  id?: string;
  name: string;
  phone: string;
  time: string;
  barberId: string;
  userEmail:string
};

function ReceptControl() {
  const [recepts, setRecepts] = useState<ReceptType[]>([]);

  useEffect(() => {
    getRecepts();
  }, []);

  const getRecepts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/recepts"
      );

      setRecepts(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ACCEPT CUSTOMER
  const acceptCustomer = async (item: ReceptType) => {
    try {
      // ADD TO acceptedCustomers
      await axios.post(
        "http://localhost:3000/acceptedCustomers",
        item
      );

      // DELETE FROM RECEPTS
      await axios.delete(
        `http://localhost:3000/recepts/${item.id}`
      );

      getRecepts();
    } catch (error) {
      console.log(error);
    }
  };

  // REJECT CUSTOMER
  const rejectCustomer = async (id?: string) => {
    try {
      await axios.delete(
        `http://localhost:3000/recepts/${id}`
      );

      getRecepts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Recept Control
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {recepts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition"
            >
              <div className="space-y-3 mb-6">
                <h2 className="text-2xl font-bold text-black">
                  {item.name}
                </h2>

                <p className="text-gray-600">
                  📞 {item.phone}
                </p>

                <p className="text-gray-600">
                  ⏰ {item.time}
                </p>

                <p className="text-gray-600">
                  📩 {item.userEmail}
                </p>

                <p className="text-gray-600 break-all">
                  💈 Barber ID: {item.barberId}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => acceptCustomer(item)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
                >
                  Accept
                </button>

                <button
                  onClick={() => rejectCustomer(item.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>

        {recepts.length === 0 && (
          <div className="bg-white rounded-3xl shadow-lg p-10 text-center mt-6">
            <h2 className="text-2xl font-bold text-gray-700">
              No Recepts Found
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReceptControl;