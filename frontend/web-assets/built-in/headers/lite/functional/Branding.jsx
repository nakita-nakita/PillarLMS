import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

function FunctionalBranding(props) {
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

  const textClass = renderSuggestedTextColorClass(
    isDayMode
      ? user.navColorDay?.suggestedTextColor
      : user.navColorNight?.suggestedTextColor
  )

  return (
    <>

      <div className={`${textClass} text-lg font-semibold flex items-center`}>
        {user.isBrandShowing && (
          <>
            {user.isLogoShowing && (<>
              <IconButton color="inherit" className="mr-2">
                <HomeIcon />
              </IconButton>
            </>
            )}
            {user.isBrandTextShowing && (
              <>
                <a href="#" className='mr-5'>
                  {user?.brandText || "Your Brand"}
                </a>
              </>
            )}

          </>
        )}
      </div>
    </>
  )
}

export default FunctionalBranding