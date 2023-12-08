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
  const renderTextClass = (value) => {
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
  const renderLinkClass = (value) => {
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
  const textClasses = isDayMode
    ? renderTextClass(user.navColorDay.suggestedTextColor)
    : renderTextClass(user.navColorNight.suggestedTextColor)


  const linkClasses = isDayMode
    ? renderLinkClass(user.linkBoxColorDay.suggestedTextColor)
    : renderLinkClass(user.linkBoxColorNight.suggestedTextColor)

  const dropdownClasses = isDayMode
    ? "bg-stone-500"
    : "bg-stone-600"


  return (
    <>
      {user.isLinkBoxShowing && (
        <>

          <div className='my-4 px-6'>
            <ul className="space-y-2">
              <li>
                <strong className={`${textClasses}`}><small>Services</small></strong>
                <div className={`${dropdownClasses} p-2`} style={{
                  backgroundColor: isDayMode
                    ? user.linkBoxColorDay.color || "rgb(228, 228, 231)"
                    : user.linkBoxColorNight.color || "rgb(77, 77, 77)"
                }}>
                  <a href="javascript:void(0)" className={`${linkClasses} block hover:underline`}>
                    Service 1
                  </a>
                  <a href="javascript:void(0)" className={`${linkClasses} block hover:underline`}>
                    Service 2
                  </a>
                  <a href="javascript:void(0)" className={`${linkClasses} block hover:underline`}>
                    Service 3
                  </a>
                </ div>
              </li>
              <li>
                <strong className={`${textClasses}`}><small>About</small></strong>
                <div className={`${dropdownClasses} p-2`} style={{
                  backgroundColor: isDayMode
                    ? user.linkBoxColorDay.color || "rgb(228, 228, 231)"
                    : user.linkBoxColorNight.color || "rgb(77, 77, 77)"
                }}>
                  <a href="javascript:void(0)" className={`${linkClasses} block hover:underline`}>
                    Team
                  </a>
                  <a href="javascript:void(0)" className={`${linkClasses} block hover:underline`}>
                    Locations
                  </a>
                  <a href="javascript:void(0)" className={`${linkClasses} block hover:underline`}>
                    Experience
                  </a>
                </ div>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  )
}

export default FunctionalLinksMobile