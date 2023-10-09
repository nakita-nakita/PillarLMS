'use client'
// Libraries
import React from 'react'

export const WebsiteSettingLayoutContext = React.createContext();

export function WebsiteSettingLayoutProvider({ children }) {

  const [leftDrawer, setLeftDrawer] = React.useState({
    isOpened: true,
    slide: "HOME", // HOME, PAGE, PANEL, METADATA
    main: "SITE", // SITE, METADATA
  })

  return (
    <WebsiteSettingLayoutContext.Provider value={{
      leftDrawer, setLeftDrawer,
    }}>
      {children}
    </WebsiteSettingLayoutContext.Provider>
  )
}

export default WebsiteSettingLayoutContext