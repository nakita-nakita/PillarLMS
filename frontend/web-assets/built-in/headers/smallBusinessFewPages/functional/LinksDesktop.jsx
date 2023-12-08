import React, { useState } from 'react'

function FunctionalLinksDesktop(props) {
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
      <a href="#" className={`${classes} hover:text-gray-300 py-2`}>
        About
      </a>
      <a href="#" className={`${classes} hover:text-gray-300 py-2`}>
        Services
      </a>
    </>
  )
}

export default FunctionalLinksDesktop