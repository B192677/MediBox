import React, { useState } from "react";
import logo from "./logo.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import Footer from "../components/Footer";

const ContactUs = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show banner
    setShowBanner(true);

    // Hide banner automatically after 5 seconds
    setTimeout(() => setShowBanner(false), 5000);

    // Optionally clear the form (reset fields)
    e.target.reset();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Success Banner */}
      {showBanner && (
        <div className="bg-green-600 text-white text-center py-3 px-4 fixed top-0 left-0 w-full z-50 shadow-md">
        Your request has been received. We'll get back to you via email within 3-4 working days.
        </div>
      )}

      {/* Navbar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 px-10 py-4 mt-12">
        <div className="flex items-center gap-10">
          {/* <div className="flex items-center gap-3 text-3xl font-bold text-gray-900">
            <img
              src={logo}
              alt="MediBox Logo"
              className="h-15 w-15 object-contain"
            />
            <span>MediBox</span>
          </div> */}
          {/* <nav className="flex items-center gap-6">
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
            {/* <Link to="/login" className="text-slate-600 hover:text-slate-900">
              Login
            </Link> 
          </nav> */}
        </div>
        <div className="flex items-center gap-4">
          {/* <div className="relative hidden lg:block">
            <input
              type="search"
              placeholder="Search"
              className="form-input w-full rounded-md border-gray-300 bg-white pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-[#119ad4] focus:ring-[#119ad4]"
            />
          </div> */}
          <div>
            {/* <Link
              to="/wishlist" 
              className="flex items-center space-x-1 text-black hover:text-purple-800"
            >
              <HeartIcon className="w-6 h-6" />
              <span>WishList</span>
            </Link> */}
          </div>
          <div className="flex items-center gap-4">
            {/* <Link
              to="/cart"
              className="flex items-center gap-2 text-black hover:text-[#119ad4]"
            > */}
              {/* <FaShoppingCart className="text-2xl" />
              <span className="font-medium">Cart</span>
            </Link> */}
          </div>

          <button
            className="md:hidden rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <HiMenu className="text-2xl" />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-b border-gray-200">
          <nav className="flex flex-col gap-2 px-6 py-4 text-gray-700">
            <Link to="/" className="hover:text-[#119ad4]">
              Home
            </Link>
            <Link to="/products" className="hover:text-[#119ad4]">
              Products
            </Link>
            <Link to="/about" className="hover:text-[#119ad4]">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-[#119ad4]">
              Contact
            </Link>
           
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section
        className=" text-white py-16 px-6 md:px-20 text-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(177, 138, 239, 0.96), rgba(44, 138, 161, 1)), url('')",
        }}
      >
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          We're here to help! Get in touch with MediBox for any inquiries,
          feedback, or support.
        </p>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-12">
        {/* Left Side - Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-6">
            Reach out to us via email, phone, or simply fill out the contact
            form. Our team will respond as soon as possible.
          </p>
          <ul className="space-y-3 text-gray-700">
            <li>📍 Hyderabad, India</li>
            <li>📧 support@medibox.com</li>
            <li>📞 +91 7842755802</li>
          </ul>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-stone-900">
            Send Us a Message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#119ad4]"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#119ad4]"
              required
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#119ad4]"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-[#0f88bb] transition"
              style={{ background: "blue" }}
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactUs;