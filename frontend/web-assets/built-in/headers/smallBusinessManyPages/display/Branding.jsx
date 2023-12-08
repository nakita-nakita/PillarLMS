import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import DisplaySocialDesktop from './SocialDesktop';

function DisplayBranding(props) {
  // imports
  const { system } = props.data;
  const {
    // colors
    isDayMode,
    isNightMode,
  } = system.state


  const [brandingClasses] = useState(
    isDayMode
      ? "text-gray-800"
      : "text-gray-200"
  )

  return (
    <>
      {/* Navbar Branding */}
      <div className={`${brandingClasses} text-lg font-semibold flex items-center`}>
        <IconButton color="inherit" className="mr-2">
          <HomeIcon />
        </IconButton>
        <a href="javascript:void(0)" className='mr-5'>
          Your Logo
        </a>
        <DisplaySocialDesktop {...props} />

      </div>
    </>
  )
}

export default DisplayBranding