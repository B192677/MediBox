import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <h1 className="text-3xl font-bold mb-4">✅ Order Placed Successfully!</h1>
      <p className="text-lg mb-4">Thank you for your purchase.</p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default OrderSuccess;
