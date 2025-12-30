import React, { useState } from "react";
import logo from "./logo.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Footer from "../components/Footer"

const AboutUs = () => {
      const [menuOpen, setMenuOpen] = useState(false);
   
  return (
    <div className="bg-gray-50 min-h-screen">

        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 px-10 py-4">
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
          <Link to="/" className="text-slate-600 hover:text-slate-900">Home</Link>
          <Link to="/products" className="text-slate-900 font-bold">Products</Link>
          <Link to="/about" className="text-slate-600 hover:text-slate-900">About Us</Link>
          <Link to="/contact" className="text-slate-600 hover:text-slate-900">Contact</Link>
           {/* <Link to="/login" className="text-slate-600 hover:text-slate-900">Login</Link> 
        </nav> */}

        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            {/* <input
              type="search"
              placeholder="Search"
              className="form-input w-full rounded-md border-gray-300 bg-white pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-[#119ad4] focus:ring-[#119ad4]"
            /> */}
          </div>
          <div>

{/* <Link to="/wishlist" className="flex items-center space-x-1 text-purple-600 hover:text-purple-800">
    <HeartIcon className="w-6 h-6" />
    <span>WishList</span>
  </Link> */}

          </div>
<div className="flex items-center gap-4">
        {/* <Link to="/cart" className="flex items-center gap-2 text-black hover:text-[#119ad4]">
          <FaShoppingCart className="text-2xl" />
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
                  <Link to="/" className="hover:text-[#119ad4]">Home</Link>
                  <Link to="/products" className="hover:text-[#119ad4]">Products</Link>
                  <Link to="/about" className="hover:text-[#119ad4]">About Us</Link>
                  <Link to="/contact" className="hover:text-[#119ad4]">Contact</Link>
                  <Link to="/login" className="hover:text-[#119ad4]">Login</Link>
                </nav>
              </div>
            )}

      {/* Hero Section */}
      <section className=" text-white py-16 px-6 md:px-20 text-center"
        style={{
            backgroundImage:
            "linear-gradient(rgba(177, 138, 239, 0.96), rgba(44, 138, 161, 1)), url('')",

          }}>
        <h1 className="text-4xl font-bold mb-4">About MediBox</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Your trusted partner in delivering quality medicines and healthcare
          products with convenience, transparency, and care.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            At MediBox, our mission is to provide reliable access to authentic
            medicines and health products. We aim to make healthcare more
            accessible by combining technology with trust.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            We envision a healthier world where quality healthcare products are
            available to everyone, anytime, anywhere. Our focus is on building a
            seamless and safe digital pharmacy experience.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 px-6 md:px-20">
        <h2 className="text-2xl font-semibold text-center mb-10 text-gray-800">
          Why Choose MediBox?
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 shadow rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold text-[#119ad4] mb-2">
              💊 Genuine Medicines
            </h3>
            <p className="text-gray-600">
              100% authentic and certified medicines directly from trusted
              suppliers.
            </p>
          </div>
          <div className="p-6 shadow rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold text-[#119ad4] mb-2">
              🚚 Fast Delivery
            </h3>
            <p className="text-gray-600">
              Get your medicines delivered quickly and safely to your doorstep.
            </p>
          </div>
          <div className="p-6 shadow rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold text-[#119ad4] mb-2">
              🤝 Customer Support
            </h3>
            <p className="text-gray-600">
              Dedicated support team to assist you with your orders and queries.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 md:px-20 text-center bg-gray-100">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Get in Touch</h2>
        <p className="text-gray-600 mb-6">
          Have questions? Reach out to us anytime. We’re here to help you with
          your healthcare needs.
        </p>
        <a
  href="/contact"
  className="inline-block bg-[#119ad4] text-black px-6 py-3 rounded-lg shadow hover:bg-[#0f88bb]"
  style={{color:"white"}}
>
  Contact Us
</a>

      </section>
      <Footer/>
    </div>
  );
};

export default AboutUs;