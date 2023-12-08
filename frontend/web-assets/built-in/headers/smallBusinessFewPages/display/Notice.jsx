import React, { useState } from 'react'

function DisplayNotice(props) {
  // imports
  const { system } = props.data;
  const {
    // colors
    isDayMode,
    isNightMode,
  } = system.state


  const [noticeClasses, setNoticeClasses] = useState(
    isDayMode
      ? "bg-zinc-200 text-gray-800"
      : "bg-zinc-800 text-gray-200"
  )


  return (
    <div className={`p-2 text-center hover:underline cursor-pointer ${noticeClasses}`}>
      Important notice goes here.
    </div>

  )
}

export default DisplayNotice