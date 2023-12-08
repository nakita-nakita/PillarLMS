import React, { useEffect, useRef, useState } from 'react'
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';


function DisplayNightModeSwitch(props) {
  // imports
  const { system } = props.data;
  const {
    // colors
    isDayMode,
    isNightMode,
  } = system.state


  const [buttonClasses] = useState(
    isDayMode
      ? "text-gray-800"
      : "text-gray-200"
  )

  const [dropdownlasses] = useState(
    isDayMode
      ? "bg-stone-500"
      : "bg-stone-600"
  )


  const [isBrightnessDropdownOpen, setBrightnessDropdownOpen] = useState(false);
  const [isNightModeVar, setNightModeVar] = useState(false);

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

    setNightModeVar(!isNightModeVar);
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


      {/* Night Mode Switch (visible on mobile) */}
      <div className="lg:hidden">
        <IconButton color="inherit" className="mr-2" onClick={() => toggleBrightnessDropdown(event, true)}>
          {!isNightModeVar && <LightModeIcon className={`${buttonClasses}`} />}
          {isNightModeVar && <ModeNightIcon className={`${buttonClasses}`} />}
        </IconButton>
        {isBrightnessDropdownOpen && (
          <div className={`absolute ${dropdownlasses} text-white p-2`} ref={dropdownRef} style={{ right: 0 }}>
            <Switch
              checked={isNightModeVar}
              onChange={toggleNightMode}
              color="default"
              inputProps={{ 'aria-label': 'toggle day/night mode' }}
            />
          </div>
        )}
      </div>

      {/* Night Mode Switch (visible on larger screens) */}
      <div className="hidden lg:flex items-center space-x-4">
        <div className="hidden lg:flex space-x-4">
          <IconButton color="inherit" className="mr-2"
            onMouseEnter={() => toggleBrightnessDropdown(null, true)}
            onMouseLeave={() => toggleBrightnessDropdown(null, false)}
          >
            {!isNightModeVar && <LightModeIcon className='text-white' />}
            {isNightModeVar && <ModeNightIcon className='text-white' />}

            {isBrightnessDropdownOpen && (
              <div
                className={`absolute ${dropdownlasses} text-white p-2`}
                style={{
                  top: "32px",
                  right: "0px",
                }}
              >
                <Switch
                  checked={isNightModeVar}
                  onChange={toggleNightMode}
                  color="default"
                  inputProps={{ 'aria-label': 'toggle day/night mode' }}
                />
              </div>
            )}
          </IconButton>
        </div>
      </div>
    </>

  )
}

export default DisplayNightModeSwitch