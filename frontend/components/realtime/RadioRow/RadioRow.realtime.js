'use client'

import React from 'react';
import ListItem from '@mui/material/ListItem';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

function RealTimeRadioRow({ id, label }) {
  return (
    <ListItem>
      <Box display="flex" alignItems="center" width="100%">

        {/* Radio Component */}
        <Radio />

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
        <Chip label="YourChipLabel" />

      </Box>
    </ListItem>
  )
}

export default RealTimeRadioRow;
