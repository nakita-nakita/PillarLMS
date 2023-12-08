// libraries
import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

// in-component
import DisplayBranding from './Branding';
import DisplayNightModeSwitchMobile from './NightModeSwitchMobile';
import DisplayNightModeSwitchDesktop from './NightModeSwitchDesktop';
import DisplayLinksDesktop from './LinksDesktop';
import DisplayCallToAction from './CallToAction';
import DisplaySocialMobile from './SocialMobile';
import DisplayLinksMobile from './LinksMobile';

function DisplayNav(props) {
  // imports
  const { system } = props.data;
  const {
    // colors
    isDayMode,
    isNightMode,
  } = system.state

  // color adjustments
  const [navClasses] = useState(
    isDayMode
      ? "bg-stone-400 text-gray-800"
      : "bg-stone-900 text-gray-200"
  )

  const [signInClasses] = useState(
    isDayMode
      ? "text-gray-800 hover:text-gray-900"
      : "text-gray-200 hover:text-gray-300"
  )
  // logic
  const [isMenuOpen, setMenuOpen] = useState(true);

  const springProps = useSpring({
    height: isMenuOpen ? 'auto' : 0,
    opacity: isMenuOpen ? 1 : 0,
  });

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };


  return (
    <>
      <nav className={`${navClasses} p-4`}>
        <div className="container mx-auto flex justify-between items-center">

          {/* Navbar Branding */}
          <DisplayBranding {...props} />

          {/* Night Mode Switch / Hamburger Menu Button (visible on mobile) */}
          <div className="lg:hidden">
            <DisplayNightModeSwitchMobile {...props} />

            <IconButton color="inherit" className="mr-2" onClick={toggleMenu}>
              <MenuIcon className={`${signInClasses}`} />
            </IconButton>
          </div>

          {/* Social Icons and Sign In (visible on larger screens) */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="hidden lg:flex space-x-4">

              <DisplayNightModeSwitchDesktop {...props} />
              <DisplayLinksDesktop {...props} />
              <DisplayCallToAction {...props} />

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
          <DisplaySocialMobile {...props} />
          <div className='py-2'>
            <DisplayCallToAction {...props} />
            <div className={`${signInClasses} px-4 py-2 rounded cursor-pointer`}>
              Sign in
            </div>
          </div>

        </div>
        {/* Links */}
        <DisplayLinksMobile {...props} />
      </animated.div>
    </>
  )
}

export default DisplayNav