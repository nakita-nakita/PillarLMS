import React, { useState } from 'react'
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import DisplayBranding from './Branding';
import DisplayNightModeSwitch from './NightModeSwitch';

function DisplayNav(props) {
  // imports
  const { system } = props.data;
  const {
    // colors
    isDayMode,
    isNightMode,
  } = system.state

  // color adjustments
  const [navClasses, setNavClasses] = useState(
    isDayMode
      ? "bg-stone-400 text-gray-700"
      : "bg-stone-900 text-gray-200"
  )

  return (
    <>
      <nav className={`${navClasses} p-4`}>
        <div className="container mx-auto flex justify-between items-center">

          {/* Navbar Branding */}
          <DisplayBranding {...props} />

          {/* Night Mode Switch */}
          <DisplayNightModeSwitch {...props} />
        </div>
      </nav>
    </>
  )
}

export default DisplayNav