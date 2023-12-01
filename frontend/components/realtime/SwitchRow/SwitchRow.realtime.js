'use client'

import React, { useContext, useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { initSocket } from '@/utils/realtime/socket';
import UserChip from '@/components/chip/user.chip';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';


function RealTimeSwitchRow({ id, label, data, entity, onChange, onChangeByUser }) {

  const { idChip, applySwitchBuffer } = useContext(AdminLayoutContext)
  // applyTextFieldSelectionBuffer
  const [orderNumber, setOrderNumber] = useState(0)

  const [switchValue, setSwitchValue] = useState(false)

  const [user, setUser] = useState()

  const applyOrder = ({ order }) => {
    if (order > orderNumber) {
      setOrderNumber(order)
    }
  }

  useEffect(() => {
    if (onChange && (switchValue === false || switchValue === true)) {
      console.log('chaning!', switchValue)
      onChange(switchValue)
    }
  }, [switchValue])

  useEffect(() => {
    if (data?.order) {
      applyOrder({
        order: data.order
      })
    }

    if (data?.booleanValue === true || data?.booleanValue === false) {
      setSwitchValue(data.booleanValue)
      

    }

    if (data?.user) {
      setUser(data.user)
    }

    const socket = initSocket()

    if (data) {
      socket.on("samedoc-switch-change", result => {
        console.log('"samedoc-switch-change"', result, entity, data)

        if (result?.entity === entity && result?.name === data.name) {
          if (result?.user) {
            setUser(result.user)
          }

          if (result?.booleanValue === true || result?.booleanValue === false) {
            setSwitchValue(result.booleanValue)
          }

          if (result?.order) {
            applyOrder(result.order)
          }

        }
      })
    }
    //   applySwitchBuffer({
    //     entity,
    //     name: data.name,
    //     order: orderNumber,
    //     cb: (result) => {
    //       console.log('ran once!!!!!!!!!!!!!!!!! test good!!!!!!!', result)
    //       if (result?.user) {
    //         setUser(result.user)
    //       }

    //       if (result?.booleanValue === true || result?.booleanValue === false) {
    //         setSwitchValue(result.booleanValue)
    //         if (onChange) {
    //           onChange(result.booleanValue)
    //         }
    //       }

    //       if (result?.order) {
    //         applyOrder(result.order)
    //       }

    //     }
    //   }).then((highestOrderNumber) => {
    //     console.log('highestOrderNumber', highestOrderNumber)
    //     socket.on("samedoc-switch-change", result => {

    //       if (result?.entity === entity && result?.name === data.name) {
    //         if (result?.user) {
    //           setUser(result.user)
    //         }

    //         if (result?.booleanValue === true || result?.booleanValue === false) {
    //           setSwitchValue(result.booleanValue)
    //           if (onChange) {
    //             onChange(result.booleanValue)
    //           }
    //         }

    //         if (result?.order) {
    //           applyOrder(result.order)
    //         }

    //       }
    //     })
    //   })
    // }

    return () => {
      socket.off("samedoc-switch-change")
    }
  }, [])

  const handleChange = event => {
    const newValue = !switchValue
    setSwitchValue(newValue)
    setUser(idChip)

    const socket = initSocket();

    console.log('server-samedoc-switch-change', {
      entity,
      name: data.name,
      booleanValue: newValue,
    })
    socket.emit('server-samedoc-switch-change', {
      entity,
      name: data.name,
      booleanValue: newValue,
    })

    if (onChangeByUser) {
      onChangeByUser(newValue)
    }
  }

  return (
    <ListItem>
      <Box display="flex" alignItems="center" width="100%">

        {/* Switch Component */}
        <Switch
          checked={switchValue || false}
          onChange={handleChange}
        />

        {/* Middle Text Box: It will grow and shrink as required */}
        <Box
          display="flex"
          alignItems="center"
          flexGrow={1}
          overflow="hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {label}
        </Box>

        {/* Chip Component */}
        {user && <UserChip
          picturePreview={user.picture}
          circleColor={user.circleColor}
          labelColor={user.labelColor}
          callByType={user.callByType}
          email={user.email}
          firstName={user.firstName}
          lastName={user.lastName}
          username={user.username}
          displayName={user.displayName}
        />}

      </Box>
    </ListItem>
  )
}

export default RealTimeSwitchRow