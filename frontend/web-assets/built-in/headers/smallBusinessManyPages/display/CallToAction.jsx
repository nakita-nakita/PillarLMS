import React, {  useState } from 'react'

function DisplayCallToAction(props) {
  // imports
  const { system } = props.data;
  const {
    // colors
    isDayMode,
    isNightMode,
  } = system.state

  const [classes] = useState(
    isDayMode
      ? `bg-blue-400`
      : `bg-blue-500`
  )


  return (
    <div className={`${classes} text-white hover:text-gray-300 px-4 py-2 rounded cursor-pointer`}>
      Contact
    </div>
  )
}

export default DisplayCallToAction