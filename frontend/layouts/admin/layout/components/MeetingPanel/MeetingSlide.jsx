import React from 'react'
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
import Button from '@mui/material/Button';
import AdminLayoutContext from '../../adminLayout.context';
import Chip from '@mui/material/Chip';

function MeetingSlide() {

  const { meetingPanel, setMeetingPanel, } = React.useContext(AdminLayoutContext)

  const hangUp = () => {
    setMeetingPanel(prevState => ({
      ...prevState,
      slide: "HOME"
    }))
  }

  return (
    <>
      <List sx={{ width: "100%" }}>
        {/* {generate( */}
        <ListItem

          secondaryAction={
            // <a href="#">New</a>
            <Button variant="contained" color="error" onClick={hangUp}>Hang up</Button>
          }>
          <ListItemText
            primary={(
              <Typography variant="h6" component="div">
                Meeting
              </Typography>
            )}
          // secondary="Secondary text"
          />
        </ListItem>
      </List>
      {/* <Demo> */}
      <List sx={{ backgroundColor: "aliceblue", width: "100%", mb: 3, }}>
        {/* {generate( */}
        <ListItem

          secondaryAction={
            <a href="#">Change</a>
          }>
          <ListItemText
            primary="Name"
            secondary="Weekly Meeting"
          />
        </ListItem>
      </List>
      <List sx={{ backgroundColor: "aliceblue", width: "100%", mb: 3, }}>
        {/* {generate( */}
        <ListItem

          secondaryAction={
            <a href="#">Change</a>
          }>
          <ListItemText
            primary="Leader"
            secondary={(<Chip avatar={<Avatar>M</Avatar>} label="Avatar" />)}
          />
        </ListItem>
      </List>

      <List sx={{ width: "100%" }}>
        {/* {generate( */}
        <ListItem

          // secondaryAction={
          //   // <a href="#">New</a>
          //   <Button variant="contained" color="error" onClick={hangUp}>Hang up</Button>
          // }
          >
          <ListItemText
            primary={(
              <Typography variant="h6" component="div">
                In The Meeting
              </Typography>
            )}
          // secondary="Secondary text"
          />
        </ListItem>
      </List>
      <List sx={{ backgroundColor: "aliceblue", width: "100%", mb: 3, }}>
        {/* {generate( */}
        <ListItem
          // secondaryAction={
          //   <a href="#">Options</a>
          // }
          >
          <ListItemText
            // primary="Leader"
            primary={(<Chip avatar={<Avatar>M</Avatar>} label="Avatar" />)}
          />
        </ListItem>
      </List>
      <List sx={{ width: "100%" }}>
        {/* {generate( */}
        <ListItem

          // secondaryAction={
          //   // <a href="#">New</a>
          //   <Button variant="contained" color="error" onClick={hangUp}>Hang up</Button>
          // }
          >
          <ListItemText
            primary={(
              <Typography variant="h6" component="div">
                Online
              </Typography>
            )}
          // secondary="Secondary text"
          />
        </ListItem>
      </List>
      <List sx={{ backgroundColor: "aliceblue", width: "100%", mb: 3, }}>
        {/* {generate( */}
        <ListItem
          secondaryAction={
            <a href="#">Invite</a>
          }
          >
          <ListItemText
            // primary="Leader"
            primary={(<Chip avatar={<Avatar>M</Avatar>} label="Avatar" />)}
          />
        </ListItem>
        <ListItem
          secondaryAction={
            <a href="#">Invite</a>
          }
          >
          <ListItemText
            // primary="Leader"
            primary={(<Chip avatar={<Avatar>M</Avatar>} label="Avatar" />)}
          />
        </ListItem>
        <ListItem
          secondaryAction={
            <a href="#">Invite</a>
          }
          >
          <ListItemText
            // primary="Leader"
            primary={(<Chip avatar={<Avatar>M</Avatar>} label="Avatar" />)}
          />
        </ListItem>
      </List>
      <List sx={{ width: "100%" }}>
        {/* {generate( */}
        <ListItem

          // secondaryAction={
          //   // <a href="#">New</a>
          //   <Button variant="contained" color="error" onClick={hangUp}>Hang up</Button>
          // }
          >
          <ListItemText
            primary={(
              <Typography variant="h6" component="div">
                Offline
              </Typography>
            )}
          // secondary="Secondary text"
          />
        </ListItem>
      </List>
      <List sx={{ backgroundColor: "aliceblue", width: "100%", mb: 3, }}>
        {/* {generate( */}
        <ListItem
          // secondaryAction={
          //   <a href="#">Invite</a>
          // }
          >
          <ListItemText
            // primary="Leader"
            primary={(<Chip avatar={<Avatar>M</Avatar>} label="Avatar" />)}
          />
        </ListItem>
        <ListItem
          // secondaryAction={
          //   <a href="#">Invite</a>
          // }
          >
          <ListItemText
            // primary="Leader"
            primary={(<Chip avatar={<Avatar>M</Avatar>} label="Avatar" />)}
          />
        </ListItem>
        <ListItem
          // secondaryAction={
          //   <a href="#">Invite</a>
          // }
          >
          <ListItemText
            // primary="Leader"
            primary={(<Chip avatar={<Avatar>M</Avatar>} label="Avatar" />)}
          />
        </ListItem>
      </List>
    </>
  )
}

export default MeetingSlide
