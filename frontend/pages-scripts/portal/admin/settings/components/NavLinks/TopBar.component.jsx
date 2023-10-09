'use-client'

import { IconButton, ListItem, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useTheme } from '@mui/system';

function TopBar() {
  const theme = useTheme();

  return (
    <ListItem style={{ backgroundColor: theme.palette.grey[800], color: theme.palette.common.white }}>
      {/* <Typography variant="h6">Navigation</Typography> */}
      <ListItemText
          primary="Navigation"
        />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="add" style={{ color: theme.palette.primary.main }}>
          <Add />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default TopBar;
