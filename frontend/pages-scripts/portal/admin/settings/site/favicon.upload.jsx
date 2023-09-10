import * as React from 'react';
// import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/material/FormLabel';
// import FormHelperText from '@mui/joy/FormHelperText';
// import Select from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

export default function FaviconUpload() {
  const theme = useTheme();
  return (
    <>
      {/* <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button">
        Picture
      </FormLabel> */}

      <Stack spacing={2} direction="row">
        <div style={{ display: "inline-block", padding: "3px" }}>
          <img style={{ height: "16px", width: "16px" }} />
        </div>
        <Button
          variant="contained"
          component="label"
        >
          Upload Favicon
          <input
            type="file"
            hidden
          />
        </Button>
        <Button
          variant="contained"
          component="label"
        >
          Select Favicon
          <input
            type="file"
            hidden
          />
        </Button>
      </Stack>
      <br />
      <br />
      <p>Preview:</p>
      <List sx={{ maxWidth: "275px", border: `1px solid ${theme.palette.grey[300]}`, borderRadius: "5px" }}>
        {/* {generate( */}
        <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <CloseIcon />
            </IconButton>
          }
        >
          <span style={{ marginRight: "4px" }}>
            <img style={{ height: "16px", width: "16px" }} />
          </span>
          <ListItemText
            primary="Home | ExampleChurch.com"
          // secondary={secondary ? 'Secondary text' : null}
          />
        </ListItem>
        {/* )} */}
      </List>
      {/* <Button>Clear</Button> */}
    </>
  );
}