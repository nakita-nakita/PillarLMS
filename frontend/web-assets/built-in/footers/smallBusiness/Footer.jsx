import React from 'react'
import DisplayFooter from './display/DisplayFooter';
import DisplayCopyright from './display/DisplayCopyright';
import FunctionalCopyright from './functional/FunctionalCopyright';
import FunctionalFooter from './functional/FunctionalFooter';
import DisplayCta from './display/DisplayCta';
import FunctionalCta from './functional/FunctionalCta';

function Footer(props) {
  const { system } = props.data;
  const {
    // env
    isDisplayMode,
    isFunctionalMode,
    isDevMode,
    isProdMode,
    // colors
    isDayMode,
    isNightMode,
  } = system.state

  return (

    <>
      {isDisplayMode && (
        <>
          <DisplayCta {...props} />
          <DisplayFooter {...props} />
          <DisplayCopyright {...props} />
        </>
      )}
      {isFunctionalMode && (
        <>
          <FunctionalCta {...props} />
          <FunctionalFooter {...props} />
          <FunctionalCopyright {...props} />
        </>
      )}

    </>
  )
}

export default Footer

// import React from 'react';
// import HomeIcon from '@mui/icons-material/Home';

// const DisplayFooter = (props) => {
//   const { user, system } = props?.data || {};

//   return (
//     <div>
//       <div className="bg-zinc-500 text-white p-8 text-center">
//         <h2 className="text-2xl font-semibold mb-4">Contact Us Today</h2>
//         <p className="mb-6">Have questions or need assistance? We're here to help. Contact us for more information.</p>
//         <a
//           href="/contact"
//           className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-700 hover:text-white transition duration-300"
//         >
//           Get in Touch
//         </a>
//       </div>
//       <footer className="bg-stone-500 p-6 text-gray-200">
//         <div className="container mx-auto flex flex-col md:flex-row justify-around items-center">
//           {/* First Column */}
//           <div className="flex flex-col items-center md:flex-shrink-0 justify-content-center">
//             {/* Home Icon */}
//             <HomeIcon className="text-white h-12 w-12 mb-4" />

//             {/* Company Name Placeholder */}
//             <p className="text-white">Company Name</p>

//             {/* Social Media Icons */}
//             <div className="flex space-x-4">
//               <a href="javascript:void(0)" className="text-white hover:text-gray-300">
//                 <i className="fab fa-facebook"></i>
//               </a>
//               <a href="javascript:void(0)" className="text-white hover:text-gray-300">
//                 <i className="fab fa-twitter"></i>
//               </a>
//               <a href="javascript:void(0)" className="text-white hover:text-gray-300">
//                 <i className="fab fa-instagram"></i>
//               </a>
//               <a href="javascript:void(0)" className="text-white hover:text-gray-300">
//                 <i className="fab fa-linkedin"></i>
//               </a>
//             </div>

//             {/* Contact Information */}
//             <div className="text-center mt-4">
//               <p>(123) 456-7890</p>
//               <p>info@example.com</p>
//               <p>123 Street, City, Country</p>
//             </div>
//           </div>

//           {/* Second Column */}
//           <div className="flex flex-col space-y-4 md:space-y-2 md:ml-8 pt-4">
//             {/* Example Links */}
//             <a href="javascript:void(0)" className="text-white hover:text-gray-300">
//               Sales Link
//             </a>
//             <a href="javascript:void(0)" className="text-white hover:text-gray-300">
//               Sales Link
//             </a>
//             <a href="javascript:void(0)" className="text-white hover:text-gray-300">
//               Sales Link
//             </a>
//             <a href="javascript:void(0)" className="text-white hover:text-gray-300">
//               Sales Link
//             </a>
//             <a href="javascript:void(0)" className="text-white hover:text-gray-300">
//               Sales Link
//             </a>
//           </div>
//         </div>
//         <div className="flex flex-col space-y-4 mt-8 md:flex-row md:justify-around mb-8 text-center">
//           {/* Resource List */}
//           <div className="flex flex-col pb-5 mt-4">
//             <p className="text-lg font-semibold pb-2">Header</p>
//             <a href="javascript:void(0)" className="hover:text-gray-300">
//               Link
//             </a>
//             <a href="javascript:void(0)" className="hover:text-gray-300">
//               Link
//             </a>
//           </div>

//           {/* Resource List 2 */}
//           <div className="flex flex-col pb-5 mt-4">
//             <p className="text-lg font-semibold pb-2">Header</p>
//             <a href="javascript:void(0)" className="hover:text-gray-300">
//               Link
//             </a>
//             <a href="javascript:void(0)" className="hover:text-gray-300">
//               Link
//             </a>
//           </div>

//           {/* Resource List 3 */}
//           <div className="flex flex-col pb-5 mt-4">
//             <p className="text-lg font-semibold pb-2">Header</p>
//             <a href="javascript:void(0)" className="hover:text-gray-300">
//               Link
//             </a>
//             <a href="javascript:void(0)" className="hover:text-gray-300">
//               Link
//             </a>
//           </div>

//           {/* Resource List 4 */}
//           <div className="flex flex-col pb-5 mt-4">
//             <p className="text-lg font-semibold pb-2">Header</p>
//             <a href="javascript:void(0)" className="hover:text-gray-300">
//               Link
//             </a>
//             <a href="javascript:void(0)" className="hover:text-gray-300">
//               Link
//             </a>
//           </div>
//         </div>

//         {/* Copyright */}
//       </footer>
//       <div className="text-center py-8 bg-stone-400 text-gray-700">
//         &copy; 2023 Your Company. All rights reserved.
//       </div>
//     </div>
//   );
// };

// export default DisplayFooter;
