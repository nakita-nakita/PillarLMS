import React from 'react';

const Footer = () => {
  return (
    <div>
      <div className="bg-blue-500 text-white p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Contact Us Today</h2>
        <p className="mb-6">Have questions or need assistance? We're here to help. Contact us for more information.</p>
        <a
          href="/contact"
          className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-700 hover:text-white transition duration-300"
        >
          Get in Touch
        </a>
      </div>
      <footer className="bg-gray-800 text-white p-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src="/path-to-your-logo.png" alt="Your Logo" className="h-12 w-auto" />
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>

          {/* Address */}
          <div className="text-center mt-4 md:mt-0">
            <p>Your Company Name</p>
            <p>123 Street, City, Country</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@example.com</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-2 mt-4 md:mt-0">
            <a href="#" className="text-white hover:text-gray-300">
              Home
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              About Us
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Services
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
