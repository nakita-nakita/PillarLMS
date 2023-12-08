import React, { useState } from 'react'

function DisplayLinksMobile(props) {
  const { system } = props.data;
  const {
    // colors
    isDayMode,
    isNightMode,
  } = system.state


  const [textClasses] = useState(
    isDayMode
      ? "text-gray-800"
      : "text-gray-200"
  )

  const [linkClasses] = useState(
    isDayMode
      ? "text-gray-100 hover:text-gray-300"
      : "text-gray-100 hover:text-gray-300"
  )
  const [dropdownClasses] = useState(
    isDayMode
      ? "bg-stone-500"
      : "bg-stone-600"
  )

  return (

    <div className='my-4 px-6'>
      <ul className="space-y-2">
        <li>
          <strong className={`${textClasses}`}><small>Services</small></strong>
          <div className={`${dropdownClasses} p-2`}>
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
          <div className={`${dropdownClasses} p-2`}>
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
  )
}

export default DisplayLinksMobile