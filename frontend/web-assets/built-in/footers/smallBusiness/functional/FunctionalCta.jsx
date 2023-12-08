import React from 'react'

function FunctionalCta(props) {
  // imports
  const { system, user } = props.data;
  const {
    // colors
    isDayMode,
    isNightMode,
  } = system.state

  //color adjustment
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
      ? user.colorCtaPanelDay?.suggestedTextColor
      : user.colorCtaPanelNight?.suggestedTextColor
  )

  const buttonClass = renderSuggestedTextColorClass(
    isDayMode
      ? user.colorCtaButtonDay?.suggestedTextColor
      : user.colorCtaButtonNight?.suggestedTextColor
  )

  return (
    <>
      {user.isCtaPanelShowing && (
        <>
          <div className={`bg-zinc-500 ${textClass} p-8 text-center`} style={{
            background: isDayMode
              ? user.colorCtaPanelDay?.color
              : user.colorCtaPanelNight?.color
          }}>
            <h2 className="text-2xl font-semibold mb-4">Contact Us Today</h2>
            <p className="mb-6">Have questions or need assistance? We're here to help. Contact us for more information.</p>
            <a
              href="/contact"
              className={`bg-blue-700 ${buttonClass} px-4 py-2 rounded-full transition duration-300`}
              style={{
                background: isDayMode
                  ? user.colorCtaButtonDay?.color
                  : user.colorCtaButtonNight?.color
              }}
            >
              Get in Touch
            </a>
          </div>
        </>
      )}
    </>
  )
}

export default FunctionalCta