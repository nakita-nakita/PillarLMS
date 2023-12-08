import React from 'react'
import MenuContainer from './components/MenuContainer'
import Divider from '@mui/material/Divider'

function RealTimeMenu({ menu, isDarkMode, setIsDarkMode, entity, onChangeByUser, setAnswer }) {

  return (
    <>
      {menu && menu.length > 0 && menu.map((m, i) => (
        <React.Fragment key={i}>
          <MenuContainer menuItem={m} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} entity={entity} onChangeByUser={onChangeByUser} setAnswer={setAnswer} />
          <Divider component="li" style={{ borderTopWidth: "5px" }} />
        </React.Fragment>
      ))}
    </>
  )
}

export default RealTimeMenu