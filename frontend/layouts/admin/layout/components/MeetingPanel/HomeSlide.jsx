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

function HomeSlide() {

  const { meetingPanel, setMeetingPanel, } = React.useContext(AdminLayoutContext)

  const goToMeeting = () => {
    setMeetingPanel(prevState => ({
      ...prevState,
      slide: "MEETING"
    }))
  }

  return (
    <>

      {/* <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={12} md={6} sx={{ width: "100%" }}> */}

      <List sx={{ width: "100%" }}>
        {/* {generate( */}
        <ListItem

          secondaryAction={
            // <a href="#">New</a>
            <Button variant="contained" onClick={goToMeeting}>New</Button>
          }>
          <ListItemText
            primary={(
              <Typography variant="h6" component="div">
                All Meetings
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
            <a href="#">Join</a>
          }>
          <ListItemText
            primary="Weekly Meeting"
          // secondary="Secondary text"
          />
        </ListItem>
      </List>
      {/* </Demo> */}
      {/* </Grid>
      </Grid> */}

      {/* <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={12} md={6} sx={{ width: "100%" }}> */}
      <Typography sx={{ p: 2 }} variant="h6" component="div">
        On this page
      </Typography>
      {/* <Demo> */}
      <List sx={{ width: "100%" }}>
        {/* {generate( */}
        <ListItem>
          <ListItemText
            primary={<em>No Meetings</em>}
          // secondary="Secondary text"
          />
        </ListItem>
      </List>
      {/* </Demo> */}
      {/* </Grid>
      </Grid> */}
    </>
  )
}

export default HomeSlide
