import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';

function DisplaySocialMobile(props) {
  // imports
  const { system } = props.data;
  const {
    // colors
    isDayMode,
    isNightMode,
  } = system.state

  const [classes] = useState(
    isDayMode
      ? `text-gray-800 hover:text-gray-900`
      : `text-gray-200 hover:text-gray-300`
  )

  return (
    <>
      {/* Social Icons */}
      <IconButton className={`${classes}`}>
        <i className={`fab fa-instagram ${classes}`}></i>
      </IconButton>
      <IconButton className={`${classes}`}>
        <i className={`fab fa-youtube ${classes}`}></i>
      </IconButton>
      <IconButton className={`${classes}`}>
        <i className={`fab ${classes}`}>𝕏</i>
      </IconButton>
    </>
  )
}

export default DisplaySocialMobile