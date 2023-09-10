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

export default function UserList() {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start"
        secondaryAction={
          <>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={10}
              >
                <MenuItem value={10}>Previewer</MenuItem>
                <MenuItem value={20}>Content Creator</MenuItem>
                <MenuItem value={30}>Editor</MenuItem>
                <MenuItem value={40}>Admin</MenuItem>
              </Select>
            </FormControl>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
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

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={10}
              >
                <MenuItem value={10}>Previewer</MenuItem>
                <MenuItem value={20}>Content Creator</MenuItem>
                <MenuItem value={30}>Editor</MenuItem>
                <MenuItem value={40}>Admin</MenuItem>
              </Select>
            </FormControl>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
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

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={10}
              >
                <MenuItem value={10}>Previewer</MenuItem>
                <MenuItem value={20}>Content Creator</MenuItem>
                <MenuItem value={30}>Editor</MenuItem>
                <MenuItem value={40}>Admin</MenuItem>
              </Select>
            </FormControl>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
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