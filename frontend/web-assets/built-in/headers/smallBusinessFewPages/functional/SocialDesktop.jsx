import React, { useState } from 'react'

function FunctionalSocialDesktop(props) {
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
    <div className="hidden lg:flex items-center space-x-4">
      {/* Social Icons */}
      <a href="javascript:void(0)" className={`${classes}`}>
        <i className="fab fa-instagram"></i>
      </a>
      <a href="javascript:void(0)" className={`${classes}`}>
        <i className="fab fa-youtube"></i>
      </a>
      <a href="javascript:void(0)" className={`${classes}`}>
        𝕏
      </a>
    </div>
  )
}

export default FunctionalSocialDesktop