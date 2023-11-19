import React from 'react';
import HomeIcon from '@mui/icons-material/Home';

const DisplayFooter = (props) => {
  const { user, system } = props?.data || {};

  return (
    <div>
      <footer className="bg-gray-800 text-white p-6">
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
