import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-stone-100 text-black mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-bold mb-4">MediBox</h2>
          <p className="text-sm">
            Your trusted partner for authentic medicines and healthcare products.  
            We ensure quality, reliability, and fast delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="text-black hover:text-blue-600 no-underline">Home</a></li>
            <li><a href="/about" className="text-black hover:text-blue-600 no-underline">About Us</a></li>
            <li><a href="/products" className="text-black hover:text-blue-600 no-underline">Products</a></li>
            <li><a href="/contact" className="text-black hover:text-blue-600 no-underline">Contact</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
          <ul className="space-y-2">
            <li><Link to="/faq" className="hover:text-blue-600">FAQ</Link></li>
            <li><Link to="/shipping" className="hover:text-blue-600">Shipping & Returns</Link></li>
            <li><Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li> {/* ✅ added */}
            <li><Link to="/terms" className="hover:text-blue-600">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
          <p className="text-sm">📍 Hyderabad, India</p>
          <p className="text-sm">📞 +91 98765 43210</p>
          <p className="text-sm">✉ support@medibox.com</p>
          <div className="flex space-x-4 mt-3 ml-15">
            <a href="#" className="text-black hover:text-blue-600"><FaFacebookF /></a>
            <a href="#" className="text-black hover:text-blue-600"><FaTwitter /></a>
            <a href="#" className="text-black hover:text-blue-600"><FaInstagram /></a>
            <a href="#" className="text-black hover:text-blue-600"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 text-center py-4 text-sm">
        © {new Date().getFullYear()} MediBox. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;