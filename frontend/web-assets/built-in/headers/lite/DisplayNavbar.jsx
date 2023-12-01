import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { useTheme } from '@mui/material';
import FunctionalNotice from './functional/Notice';
import DisplayNotice from './display/Notice';
import DisplayNav from './display/Nav';
import FunctionalNav from './functional/Nav';

const DisplayNavbar = (props) => {
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
          <DisplayNotice {...props} />
          <DisplayNav {...props} />
        </>
      )}
      {isFunctionalMode && (
        <>
          <FunctionalNotice {...props} />
          <FunctionalNav {...props} />
        </>
      )}
    </>
  );
};

export default DisplayNavbar;

// <nav className="bg-green-800 p-4">
//   <div className="container mx-auto flex justify-between items-center">

//     {/* Navbar Branding */}
//     <div className="text-white text-lg font-semibold flex items-center">
//       <IconButton color="inherit" className="mr-2">
//         <HomeIcon />
//       </IconButton>
//       <a href="#" className='mr-5'>
//         Your Logo
//       </a>

//     </div>

//     {/* Hamburger Menu Button (visible on mobile) */}
//     <div className="lg:hidden">
//       <IconButton color="inherit" className="mr-2" onClick={() => toggleBrightnessDropdown(event, true)}>
//         {!isNightModeVar && <LightModeIcon className='text-white' />}
//         {isNightModeVar && <ModeNightIcon className='text-white' />}
//       </IconButton>
//       {isBrightnessDropdownOpen && (
  //         <div className="absolute bg-green-700 text-white p-2" ref={dropdownRef} style={{ right: 0 }}>
  //           <Switch
  //             checked={isNightModeVar}
  //             onChange={toggleNightMode}
  //             color="default"
  //             inputProps={{ 'aria-label': 'toggle day/night mode' }}
  //           />
  //         </div>
  //       )}
  //     </div>
  
  //     {/* Social Icons and Sign In (visible on larger screens) */}
  //     <div className="hidden lg:flex items-center space-x-4">
  //       <div className="hidden lg:flex space-x-4">
  //         <IconButton color="inherit" className="mr-2"
  //           onMouseEnter={() => toggleBrightnessDropdown(null, true)}
  //           onMouseLeave={() => toggleBrightnessDropdown(null, false)}
  //         >
  //           {!isNightModeVar && <LightModeIcon className='text-white' />}
  //           {isNightModeVar && <ModeNightIcon className='text-white' />}
  
  //           {isBrightnessDropdownOpen && (
    //             <div
    //               className="absolute bg-green-700 text-white p-2"
      //               style={{
      //                 top: "32px",
      //                 right: "0px",
      //               }}
      //             >
      //               <Switch
      //                 checked={isNightModeVar}
      //                 onChange={toggleNightMode}
      //                 color="default"
      //                 inputProps={{ 'aria-label': 'toggle day/night mode' }}
      //               />
      //             </div>
      //           )}
      //         </IconButton>
      //       </div>
      //     </div>
      //   </div>
      // </nav>
      