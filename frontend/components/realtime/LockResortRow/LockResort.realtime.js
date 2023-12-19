import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

function RealTimeResortLockedRow({ isOnlyPerson }) {
  const handleOrderChange = () => {
    // Your logic for handling order change
  };

  return (
    <>
      <ListItem>
        <Box display="flex" alignItems="center" width="100%">

          {/* Button */}
          <Button
            variant="outlined"
            color="primary"
            onClick={handleOrderChange}
            disabled={isOnlyPerson === undefined || isOnlyPerson === true}
          >
            Change Order
          </Button>

          {/* Secondary Action with Chip */}
          <ListItemSecondaryAction>
            <Box marginLeft={2}>
              <Chip label="User Chip" />
            </Box>
          </ListItemSecondaryAction>

        </Box>
      </ListItem>
      <Divider component="li" style={{ borderTopWidth: "1px" }} />

    </>
  );
}

export default RealTimeResortLockedRow;
