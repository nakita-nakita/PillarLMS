import React from 'react';

const Navbar = () => {
  return (
    <div>

      {/* Notification Bar */}
      <div className="bg-yellow-500 p-2 text-center text-white">
        Important Notice: Your notification text goes here.
      </div>

      {/* Navigation Bar */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-semibold">
            <a href="#">Your Logo</a>
          </div>
          <div className="hidden md:flex space-x-4">
            <div className="group inline-block relative">
              <a href="#" className="text-white hover:text-gray-300">
                Home
              </a>
              {/* Dropdown */}
              <div className="hidden group-hover:block absolute bg-gray-800 text-white py-2 px-4">
                <a href="#" className="block hover:text-gray-300">Submenu 1</a>
                <a href="#" className="block hover:text-gray-300">Submenu 2</a>
                <a href="#" className="block hover:text-gray-300">Submenu 3</a>
              </div>
            </div>
            <div className="group inline-block relative">
              <a href="#" className="text-white hover:text-gray-300">
                About
              </a>
              {/* Dropdown */}
              <div className="hidden group-hover:block absolute bg-gray-800 text-white py-2 px-4">
                <a href="#" className="block hover:text-gray-300">Submenu 1</a>
                <a href="#" className="block hover:text-gray-300">Submenu 2</a>
                <a href="#" className="block hover:text-gray-300">Submenu 3</a>
              </div>
            </div>
            {/* Add similar dropdowns for other menu items */}
          </div>
          <div className="flex items-center space-x-4">
            {/* Social Icons */}

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
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-pinterest"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-reddit"></i>
            </a>
            {/* ... (unchanged) */}
            {/* Sign In Button */}
            <a href="#" className="text-white hover:text-gray-300">
              Sign In
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
