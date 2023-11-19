import React from 'react';
import HomeIcon from '@mui/icons-material/Home';

const DisplayFooter = (props) => {
  const { user, system } = props?.data || {};

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
        <div className="container mx-auto flex flex-col md:flex-row justify-around items-center">
          {/* First Column */}
          <div className="flex flex-col items-center md:flex-shrink-0 justify-content-center">
            {/* Home Icon */}
            <HomeIcon className="text-white h-12 w-12 mb-4" />

            {/* Company Name Placeholder */}
            <p className="text-white">Company Name</p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
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

            {/* Contact Information */}
            <div className="text-center mt-4">
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@example.com</p>
              <p>123 Street, City, Country</p>
            </div>
          </div>

          {/* Second Column */}
          <div className="flex flex-col space-y-4 md:space-y-2 md:ml-8">
            {/* Example Links */}
            <a href="#" className="text-white hover:text-gray-300">
              Example Link 1
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Example Link 2
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Example Link 3
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Example Link 4
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Example Link 5
            </a>
          </div>
        </div>

        {/* Resource List Row */}
        <div className="flex flex-col space-y-4 md:space-y-2 mt-8 md:flex-row md:justify-around mb-8">
          {/* Resource List 1 */}
          <div className="flex flex-col space-y-2" style={{ marginTop: "8px" }}>
            <p className="text-lg font-semibold">Category 2</p>
            <a href="#" className="text-white hover:text-gray-300">
              Subcategory 1
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Subcategory 2
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Subcategory 3
            </a>
          </div>

          {/* Resource List 2 */}
          <div className="flex flex-col space-y-2">
            <p className="text-lg font-semibold">Category 2</p>
            <a href="#" className="text-white hover:text-gray-300">
              Subcategory 1
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Subcategory 2
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Subcategory 3
            </a>
          </div>

          {/* Resource List 3 */}
          <div className="flex flex-col space-y-2">
            <p className="text-lg font-semibold">Category 3</p>
            <a href="#" className="text-white hover:text-gray-300">
              Subcategory 1
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Subcategory 2
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Subcategory 3
            </a>
          </div>

          {/* Resource List 4 */}
          <div className="flex flex-col space-y-2">
            <p className="text-lg font-semibold">Category 4</p>
            <a href="#" className="text-white hover:text-gray-300">
              Subcategory 1
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Subcategory 2
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Subcategory 3
            </a>
          </div>
        </div>

        {/* Copyright */}
      </footer>
      <div className="text-center py-8 bg-blue-800 text-gray-200">
        &copy; 2023 Your Company. All rights reserved.
      </div>
    </div>
  );
};

export default DisplayFooter;
