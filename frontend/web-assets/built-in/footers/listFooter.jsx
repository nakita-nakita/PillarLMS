import React from 'react';

const Footer = () => {
  return (
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

        {/* Resources Section */}
        <div className="flex flex-col space-y-2 mt-4 md:mt-0">
          <p className="text-lg font-semibold">Resources</p>
          <div>
            <p className="text-white hover:text-gray-300">Category 1</p>
            <ul className="list-disc pl-6">
              <li>
                <a href="#" className="text-white hover:text-gray-300">
                  Subcategory 1
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300">
                  Subcategory 2
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-white hover:text-gray-300">Category 2</p>
            <ul className="list-disc pl-6">
              <li>
                <a href="#" className="text-white hover:text-gray-300">
                  Subcategory 1
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300">
                  Subcategory 2
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
