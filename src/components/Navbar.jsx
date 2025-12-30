import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { CartContext } from "../context/CartContext";
import logo from "./logo.jpg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-10 py-4">
      {/* Left side - Logo + Name */}
      <div className="flex items-center gap-10">
        <div
          className="flex items-center gap-3 text-3xl font-bold text-gray-900 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="MediBox Logo"
            className="h-12 w-12 object-contain"
          />
          <span>MediBox</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-slate-600 hover:text-slate-900">
            Home
          </Link>
          <Link to="/products" className="text-slate-900 font-bold">
            Products
          </Link>
          <Link to="/about" className="text-slate-600 hover:text-slate-900">
            About Us
          </Link>
          <Link to="/contact" className="text-slate-600 hover:text-slate-900">
            Contact
          </Link>
          {/* <Link to="/wishlist" className="text-slate-600 hover:text-slate-900">
            Wishlist
          </Link> */}
        </nav>
      </div>

       {/* Right side - Cart + Mobile menu button  */}
    <div className="flex items-center gap-4">
        <Link to="/cart" className="relative text-slate-700 hover:text-[#119ad4]">
          🛒
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
              {totalQuantity}
            </span>
          )}
        </Link>
        <button
          className="md:hidden rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <HiMenu className="text-2xl" />
        </button>
      </div>


      

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
          <nav className="flex flex-col gap-2 px-6 py-4 text-gray-700">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link to="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist</Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
