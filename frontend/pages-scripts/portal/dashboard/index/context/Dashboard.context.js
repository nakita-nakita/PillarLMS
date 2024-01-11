// Libraries
import React, { useState } from 'react'

export const DashboardContext = React.createContext();

export function DashboardProvider({ children }) {

  const [isModalOpened, setIsModelOpened] = useState(false)

  return (
    <DashboardContext.Provider value={{
      isModalOpened, setIsModelOpened,
    }}>
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider