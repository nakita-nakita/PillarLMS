import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          <a href="#">Your Logo</a>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            About
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Services
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Contact
          </a>
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

          {/* Sign In Button */}
          <a href="#" className="text-white hover:text-gray-300">
            Sign In
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


// ============================================

// import React from 'react';

// const Navbar = () => {
//   return (
//     <nav className="bg-gray-800 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-white text-lg font-semibold">
//           <a href="#">Your Logo</a>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden">
//           <button className="text-white focus:outline-none">
//             <i className="fas fa-bars"></i>
//           </button>
//         </div>

//         {/* Mobile Menu (hidden by default on larger screens) */}
//         <div className="hidden md:flex md:space-x-4">
//           <a href="#" className="text-white hover:text-gray-300">
//             Home
//           </a>
//           <a href="#" className="text-white hover:text-gray-300">
//             About
//           </a>
//           <a href="#" className="text-white hover:text-gray-300">
//             Services
//           </a>
//           <a href="#" className="text-white hover:text-gray-300">
//             Contact
//           </a>
//         </div>

//         <div className="md:hidden">
//           {/* Social Icons (hidden on larger screens) */}
          // <div className="flex items-center space-x-4">
          //   <a href="#" className="text-white hover:text-gray-300">
          //     <i className="fab fa-facebook"></i>
          //   </a>
          //   <a href="#" className="text-white hover:text-gray-300">
          //     <i className="fab fa-twitter"></i>
          //   </a>
          //   <a href="#" className="text-white hover:text-gray-300">
          //     <i className="fab fa-instagram"></i>
          //   </a>
          //   <a href="#" className="text-white hover:text-gray-300">
          //     <i className="fab fa-linkedin"></i>
          //   </a>
          //   <a href="#" className="text-white hover:text-gray-300">
          //     <i className="fab fa-youtube"></i>
          //   </a>
          //   <a href="#" className="text-white hover:text-gray-300">
          //     <i className="fab fa-pinterest"></i>
          //   </a>
          //   <a href="#" className="text-white hover:text-gray-300">
          //     <i className="fab fa-whatsapp"></i>
          //   </a>
          //   <a href="#" className="text-white hover:text-gray-300">
          //     <i className="fab fa-reddit"></i>
          //   </a>
          // </div>

//           {/* Sign In Button (hidden on larger screens) */}
//           <a href="#" className="text-white hover:text-gray-300">
//             Sign In
//           </a>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

