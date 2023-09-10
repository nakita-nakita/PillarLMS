import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function InviteList() {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start"

        secondaryAction={
          <>
            <Stack spacing={2} direction="row">
              <Button variant="contained">Resend Invite</Button>
              <Button variant="outlined" color="error">Revoke Invite</Button>
            </Stack>
          </>
        }
      >
        <ListItemText
          primary={(
            <>
              <Chip
                avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                label="Avatar"
                variant="outlined"
              />
            </>
          )}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start"

        secondaryAction={
          <>
            <Stack spacing={2} direction="row">
              <Button variant="contained">Resend Invite</Button>
              <Button variant="outlined" color="error">Revoke Invite</Button>
            </Stack>
          </>
        }
      >
        <ListItemText
          primary={(
            <Chip
              avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
              label="Avatar"
              variant="outlined"
            />
          )}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start"

        secondaryAction={
          <>
            <Stack spacing={2} direction="row">
              <Button variant="contained">Resend Invite</Button>
              <Button variant="outlined" color="error">Revoke Invite</Button>
            </Stack>
          </>
        }
      >
        <ListItemText
          primary={(
            <Chip
              avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
              label="Avatar"
              variant="outlined"
            />
          )}
        />
      </ListItem>
    </List>
  );
}