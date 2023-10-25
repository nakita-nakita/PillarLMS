'use client'

import React, { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { MuiColorInput } from 'mui-color-input'
import UserChip from '@/components/chip/user.chip';

function RealTimeColorPickerRow({ label, onChange, color, setColor, user }) {

  // useEffect(() => {

  // }, [])


  const handleColorChange = newValue => {
    if (newValue && setColor) {
      setColor(newValue)
    }
  }

  return (
    <ListItem>
      <Box display="flex" alignItems="center" width="100%">

        {/* Blue Box Component */}

        <MuiColorInput
          value={color}
          onChange={handleColorChange}
          sx={{ mr: 1 }}
        />

        {/* Chip Component */}
        {user && <UserChip
          callByType={user.callByType}
          circleColor={user.circleColor}
          displayName={user.displayName}
          email={user.email}
          firstName={user.firstName}
          labelColor={user.labelColor}
          lastName={user.lastName}
          picturePreview={user.picture}
          username={user.username}
        />}
        {/* <Chip label="YourChipLabel" /> */}

      </Box>
    </ListItem>
  )
}

export default RealTimeColorPickerRow;
