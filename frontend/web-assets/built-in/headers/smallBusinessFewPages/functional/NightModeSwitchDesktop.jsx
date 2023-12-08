import React, { useEffect, useRef, useState } from 'react'
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';


function FunctionalNightModeSwitchDesktop(props) {
  // imports
  const { user, system } = props.data;
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

  //color adjustments
  const renderSuggestedTextColorClass = (value) => {
    switch (value) {
      case "LIGHT":
        return `text-gray-200`

      case "DARK":
        return `text-gray-800`

      // default dark like browser
      default:
        return `text-gray-800`
    }
  }

  const buttonClasses = renderSuggestedTextColorClass(
    isDayMode
      ? user.navColorDay?.suggestedTextColor
      : user.navColorNight?.suggestedTextColor
  )

  const dropdownlasses = renderSuggestedTextColorClass(
    isDayMode
      ? user.navColorDay?.suggestedTextColor
      : user.navColorNight?.suggestedTextColor
  )

  // logic 
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
      {user.isDayNightSelectorShowing && (
        <>
          <IconButton color="inherit" className="mr-2"
            onMouseEnter={() => toggleBrightnessDropdown(null, true)}
            onMouseLeave={() => toggleBrightnessDropdown(null, false)}
          >
            {!isNightModeVar && <LightModeIcon className={`${buttonClasses}`} />}
            {isNightModeVar && <ModeNightIcon className={`${buttonClasses}`} />}

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
        </>
      )}
    </>

  )
}

export default FunctionalNightModeSwitchDesktop