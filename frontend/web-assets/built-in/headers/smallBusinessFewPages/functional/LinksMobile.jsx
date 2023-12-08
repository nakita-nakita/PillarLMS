import React, { useState } from 'react'

function FunctionalLinksMobile(props) {
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
    <div className='my-4 px-6'>
      <ul className="space-y-2">
        <li>
          <a href="#" className={`${classes}`}>
            Services
          </a>
        </li>
        <li>
          <a href="#" className={`${classes}`}>
            Locations
          </a>
        </li>
        <li>
          <a href="#" className={`${classes}`}>
            About
          </a>
        </li>
      </ul>
    </div>
  )
}

export default FunctionalLinksMobile