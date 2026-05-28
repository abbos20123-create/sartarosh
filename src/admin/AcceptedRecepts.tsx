import axios from "axios";
import { useEffect, useState } from "react";

type AcceptedType = {
  id?: string;
  name: string;
  phone: string;
  time: string;
  barberId: string;
};

function AcceptedRecepts() {
  const [accepted, setAccepted] = useState<AcceptedType[]>([]);

  useEffect(() => {
    getAccepted();
  }, []);

  const getAccepted = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/acceptedCustomers"
      );

      setAccepted(data);
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const deleteCustomer = async (id?: string) => {
    try {
      await axios.delete(
        `http://localhost:3000/acceptedCustomers/${id}`
      );

      getAccepted();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Accepted Recepts
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {accepted.map((item) => (
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

                <p className="text-gray-600 break-all">
                  💈 Barber ID: {item.barberId}
                </p>
              </div>

              <button
                onClick={() => deleteCustomer(item.id)}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {accepted.length === 0 && (
          <div className="bg-white rounded-3xl shadow-lg p-10 text-center mt-6">
            <h2 className="text-2xl font-bold text-gray-700">
              No Accepted Recepts
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default AcceptedRecepts;