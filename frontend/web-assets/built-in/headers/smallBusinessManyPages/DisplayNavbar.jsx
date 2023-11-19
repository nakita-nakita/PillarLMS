import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';

const Navbar = (props) => {

  const { user, system } = props?.data || {};
  const [isMenuOpen, setMenuOpen] = useState(true);
  const [isServicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [isBrightnessDropdownOpen, setBrightnessDropdownOpen] = useState(false);
  const [isNightMode, setNightMode] = useState(false);

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setBrightnessDropdownOpen(false);
    }
  };

  const springProps = useSpring({
    height: isMenuOpen ? 'auto' : 0,
    opacity: isMenuOpen ? 1 : 0,
  });

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleServicesDropdown = () => {
    setServicesDropdownOpen(!isServicesDropdownOpen);
    setAboutDropdownOpen(false);
    setBrightnessDropdownOpen(false); // Close the Brightness dropdown when Services dropdown is opened
  };

  const toggleAboutDropdown = () => {
    setAboutDropdownOpen(!isAboutDropdownOpen);
    setServicesDropdownOpen(false);
    setBrightnessDropdownOpen(false); // Close the Brightness dropdown when About dropdown is opened
  };

  const toggleBrightnessDropdown = (event, override) => {
    if (event) {
      event.stopPropagation();
    }

    setBrightnessDropdownOpen(override || !isBrightnessDropdownOpen);
    console.log('override || !isBrightnessDropdownOpen', override || !isBrightnessDropdownOpen)
    setServicesDropdownOpen(false);
    setAboutDropdownOpen(false); // Close the Services and About dropdowns when Brightness dropdown is opened
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
      <div className="bg-blue-300 p-2 text-center text-gray-700">
        Important notice goes here.
      </div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">

          {/* Navbar Branding */}
          <div className="text-white text-lg font-semibold flex items-center">
            <IconButton color="inherit" className="mr-2">
              <HomeIcon />
            </IconButton>
            <a href="#" className='mr-5'>
              Your Logo
            </a>
            <div className="hidden lg:flex items-center space-x-4">
              {/* Social Icons */}
              <a href="#" className="text-white hover:text-gray-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                𝕏
              </a>
            </div>
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
                    className="absolute bg-gray-700 text-white p-2"
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
              <a
                href="#"
                className={`py-2 text-white hover:text-gray-300 ${isAboutDropdownOpen ? 'border-white' : ''}`}
                onMouseEnter={toggleAboutDropdown}
                onMouseLeave={toggleAboutDropdown}
              >
                About
                {/* About Dropdown */}
                {isAboutDropdownOpen && (
                  <div className="absolute bg-gray-700 text-white">
                    <a href="#" className="block hover:text-gray-300 hover:bg-gray-800 py-2 px-4">
                      Team
                    </a>
                    <a href="#" className="block hover:text-gray-300 hover:bg-gray-800 py-2 px-4">
                      Locations
                    </a>
                    <a href="#" className="block hover:text-gray-300 hover:bg-gray-800 py-2 px-4">
                      Experience
                    </a>
                  </div>
                )}
              </a>
              <a
                href="#"
                className={`py-2 text-white hover:text-gray-300 ${isServicesDropdownOpen ? 'border-white' : ''}`}
                onMouseEnter={toggleServicesDropdown}
                onMouseLeave={toggleServicesDropdown}
              >
                Services
                {/* Services Dropdown */}
                {isServicesDropdownOpen && (
                  <div className="absolute bg-gray-700 text-white">
                    <a href="#" className="block hover:text-gray-300 hover:bg-gray-800 py-2 px-4">
                      Service 1
                    </a>
                    <a href="#" className="block hover:text-gray-300 hover:bg-gray-800 py-2 px-4">
                      Service 2
                    </a>
                    <a href="#" className="block hover:text-gray-300 hover:bg-gray-800 py-2 px-4">
                      Service 3
                    </a>
                  </div>
                )}
              </a>
              <div className="bg-blue-500 text-white hover:text-gray-300 px-4 py-2 rounded cursor-pointer">
                Contact
              </div>
            </div>
            {/* Sign In Button */}
            <a href="#" className="text-white hover:text-gray-300">
              Sign In
            </a>
          </div>

          {/* Hamburger Menu Button (visible on mobile) */}
          <div className="lg:hidden">
            <IconButton color="inherit" className="mr-2" onClick={() => toggleBrightnessDropdown(event, true)}>
              {!isNightMode && <LightModeIcon className='text-white' />}
              {isNightMode && <ModeNightIcon className='text-white' />}
            </IconButton>
            {isBrightnessDropdownOpen && (
              <div className="absolute bg-gray-700 text-white p-2" ref={dropdownRef}>
                <Switch
                  checked={isNightMode}
                  onChange={toggleNightMode}
                  color="default"
                  inputProps={{ 'aria-label': 'toggle day/night mode' }}
                />
              </div>
            )}
            <IconButton color="inherit" className="mr-2" onClick={toggleMenu}>
              <MenuIcon className='text-gray-100' />
            </IconButton>
          </div>
        </div>
      </nav>

      {/* Collapsible Menu (visible on mobile) */}
      <animated.div style={springProps} className="lg:hidden overflow-hidden bg-gray-800">

        <div className='my-2 px-4' style={{
          borderBottom: "1px solid rgb(229, 231, 235)",
        }}>

          {/* Social Icons */}
          <IconButton className="text-white">
            <i className="fab fa-instagram text-gray-200 hover:text-gray-100"></i>
          </IconButton>
          <IconButton className="text-white">
            <i className="fab fa-youtube text-gray-200 hover:text-gray-100"></i>
          </IconButton>
          <IconButton className="text-white">
            <span className="fab text-gray-200 hover:text-gray-100">𝕏</span>
          </IconButton>
          <div className='py-2'>

            <div className="bg-blue-500 text-white hover:text-gray-300 px-4 py-2 rounded cursor-pointer">
              Contact
            </div>
            <div className="text-white hover:text-gray-300 px-4 py-2 rounded cursor-pointer">
              Sign in
            </div>
          </div>

        </div>
        {/* Links */}
        <div className='my-4 px-6'>
          <ul className="space-y-2">
            <li>
              <em className='text-gray-300'>Services</em>
              <div className='bg-gray-700 p-2'>
                <a href="#" className="block text-gray-100 hover:text-gray-300">
                  Service 1
                </a>
                <a href="#" className="block text-gray-100 hover:text-gray-300">
                  Service 2
                </a>
                <a href="#" className="block text-gray-100 hover:text-gray-300">
                  Service 3
                </a>
              </ div>
            </li>
            <li>
              <em className='text-gray-300'>About</em>
              <div className='bg-gray-700 p-2'>
                <a href="#" className="block text-gray-100 hover:text-gray-300">
                  Team
                </a>
                <a href="#" className="block text-gray-100 hover:text-gray-300">
                  Locations
                </a>
                <a href="#" className="block text-gray-100 hover:text-gray-300">
                  Experience
                </a>
              </ div>
            </li>
          </ul>
        </div>
      </animated.div>
    </>
  );
};

export default Navbar;
