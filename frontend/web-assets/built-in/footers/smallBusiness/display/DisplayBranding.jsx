import React from 'react'
import HomeIcon from '@mui/icons-material/Home';

function DisplayBranding() {
  return (
    <div className="container mx-auto flex flex-col md:flex-row justify-around items-center">
      {/* First Column */}
      <div className="flex flex-col items-center md:flex-shrink-0 justify-content-center">
        {/* Home Icon */}
        <HomeIcon className="text-white h-12 w-12 mb-4" />

        {/* Company Name Placeholder */}
        <p className="text-white">Company Name</p>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="javascript:void(0)" className="text-white hover:text-gray-300">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="javascript:void(0)" className="text-white hover:text-gray-300">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="javascript:void(0)" className="text-white hover:text-gray-300">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="javascript:void(0)" className="text-white hover:text-gray-300">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>

        {/* Contact Information */}
        <div className="text-center mt-4">
          <p>(123) 456-7890</p>
          <p>info@example.com</p>
          <p>123 Street, City, Country</p>
        </div>
      </div>

      {/* Second Column */}
      <div className="flex flex-col space-y-4 md:space-y-2 md:ml-8 pt-4">
        {/* Example Links */}
        <a href="javascript:void(0)" className="text-white hover:text-gray-300">
          Sales Link
        </a>
        <a href="javascript:void(0)" className="text-white hover:text-gray-300">
          Sales Link
        </a>
        <a href="javascript:void(0)" className="text-white hover:text-gray-300">
          Sales Link
        </a>
        <a href="javascript:void(0)" className="text-white hover:text-gray-300">
          Sales Link
        </a>
        <a href="javascript:void(0)" className="text-white hover:text-gray-300">
          Sales Link
        </a>
      </div>
    </div>
  )
}

export default DisplayBranding