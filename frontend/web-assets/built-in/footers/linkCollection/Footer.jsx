import React from 'react'
import DisplayFooter from './display/DisplayFooter';
import DisplayCopyright from './display/DisplayCopyright';
import FunctionalCopyright from './functional/FunctionalCopyright';
import FunctionalFooter from './functional/FunctionalFooter';

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
          <DisplayFooter {...props} />
          <DisplayCopyright {...props} />
        </>
      )}
      {isFunctionalMode && (
        <>
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
//       <footer className="bg-stone-500 p-6 text-gray-200">
//         {/* Resource List Row */}
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

//   // color adjustments
//   // const [navClasses, setNavClasses] = useState(
//   //   isDayMode
//   //     ? "bg-stone-400 text-gray-700"
//   //     : "bg-stone-900 text-gray-200"
//   // )
// export default DisplayFooter;
