import React, { useState } from 'react'

function DisplayLinksDesktop(props) {
  // imports
  const { system } = props.data;
  const {
    // colors
    isDayMode,
    isNightMode,
  } = system.state

  //adjust colors
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
      <a
        href="#"
        className={`py-2 ${textClasses} ${isAboutDropdownOpen ? 'border-white' : ''}`}
        onMouseEnter={toggleAboutDropdown}
        onMouseLeave={toggleAboutDropdown}
      >
        About
        {/* About Dropdown */}
        {isAboutDropdownOpen && (
          <div className={`absolute ${dropdownClasses} text-white`}>
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
          <div className={`absolute ${dropdownClasses} text-white`}>
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
  )
}

export default DisplayLinksDesktop