// libraries
import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

// in-component
import FunctionalBranding from './Branding';
import FunctionalNightModeSwitchMobile from './NightModeSwitchMobile';
import FunctionalNightModeSwitchDesktop from './NightModeSwitchDesktop';
import FunctionalLinksDesktop from './LinksDesktop';
import FunctionalCallToAction from './CallToAction';
import FunctionalSocialMobile from './SocialMobile';
import FunctionalLinksMobile from './LinksMobile';

function FunctionalNav(props) {
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

  // color adjustments
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

  const renderSuggestedTextColorWithHoverClass = (value) => {
    switch (value) {
      case "LIGHT":
        return `text-gray-200 hover:text-gray-300`

      case "DARK":
        return `text-gray-800 hover:text-gray-900`

      // default dark like browser
      default:
        return `text-gray-800 hover:text-gray-900`
    }
  }
  const navClasses = renderSuggestedTextColorClass(
    isDayMode
      ? user.navColorDay?.suggestedTextColor
      : user.navColorNight?.suggestedTextColor
  )

  const signInClasses = renderSuggestedTextColorWithHoverClass(
    isDayMode
      ? user.navColorDay?.suggestedTextColor
      : user.navColorNight?.suggestedTextColor
  )


  // logic
  const [isMenuOpen, setMenuOpen] = useState(true);

  const springProps = useSpring({
    height: isMenuOpen ? 'auto' : 0,
    opacity: isMenuOpen ? 1 : 0,
    backgroundColor: isDayMode
      ? user.navColorDay.color || "rgb(228, 228, 231)"
      : user.navColorNight.color || "rgb(77, 77, 77)"
  });

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };



  return (
    <>
      {user.isNavShowing && (
        <>
          <nav className={`${navClasses} p-4`} style={{
            backgroundColor: isDayMode
              ? user.navColorDay.color || "rgb(228, 228, 231)"
              : user.navColorNight.color || "rgb(77, 77, 77)"
          }}>
            <div className="container mx-auto flex justify-between items-center">

              {/* Navbar Branding */}
              <FunctionalBranding {...props} />

              {/* Night Mode Switch / Hamburger Menu Button (visible on mobile) */}
              <div className="lg:hidden">
                <FunctionalNightModeSwitchMobile {...props} />

                <IconButton color="inherit" className="mr-2" onClick={toggleMenu}>
                  <MenuIcon className={`${signInClasses}`} />
                </IconButton>
              </div>

              {/* Social Icons and Sign In (visible on larger screens) */}
              <div className="hidden lg:flex items-center space-x-4">
                <div className="hidden lg:flex space-x-4">

                  <FunctionalNightModeSwitchDesktop {...props} />
                  <FunctionalLinksDesktop {...props} />
                  <FunctionalCallToAction {...props} />

                </div>
                {/* Sign In Button */}
                <a href="#" className={`${signInClasses}`}>
                  Sign In
                </a>
              </div>
            </div>
          </nav>

          {/* Collapsible Menu (visible on mobile) */}
          <animated.div style={springProps} className={`${navClasses} lg:hidden overflow-hidden`}>

            <div className='my-2 px-4' style={{
              borderBottom: "1px solid rgb(229, 231, 235)",
            }}>

              {/* Social Icons */}
              <FunctionalSocialMobile {...props} />
              <div className='py-2'>
                <FunctionalCallToAction {...props} />
                <div className={`${signInClasses} px-4 py-2 rounded cursor-pointer`}>
                  Sign in
                </div>
              </div>

            </div>
            {/* Links */}
            <FunctionalLinksMobile {...props} />
          </animated.div>
        </>
      )}
    </>
  )
}

export default FunctionalNav