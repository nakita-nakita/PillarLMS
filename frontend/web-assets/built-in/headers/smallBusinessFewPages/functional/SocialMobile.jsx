import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';

function FunctionalSocialMobile(props) {
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

  const classes = renderSuggestedTextColorClass(
    isDayMode
      ? user.navColorDay?.suggestedTextColor
      : user.navColorNight?.suggestedTextColor
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

export default FunctionalSocialMobile