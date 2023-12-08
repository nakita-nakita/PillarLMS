import React, { useState } from 'react'

function DisplayLinksDesktop(props) {
  // imports
  const { system } = props.data;
  const {
    // colors
    isDayMode,
    isNightMode,
  } = system.state

  const [classes] = useState(
    isDayMode
      ? `text-black`
      : `text-white`
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

export default DisplayLinksDesktop