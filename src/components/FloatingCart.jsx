import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const FloatingCart = () => {
  const { cart } = useContext(CartContext);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
   console.log("Floating cart loaded");
console.log("Cart items in floating:", cart);
  return (
    <Link to="/cart" className="fixed right-4 top-[45%] z-50">
      <div className="relative">
        <FaShoppingCart className="text-4xl text-blue-600 hover:scale-110 transition-transform" />
        {totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {totalQuantity}
          </span>
            
        )}
      </div>
    </Link>
  );
};

export default FloatingCart;
