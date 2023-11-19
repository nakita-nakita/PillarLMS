import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';

const DisplayNavbar = (props) => {
  const { user, system } = props?.data || {};
  const [isBrightnessDropdownOpen, setBrightnessDropdownOpen] = useState(false);
  const [isNightMode, setNightMode] = useState(false);

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setBrightnessDropdownOpen(false);
    }
  };


  const toggleBrightnessDropdown = (event, override) => {
    if (event) {
      event.stopPropagation();
    }

    setBrightnessDropdownOpen(override || !isBrightnessDropdownOpen);
  };

  const toggleNightMode = (event) => {
    if (event) {
      event.stopPropagation();
    }

    setNightMode(!isNightMode);
    // Implement logic to switch between day and night mode
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>

      {/* Notification Bar */}
      <div className="bg-green-300 p-2 text-center text-gray-700">
        Important notice goes here.
      </div>
      <nav className="bg-green-800 p-4">
        <div className="container mx-auto flex justify-between items-center">

          {/* Navbar Branding */}
          <div className="text-white text-lg font-semibold flex items-center">
            <IconButton color="inherit" className="mr-2">
              <HomeIcon />
            </IconButton>
            <a href="#" className='mr-5'>
              Your Logo
            </a>

          </div>

          {/* Hamburger Menu Button (visible on mobile) */}
          <div className="lg:hidden">
            <IconButton color="inherit" className="mr-2" onClick={() => toggleBrightnessDropdown(event, true)}>
              {!isNightMode && <LightModeIcon className='text-white' />}
              {isNightMode && <ModeNightIcon className='text-white' />}
            </IconButton>
            {isBrightnessDropdownOpen && (
              <div className="absolute bg-green-700 text-white p-2" ref={dropdownRef} style={{ right: 0 }}>
                <Switch
                  checked={isNightMode}
                  onChange={toggleNightMode}
                  color="default"
                  inputProps={{ 'aria-label': 'toggle day/night mode' }}
                />
              </div>
            )}
          </div>

          {/* Social Icons and Sign In (visible on larger screens) */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="hidden lg:flex space-x-4">
              <IconButton color="inherit" className="mr-2"
                onMouseEnter={() => toggleBrightnessDropdown(null, true)}
                onMouseLeave={() => toggleBrightnessDropdown(null, false)}
              >
                {!isNightMode && <LightModeIcon className='text-white' />}
                {isNightMode && <ModeNightIcon className='text-white' />}

                {isBrightnessDropdownOpen && (
                  <div
                    className="absolute bg-green-700 text-white p-2"
                    style={{
                      top: "32px",
                      right: "0px",
                    }}
                  >
                    <Switch
                      checked={isNightMode}
                      onChange={toggleNightMode}
                      color="default"
                      inputProps={{ 'aria-label': 'toggle day/night mode' }}
                    />
                  </div>
                )}
              </IconButton>
            </div>
          </div>
        </div>
      </nav>

    </>
  );
};

export default DisplayNavbar;

