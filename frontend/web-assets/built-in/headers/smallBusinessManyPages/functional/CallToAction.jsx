import React, { useState } from 'react'

function FunctionalCallToAction(props) {
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
      ? user.callToActionColorDay?.suggestedTextColor
      : user.callToActionColorNight?.suggestedTextColor
  )

  return (
    <>
      {user.isCallToActionShowing && (
        <div
          style={{
            backgroundColor: isDayMode
              ? user.callToActionColorDay.color || "rgb(228, 228, 231)"
              : user.callToActionColorNight.color || "rgb(77, 77, 77)"

          }}
          className={`${classes} px-4 py-2 rounded cursor-pointer`}>
          {user.callToActionTitle || "Contact"}
        </div>
      )}
    </>
  )
}

export default FunctionalCallToAction