'use client'

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Badge from '@mui/material/Badge';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import PageDesignerLayoutContext from '../../WebsiteSettingLayout.context';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PagePanelsDnd from '../components/PagePanelsDnD';
import TextField from '@mui/material/TextField';

export default function PageBuilderLeftSlidesPageSidebar() {
  const pageDesignerLayoutContext = React.useContext(PageDesignerLayoutContext)
  const theme = useTheme();
  const router = useRouter()

  const changeUrl = (href) => {
    router.push(href)
  }

  const changeSlide = (slide, main) => {
    pageDesignerLayoutContext.setLeftDrawer(prevState => ({
      ...prevState,
      slide,
      main,
    }))
  }

  const circleStatus = {
    borderRadius: "50px",
    height: "15px",
    width: "15px",
  }

  const circleStatusDangerStyle = {
    ...circleStatus,
    backgroundColor: theme.palette.error.dark,
  }

  const circleStatusSuccessStyle = {
    ...circleStatus,
    backgroundColor: theme.palette.success.dark,
  }

  // return (<p>Page</p>)

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', p: 0 }}>
      <ListItemButton
        onClick={() => changeSlide("PAGE", "SITE")}
        sx={{
          // backgroundColor: theme.palette.grey[100],
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
        }}
      >

        <ListItem
          sx={{
            py: 1,
            px: 2,
          }}
        >
          <ListItemText>
            <div style={{ display: "flex" }}>
              <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}>

                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  color: theme.palette.grey[100],
                  height: "35px",
                }}>
                  <ArrowBackIcon sx={{ mr: 1 }} />
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexDirection: "column",
                  color: theme.palette.grey[300]
                }}>

                  <Typography color="inherit" variant="h6" component="h2"
                    style={{
                      lineHeight: 1.1,
                      textDecoration: "underline",
                    }}
                  >
                    Page
                  </Typography>
                </div>
              </div>
            </div>
          </ListItemText>
        </ListItem>
      </ListItemButton>







      <ListItem alignItems="flex-start">
        <ListItemText
          primary="Panel"
          secondary={
            <React.Fragment>

              <p>Test input name</p>
              <TextField
                id="outlined-basic"
                // label="Outlined"
                variant="outlined"
                fullWidth
                multiline
                rows={10}
                defaultValue={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.

                Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.`}

              />
              <br />

              <br />
              <br />
            </React.Fragment>
          }
        />
      </ListItem>







      <Divider component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="Fancy Section"
          secondary={
            <React.Fragment>
              <p>Transitions</p>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Age"
                  value={10}
                // onChange={handleChange}
                >
                  <MenuItem value={10}>Fade Up</MenuItem>
                  <MenuItem value={20}>Fade Down</MenuItem>
                </Select>
              </FormControl>
              <br />
              <br />
              <p>Status</p>
              <FormGroup>
                <FormControlLabel control={<Switch defaultChecked />} label={(<div style={circleStatusSuccessStyle}></div>)} />
              </FormGroup>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText
          // primary="Advance Settings"
          secondary={
            <React.Fragment>
              <br />
              <br />
              <Button variant="contained">Save</Button>
              <br />
              <br />
              <br />
              <br />
              <br />
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}