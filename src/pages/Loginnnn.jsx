import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext"; //  adjust path if needed

export default function Home() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userInitial, setUserInitial] = useState("U");

  const { clearCart } = useContext(CartContext); //  bring clearCart from context

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser || storedUser === "undefined") {
        navigate("/login");
        return;
      }

      const user = JSON.parse(storedUser);
      setUserInitial(user?.name ? user.name.charAt(0).toUpperCase() : "U");
    } catch (error) {
      console.error("Error parsing user:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    //  clear cart for this user
    clearCart();

    //  remove login details
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    navigate("/login"); // redirect
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-gray-50"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <header className="flex h-14 items-center justify-between bg-white px-4">
        <div className="flex items-center">
          <span className="material-symbols-outlined text-gray-600">menu</span>
        </div>

        {/* User Avatar */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white"
          >
            <span className="text-xl font-bold">{userInitial}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-12 z-10 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span className="material-symbols-outlined text-gray-600">
                    logout
                  </span>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800">Welcome!</h1>
            <p className="mt-2 text-gray-500">This is your home screen.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
