// src/components/RoleSelection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-6">
<Link 
        to="/" 
        className="absolute top-67 left-130 text-blue-600 hover:text-green-300 transition-colors fixed"
      >
        <FaHome className="text-4xl " />
      </Link>


      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Select Your Role
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* User Role */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="User Icon"
            className="w-32 h-32 mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">User</h2>
          <p className="text-gray-600 mb-4">
            Browse products, add items to your wishlist or cart, and place
            orders easily.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 transition"
    
          >
            Login as User
          </button>
        </div>

        {/* Admin Role */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Admin Icon"
            className="w-32 h-32 mb-4 top-100"
          />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Admin</h2>
          <p className="text-gray-600 mb-4">
            Manage products, view customer activity, and oversee orders and
            inventory.
          </p>
          <button
            onClick={() => navigate("/admin/login")}
            className="px-6 py-2 bg-green-600 text-black rounded-lg hover:bg-green-700 transition"
          >
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;