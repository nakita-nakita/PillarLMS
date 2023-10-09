'use client'

import React from 'react';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

function RealTimeResortLockedRow() {
  return (
    <ListItem>
      <Box display="flex" alignItems="center" width="100%">

        {/* Left Text */}
        <Box
          display="flex"
          alignItems="center"
          flexGrow={1}
          overflow="hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,  // Adjust as needed
            WebkitBoxOrient: 'vertical'
          }}
        >
          0:03 locked
        </Box>

        {/* Chip Component */}
        <Chip label="YourChipLabel" />

      </Box>
    </ListItem>
  );
}

export default RealTimeResortLockedRow;
