import React from 'react'
import FunctionalBranding from './FunctionalBranding';

function FunctionalFooter(props) {
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


  const textClasses = renderSuggestedTextColorClass(
    isDayMode
      ? user.colorFooterDay?.suggestedTextColor
      : user.colorFooterNight?.suggestedTextColor
  )

  return (
    <>
      {user.isFooterShowing && (
        <>
          <footer className={`bg-stone-500 p-6 ${textClasses}`} style={{
            background: isDayMode
              ? user.colorFooterDay?.color
              : user.colorFooterNight?.color
          }}>
            <FunctionalBranding {...props} />
            {/* Resource List Row */}
            <div className="flex flex-col space-y-4 mt-8 md:flex-row md:justify-around mb-8 text-center">
              {/* Resource List */}
              <div className="flex flex-col pb-5 mt-4">
                <p className="text-lg font-semibold pb-2">Header</p>
                <a href="javascript:void(0)" className={`${textClasses}`}>
                  Link
                </a>
                <a href="javascript:void(0)" className={`${textClasses}`}>
                  Link
                </a>
              </div>

              {/* Resource List 2 */}
              <div className="flex flex-col pb-5 mt-4">
                <p className="text-lg font-semibold pb-2">Header</p>
                <a href="javascript:void(0)" className={`${textClasses}`}>
                  Link
                </a>
                <a href="javascript:void(0)" className={`${textClasses}`}>
                  Link
                </a>
              </div>

              {/* Resource List 3 */}
              <div className="flex flex-col pb-5 mt-4">
                <p className="text-lg font-semibold pb-2">Header</p>
                <a href="javascript:void(0)" className={`${textClasses}`}>
                  Link
                </a>
                <a href="javascript:void(0)" className={`${textClasses}`}>
                  Link
                </a>
              </div>

              {/* Resource List 4 */}
              <div className="flex flex-col pb-5 mt-4">
                <p className="text-lg font-semibold pb-2">Header</p>
                <a href="javascript:void(0)" className={`${textClasses}`}>
                  Link
                </a>
                <a href="javascript:void(0)" className={`${textClasses}`}>
                  Link
                </a>
              </div>
            </div>

            {/* Copyright */}
          </footer>
        </>
      )}
    </>
  )
}

export default FunctionalFooter