'use client'

import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { useTheme } from '@mui/system';


function HeaderRow({ label = "Select Header", secondaryAction }) {
  const theme = useTheme();

  return (
    <ListItem alignItems="center" style={{ backgroundColor: theme.palette.grey[800], color: theme.palette.common.white }}>
      <ListItemText primary={label} />
      {secondaryAction && (
        <div style={{ marginLeft: 'auto', marginRight: '10px', display: 'flex', alignItems: 'center' }}>
          {/* Your content for secondary action */}
          {secondaryAction}
        </div>
      )}
    </ListItem>
  );
}

export default HeaderRow;