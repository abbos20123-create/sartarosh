import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  
  FaClipboardList,
  FaCheckCircle,
  FaUserShield,
  FaRegUser,
} from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";

function AdminFace() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      title: "Barber Control",
      path: "/admin/barbercontrol",
      icon: FaScissors,
    },
    {
      title: "requested recepts",
      path: "/admin/receptcontrol",
      icon: FaClipboardList,
    },
    {
      title: "Accepted Recepts",
      path: "/admin/acceptedrecepts",
      icon: FaCheckCircle,
    },{
      title: "User Control",
      path: "/admin/usercontrol",
      icon:FaRegUser ,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
      <div className="w-[320px] bg-black text-white flex flex-col p-6 shadow-2xl">
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-white text-black p-3 rounded-2xl">
            <FaUserShield size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Admin Panel
            </h1>

            <p className="text-gray-400 text-sm">
              Barber Management
            </p>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex flex-col gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 text-left ${
                  location.pathname === item.path
                    ? "bg-white text-black shadow-lg"
                    : "bg-gray-900 hover:bg-gray-800"
                }`}
              >
                <Icon size={22} />

                <span className="font-semibold text-lg">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* BOTTOM CARD */}
        <div className="mt-auto">
          <div className="bg-gray-900 rounded-3xl p-5 mt-10">
            <h2 className="text-lg font-bold mb-2">
              Barber System
            </h2>

            <p className="text-gray-400 text-sm leading-6">
              Manage barbers, customer recepts and accepted
              appointments easily from one dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white min-h-[95vh] rounded-3xl shadow-lg p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminFace;