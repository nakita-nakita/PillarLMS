'use client'

import React from 'react';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';

function RealTimeTextFieldRow({id, label}) {
  return (
    <ListItem>
      <TextField fullWidth label={label} variant="outlined" />
    </ListItem>
  )
}

export default RealTimeTextFieldRow;
