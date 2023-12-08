import React from 'react';

function FunctionalNotice(props) {
  
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

  return (
    <>
      {user.isNoticeShowing && (

        <div
          className={`p-2 text-center ${renderSuggestedTextColorClass(
            isDayMode
              ? user.noticeColorDay?.suggestedTextColor
              : user.noticeColorNight?.suggestedTextColor
          )} hover:text-underline`}
          style={{
            backgroundColor: isDayMode
              ? user.noticeColorDay?.color || "rgb(228, 228, 231)"
              : user.noticeColorNight?.color || "rgb(77, 77, 77)"
          }}>
          {user.noticeTitle || "Important notice goes here."}
        </div>
      )}
    </>
  )
}

export default FunctionalNotice