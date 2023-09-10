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
import PageDesignerLayoutContext from '../../pageDesignerLayout.context';

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
        onClick={() => changeSlide("HOME", "SITE")}
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
              {/* <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Avatar
                  alt={(<ArrowBackIcon />)}
                  // src={(<ArrowBackIcon />)}
                  sx={{ width: 40, height: 40, mr: 1 }}
                />

              </div> */}
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
                    Main Menu
                  </Typography>
                </div>
              </div>
            </div>



          </ListItemText>
        </ListItem>
      </ListItemButton>
      {/* <br /> */}
      {/* 

      <ListItemButton onClick={() => changeUrl("/admin/site-designer/discussion/")}>

        <ListItem
          alignItems="flex-start"
          secondaryAction={(
            <div style={circleStatusDangerStyle}></div>
          )}>
          <ListItemAvatar>
            <Avatar alt="Page" src="/server-assets/page-8bit-icon.png" />
          </ListItemAvatar>
          <ListItemText
            primary="Page"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Status
                </Typography>
                {" — Not Ready"}
              </React.Fragment>
            }
          />
        </ListItem>
      </ListItemButton>
      <Divider variant="inset" component="li" />
      <ListItemButton onClick={() => changeUrl("/admin/site-designer/discussion/")}>

        <ListItem
          alignItems="flex-start"
          secondaryAction={(
            <div style={circleStatusSuccessStyle}></div>
          )}
        >
          <ListItemAvatar>
            <Avatar alt="Meta-data for page" src="/server-assets/pagedata-8bit-icon.png" />
          </ListItemAvatar>
          <ListItemText
            primary="Meta Data for page"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Status
                </Typography>
                {" — Ready"}
              </React.Fragment>
            }
          />
        </ListItem>
      </ListItemButton> */}

      <ListItem alignItems="flex-start">
        {/* <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar> */}
        <ListItemText
          primary="Page Settings"
          secondary={
            <React.Fragment>
              <br />
              <br />

              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" color="primary">
                    <AddCircleIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary="Panels"
                // secondary={secondary ? 'Secondary text' : null}
                />
              </ListItem>
              <Divider component="li" />
              <PagePanelsDnd />







































              {/* <ListItem>
                <ListItemText
                  primary={(<em>Nothing here</em>)}
                // secondary={secondary ? 'Secondary text' : null}
                />
              </ListItem> */}

              <br />
              <br />
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="flex-start">
        {/* <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar> */}
        <ListItemText
          primary="Advance Settings"
          secondary={
            <React.Fragment>
              {/* <br /> */}
              <p>Page Template</p>
              <FormControl fullWidth>
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Age"
                  value={10}
                // onChange={handleChange}
                >
                  <MenuItem value={10}>2023 template</MenuItem>
                  <MenuItem value={20}>HR template</MenuItem>
                  {/* <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
              <br />
              <br />
              <p>Status</p>
              <FormGroup>
                <FormControlLabel control={<Switch defaultChecked />} label={(<div style={circleStatusSuccessStyle}></div>)} />
              </FormGroup>
              {/* <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'} */}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="flex-start">
        {/* <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar> */}
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