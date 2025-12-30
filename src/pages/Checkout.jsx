import React, { useState, useContext } from "react";
import axios from "axios";
import logo from "../components/logo.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    setError("");

    if (!fullName || !email || !phone || !address) {
      setError("Please fill out all billing fields.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const items = cart.map((item) => ({
      productId: item.id.toString(),
      title: item.title,
      quantity: item.quantity,
      price: item.price,
      subTotal : item.price * item.quantity,
    }));

    try {
      setLoading(true);
      await axios.post("http://localhost:3001/o/createorder", {
        items,
        totalPrice,
        address: {
          fullName,
          email,
          phone,
          shippingAddress: address,
        },
      });

      clearCart();
      navigate("/paymentpage",{state:{totalPrice}});
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
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

      {/* Checkout Body */}
      <div className="py-12 text-black px-6 md:px-20">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Billing Info */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
            <form
              className="space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded px-3 py-2"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border rounded px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border rounded px-3 py-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea
                placeholder="Shipping Address"
                rows="3"
                className="w-full border rounded px-3 py-2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 border-b pb-4 max-h-52 overflow-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.title} (x{item.quantity})
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="mt-6 w-full bg-[#119ad4] text-black py-3 rounded-lg hover:bg-[#0f88bb] transition"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
