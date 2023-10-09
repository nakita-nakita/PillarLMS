// Libraries
import React from 'react'

export const SettingTabsContext = React.createContext();

export function SettingTabsProvider({ children }) {

  const [tabs, setTabs] = React.useState({
    tabs: null,
    selectedValue: null,
  })


  return (
    <SettingTabsContext.Provider value={{
      tabs, setTabs,
    }}>
      {children}
    </SettingTabsContext.Provider>
  )
}

export default SettingTabsContext