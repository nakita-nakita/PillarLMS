import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component'
import ListItem from '@mui/material/ListItem'
import React, { useContext } from 'react'
import RealTimeSwitchRow from '../../SwitchRow/SwitchRow.realtime'
import { SettingHeaderContext } from '@/pages-scripts/portal/admin/settings/pages/header/context/SettingHeader.context'
import { Divider, useTheme } from '@mui/material'
import { initSocket } from '@/utils/realtime/socket'
import dynamic from 'next/dynamic'
import RealTimeColorSelectionRow from '../../ColorSelectionRow/ColorSelectionRow.realtime'
import RealTimeMediaSelectionRow from '../../MediaSelectionRow/MediaSelection'

const DynamicRealTimeTextField = dynamic(() => import('@/components/realtime/TextFieldRow/TextField.realtime'), {
  ssr: false
});


const isShowingComponent = ({ isShowing, isDarkMode }) => {
  if (!isShowing) {
    return true
  }

  switch (isShowing) {
    case "isDayMode":
      return !isDarkMode

    case "isNightMode":
      return isDarkMode

    default:
      return !isDarkMode
  }
}

const SelectComponentByType = ({ entity, menuItemRow, isDarkMode, setIsDarkMode, containerLabel, onChangeByUser }) => {

  const { sameDocType, label, isShowing, ...data } = menuItemRow

  switch (sameDocType) {
    case "YDOC:V1":
      return (
        <div style={{
          display: isShowingComponent({ isShowing, isDarkMode })
            ? "block"
            : "none"
        }}>
          <DynamicRealTimeTextField
            label={label}
            data={data}
            entity={entity}
            onChangeByUser={(value) => {
              if (onChangeByUser) {
                onChangeByUser({
                  type: sameDocType,
                  name: data.name,
                  value,
                })
              }
              // // setNameValue(text)
              // const socket = initSocket()

              // socket.emit('server-setting-header-change-prop', {
              //   name: data.name,
              //   value,
              // })
            }}
          />
        </div>
      )
    case "SWITCH:V1":
      return (
        <div style={{
          display: isShowingComponent({ isShowing, isDarkMode })
            ? "block"
            : "none"
        }}>
          <RealTimeSwitchRow
            label={label}
            // label, data, entity, onChange
            data={data}
            entity={entity}
            onChangeByUser={(value) => {

              if (onChangeByUser) {
                onChangeByUser({
                  type: sameDocType,
                  name: data.name,
                  value,
                })
              }
              // setIsReadyValue(value)
              // const socket = initSocket()

              // socket.emit('server-setting-header-change-prop', {
              //   name: data.name,
              //   value,
              // })
            }}
          />
        </div>
      )
    case "COLOR_SELECTION:V1":
      return (
        <div style={{
          display: isShowingComponent({ isShowing, isDarkMode })
            ? "block"
            : "none"
        }}>

          <RealTimeColorSelectionRow
            label={label}
            data={data}
            entity={entity}
            containerLabel={containerLabel}
            onChangeByUser={(value) => {

              if (onChangeByUser) {
                onChangeByUser({
                  type: sameDocType,
                  name: data.name,
                  value,
                })
              }
              // const socket = initSocket()

              // socket.emit('server-setting-header-change-prop', {
              //   name: data.name,
              //   value,
              // })
            }}
          />
        </div>
      )

    case "MEDIA_SELECTION:V1":
      return (<RealTimeMediaSelectionRow
        label={label}
        data={data}
        entity={entity}
        onChangeByUser={(value) => {

          if (onChangeByUser) {
            onChangeByUser({
              type: sameDocType,
              name: data.name,
              value,
            })
          }
          // const socket = initSocket()

          // socket.emit('server-setting-header-change-prop', {
          //   name: data.name,
          //   value,
          // })
        }}
      />)

    default:
      return <div></div>
  }
}

function MenuContainer({ menuItem, isDarkMode, setIsDarkMode, entity, onChangeByUser }) {
  const theme = useTheme()

  return (
    <>
      <HeaderRow
        label={menuItem.header}
      />
      {menuItem.isShowing && (
        <>
          <RealTimeSwitchRow
            label={"Show"}
            // label, data, entity, onChange
            data={menuItem.isShowing}
            entity={entity}
            onChangeByUser={(value) => {
              // setIsReadyValue(value)
              const socket = initSocket()

              if (onChangeByUser) {
                onChangeByUser({
                  name: menuItem.isShowing.name,
                  value,
                })
              }

              // socket.emit('server-setting-header-change-prop', {
              //   name: menuItem.isShowing.name,
              //   value,
              // })
            }}
          />
          <Divider />
        </>
      )}

      {menuItem.data && menuItem.data.length > 0 && menuItem.data.map(menuItemRow => (
        <SelectComponentByType
          menuItemRow={menuItemRow}
          entity={entity}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          containerLabel={menuItem.header}
          onChangeByUser={onChangeByUser}
        />
      ))}
      <ListItem>
      </ListItem>
    </>
  )
}

export default MenuContainer