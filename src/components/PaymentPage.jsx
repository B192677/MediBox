import React, { useState } from "react";
import logo from "./logo.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
const Payment = () => {
  const [method, setMethod] = useState("upi");
   const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white z-50">
        <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <img src={logo} alt="MediBox Logo" className="h-10 w-10 object-contain" />
          <span>MediBox</span>
        </div>

        <Link
          to="/cart"
          className="flex items-center gap-2 text-gray-800 hover:text-[#119ad4]"
        >
          <FaShoppingCart className="text-2xl" />
          <span className="font-medium hidden sm:inline">Cart</span>
        </Link>
      </header>

      
      <main className="flex-1 flex text-black mx-40 items-center justify-center px-4 sm:px-6 pt-28">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          
         
          <div>
            <h1 className="text-2 mb-6">Choose Payment Method</h1>
            <div className="space-y-3">
              <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={method === "upi"}
                  onChange={() => setMethod("upi")}
                />
                <span>UPI / Net Banking</span>
              </label>

              <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={method === "card"}
                  onChange={() => setMethod("card")}
                />
                <span>Credit / Debit Card</span>
              </label>

              <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={method === "cod"}
                  onChange={() => setMethod("cod")}
                />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>

          
          <div>
            <h2 className="text-2xl p-8 font-bold mb-4">Enter Details</h2>

            {method === "upi" && (
              <input
                type="text"
                placeholder="Enter UPI ID"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#119ad4]"
              />
            )}

            {method === "card" && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name on Card"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#119ad4]"
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  maxLength="16"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#119ad4]"
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength="5"
                    className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#119ad4]"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    maxLength="3"
                    className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#119ad4]"
                  />
                </div>
              </div>
            )}

            {method === "cod" && (
              <p className="p-6 text-gray-600">You can pay when your order is delivered.</p>
            )}

            
            <button
            onClick={()=>navigate("/order")} className="mt-6 w-full bg-[#119ad4] text-black py-3 rounded-lg hover:bg-[#0f88bb] transition">
              {method === "cod" ? "Confirm Order" : "Pay Now"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;