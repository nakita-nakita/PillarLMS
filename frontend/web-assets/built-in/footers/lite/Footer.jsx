import React from 'react'
import DisplayFooter from './display/DisplayFooter';
import FunctionalFooter from './functional/FunctionalFooter';

function Footer(props) {
  const { system } = props.data;
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

  return (

    <>
      {isDisplayMode && (<DisplayFooter {...props} />)}
      {isFunctionalMode && (<FunctionalFooter {...props} />)}

    </>
  )
}

export default Footer