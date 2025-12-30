import React from "react";
import logo from "./logo.jpg"; // make sure logo.png is in the same folder
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Minimal Navbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
        {/* Left: Logo + MediBox */}
        <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <img src={logo} alt="MediBox Logo" className="h-10 w-10 object-contain" />
          <span>MediBox</span>
        </div>

        {/* Right: Cart Icon */}
        <Link to="/cart" className="flex items-center gap-2 text-gray-800 hover:text-[#119ad4]">
          <FaShoppingCart className="text-2xl" />
          <span className="font-medium hidden sm:inline">Cart</span>
        </Link>
      </header>

      {/*  Checkout Content */}
      <div className="py-12 text-black px-6 md:px-20">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Billing Info */}
          <div className="bg-white text-black shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
            <form className="text-black space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                placeholder="Shipping Address"
                rows="3"
                className="w-full border rounded px-3 py-2"
              ></textarea>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 border-b pb-4">
              <div className="flex justify-between">
                <span>Paracetamol (x2)</span>
                <span>₹120</span>
              </div>
              <div className="flex justify-between">
                <span>Cough Syrup (x1)</span>
                <span>₹90</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total</span>
              <span>₹210</span>
            </div>
           <Link to="/paymentpage">
  <button
   onClick={() => navigate("/paymentpage")}
   className="mt-6 w-full bg-[#119ad4] text-black py-3 rounded-lg hover:bg-[#0f88bb] transition">
    Place Order
  </button>
</Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;