import React, { useState } from 'react'

function FunctionalLinksDesktop(props) {
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

  //color adjustments
  const renderTextClass = (value) => {
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
  const renderLinkClass = (value) => {
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
  const textClasses = isDayMode
    ? renderTextClass(user.navColorDay.suggestedTextColor)
    : renderTextClass(user.navColorNight.suggestedTextColor)


  const linkClasses = isDayMode
    ? renderLinkClass(user.linkBoxColorDay.suggestedTextColor)
    : renderLinkClass(user.linkBoxColorNight.suggestedTextColor)

  const dropdownClasses = isDayMode
    ? "bg-stone-500"
    : "bg-stone-600"


  // logic
  const [isServicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  const toggleAboutDropdown = () => {
    setAboutDropdownOpen(!isAboutDropdownOpen);
    setServicesDropdownOpen(false);
  };

  const toggleServicesDropdown = () => {
    setServicesDropdownOpen(!isServicesDropdownOpen);
    setAboutDropdownOpen(false);
  };

  return (
    <>
      {user.isLinkBoxShowing && (
        <>
          <a
            href="#"
            className={`py-2 ${textClasses} ${isAboutDropdownOpen ? 'border-white' : ''}`}
            onMouseEnter={toggleAboutDropdown}
            onMouseLeave={toggleAboutDropdown}
          >
            About
            {/* About Dropdown */}
            {isAboutDropdownOpen && (
              <div className={`absolute ${dropdownClasses} text-white`} style={{
                backgroundColor: isDayMode
                  ? user.linkBoxColorDay.color || "rgb(228, 228, 231)"
                  : user.linkBoxColorNight.color || "rgb(77, 77, 77)"
              }}>
                <a href="#" className={`${linkClasses} block py-2 px-4 hover:underline cursor-pointer`}>
                  Team
                </a>
                <a href="#" className={`${linkClasses} block py-2 px-4 hover:underline cursor-pointer`}>
                  Locations
                </a>
                <a href="#" className={`${linkClasses} block py-2 px-4 hover:underline cursor-pointer`}>
                  Experience
                </a>
              </div>
            )}
          </a>
          <a
            href="#"
            className={`py-2 ${textClasses} ${isServicesDropdownOpen ? 'border-white' : ''}`}
            onMouseEnter={toggleServicesDropdown}
            onMouseLeave={toggleServicesDropdown}
          >
            Services
            {/* Services Dropdown */}
            {isServicesDropdownOpen && (
              <div className={`absolute ${dropdownClasses} text-white`} style={{
                backgroundColor: isDayMode
                  ? user.linkBoxColorDay.color || "rgb(228, 228, 231)"
                  : user.linkBoxColorNight.color || "rgb(77, 77, 77)"
              }}>
                <a href="#" className={`${linkClasses} block py-2 px-4 hover:underline cursor-pointer`}>
                  Service 1
                </a>
                <a href="#" className={`${linkClasses} block py-2 px-4 hover:underline cursor-pointer`}>
                  Service 2
                </a>
                <a href="#" className={`${linkClasses} block py-2 px-4 hover:underline cursor-pointer`}>
                  Service 3
                </a>
              </div>
            )}
          </a>
        </>
      )}

    </>
  )
}

export default FunctionalLinksDesktop