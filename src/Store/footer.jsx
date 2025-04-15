import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className=" w-screen bg-gray-800 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">About Us</h3>
          <p className="text-gray-400 text-sm">
            Discover the best collection of shoes at unbeatable prices. Your 
            one-stop destination for all styles and brands.
          </p>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Customer Support</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li><a href="#" className="hover:text-gray-200">Contact Us</a></li>
            <li><a href="#" className="hover:text-gray-200">Shipping Info</a></li>
            <li><a href="#" className="hover:text-gray-200">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-gray-200">FAQs</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="text-gray-400 hover:text-white text-2xl">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        &copy; 2025 Bes Style. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
