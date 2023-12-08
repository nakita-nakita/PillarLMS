import React, { useState } from 'react'

function DisplayLinksMobile(props) {
  // imports
  const { system } = props.data;
  const {
    // colors
    isDayMode,
    isNightMode,
  } = system.state

  const [classes] = useState(
    isDayMode
      ? `text-gray-800`
      : `text-gray-200`
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

export default DisplayLinksMobile