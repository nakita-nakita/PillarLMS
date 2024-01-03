// Libraries
import React from 'react'

export const UserManagementTabsContext = React.createContext();

export function UserManagementTabsProvider({ children }) {

  const [tabs, setTabs] = React.useState({
    tabs: null,
    selectedValue: null,
  })


  return (
    <UserManagementTabsContext.Provider value={{
      tabs, setTabs,
    }}>
      {children}
    </UserManagementTabsContext.Provider>
  )
}

export default UserManagementTabsContext