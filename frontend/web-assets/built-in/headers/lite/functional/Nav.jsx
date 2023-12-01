import React, { useEffect, useState } from 'react'
import FunctionalBranding from './Branding';
import FunctionalNightModeSwitch from './NightModeSwitch';

function FunctionalNav(props) {
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


  return (
    <>
      {user.isNavShowing && (
        <nav className={`p-4`} style={{
          backgroundColor: isDayMode
            ? user.navColorDay.color || "rgb(228, 228, 231)"
            : user.navColorNight.color || "rgb(77, 77, 77)"
        }}>
          <div className="container mx-auto flex justify-between items-center">

            {/* Navbar Branding */}
            <FunctionalBranding {...props} />

            {/* Night Mode Switch */}
            <FunctionalNightModeSwitch {...props} />
          </div>
        </nav>
      )}
    </>
  )
}

export default FunctionalNav