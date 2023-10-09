'use client'

import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { useTheme } from '@mui/system';

function HeaderRow({ label = "Select Header" }) {
  const theme = useTheme();

  return (
    <ListItem alignItems="flex-start" style={{ backgroundColor: theme.palette.grey[800], color: theme.palette.common.white }}>
        {/* If you want to reintroduce the avatar in the future, you can uncomment the following section:
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar> 
        */}
        <ListItemText primary={label} />
    </ListItem>
  );
}

export default HeaderRow;
