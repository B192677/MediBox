

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CategorySlider from "./slider";
// import BrandSlider from "./BrandSlider";
import logo from "../components/logo.jpg";
import { HiMenu } from "react-icons/hi";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Medibox = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  // Fetch 3 random featured products
  useEffect(() => {
    const fetchRandomFeatured = async () => {
      try {
        const res = await axios.get("http://localhost:3001/p/getproduct", {
          params: { t: Date.now() }, // avoid cache
        });
        if (Array.isArray(res.data)) {
          const shuffled = [...res.data].sort(() => 0.5 - Math.random());
          setFeaturedProducts(shuffled.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching products for featured section:", err);
      }
    };

    fetchRandomFeatured();
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-gray-50 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between  px-10 py-4">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3 text-3xl font-bold text-gray-900">
            {/* <img src={logo} alt="MediBox Logo" className="h-15 w-15 object-contain" /> */}
            {/* <span>MediBox</span> */}
          </div>

          <nav className="hidden md:flex items-center justify-between px-4">
  {/* Left Links */}
  {/* <div className="flex items-center gap-6">
    <Link to="/" className="text-slate-600 hover:text-slate-900">Home</Link>
    <Link to="/products" className="text-slate-900 font-bold">Products</Link>
    <Link to="/about" className="text-slate-600 hover:text-slate-900">About Us</Link>
    <Link to="/contact" className="text-slate-600 hover:text-slate-900">Contact</Link>
     
  </div> */}

  {/* Right Link */}
  <div>
    {/* <Link to="/login" className="text-slate-600 absolute right-20 top-8 hover:text-slate-900">👤Login</Link> */}
  </div>
</nav>

          <button
            className="md:hidden rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <HiMenu className="text-2xl" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-b border-gray-200">
          <nav className="flex flex-col gap-2 px-6 py-4 text-gray-700">
           {/* <Navbar/>}
           {/* <Link to="/" className="hover:text-[#119ad4]">Home</Link>
            <Link to="/products" className="hover:text-[#119ad4]">Products</Link>
            <Link to="/about" className="hover:text-[#119ad4]">About Us</Link>
            <Link to="/contact" className="hover:text-[#119ad4]">Contact</Link>
            <Link to="/profile" className="hover:text-[#119ad4]">Profile</Link>
            {/* <Link to="/login" className="hover:text-[#119ad4]">LogIn</Link> */}
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <section
          className="relative mb-12 h-96 w-full rounded-lg bg-cover bg-center text-white"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuD8Y2Mt-8CdrjxX9ScN5KE1hHeNE2R2YBAUmSVkFoKDJzJjRDYNXSajfpEtqGTntpZAi4SpcYOmnRamXUIRznnYLT7OYXj4zIzwIgqQiQo5OuxJRgDSthNyUDb1T_XKY6dtuOxzx5MmVTxHaeaBUKwTRmK57-SU1EGJQdulv-7YDJxXEw851SlH_3Efeo8L7UgyDISYpTO2rSm6IPQ3t83R0risG6VSNLTzDUNPbk2Aa1MDz5fkQY_wipDEWtFympRTsg5xRB2N5xUY')",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-4xl font-bold md:text-5xl">
              Your Trusted Source for Quality Medicines
            </h1>
            <p className="mt-4 max-w-2xl text-lg">
              Discover our wide range of pharmaceutical, ayurvedic, and other essentials, designed to meet your specific needs.
            </p>
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">Most Searched Today</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product, index) => (
                <div
                  key={product._id || index}
                  className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg cursor-pointer"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="mb-4 h-56 w-full object-cover rounded-md"
                  />
                  <h3 className="mb-2 text-xl font-semibold">{product.title}</h3>
                  <p className="text-gray-600">{product.Drugdetails?.slice(0, 80)}...</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Loading featured products...</p>
            )}
          </div>
        </section>

        {/* Shop By Brand */}
        {/* <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">Shop By Brand</h2>
          <BrandSlider />
        </section> */}

        {/* Categories Slider */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">Categories</h2>
          <CategorySlider />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Medibox;

