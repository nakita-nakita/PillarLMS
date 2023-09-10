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

export default function PageBuilderLeftSlidesHomeSidebar() {
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

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', p: 0 }}>
      <ListItemButton
        onClick={() => changeUrl("/admin/site-designer/page")}
        sx={{
          // backgroundColor: theme.palette.grey[100],
          background: "#230f34",
          color: theme.palette.primary.contrastText,
          "&:hover": {
            background: "#662a5d",
          }
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
                    Back to site
                  </Typography>
                </div>
              </div>
            </div>



          </ListItemText>
        </ListItem>
      </ListItemButton>


      {/* <br /> */}
      <ListItemButton onClick={() => changeSlide("PAGE", "SITE")}>

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
      <ListItemButton onClick={() => changeSlide("METADATA", "METADATA")}>

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
      </ListItemButton>

      {/* <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem> */}
    </List>
  );
}