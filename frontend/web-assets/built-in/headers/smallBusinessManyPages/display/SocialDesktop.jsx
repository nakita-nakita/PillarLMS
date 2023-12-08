import React, { useState } from 'react'

function DisplaySocialDesktop(props) {
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
      : `text-white hover:text-gray-300`
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

export default DisplaySocialDesktop