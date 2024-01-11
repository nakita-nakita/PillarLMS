// Libraries
import React from 'react';
import { useRouter } from 'next/router';

// import { globalHistory } from "@reach/router"

// Mine
import AdminLayoutContext from '../adminLayout.context';
import UserChip from '@/components/chip/user.chip';
import { realtimeLink } from '@/utils/realtime/link';

// MUI
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';

export default function Navigator(props) {
  const { setLeftDrawer, idChip, panelMeetingDoc, setPanelMeetingDoc, leftDrawer } = React.useContext(AdminLayoutContext)
  const router = useRouter()
  const other = props;
  const theme = useTheme();

  const changeUrl = (href) => {
    setLeftDrawer(prevState => ({
      ...prevState,
      isOpened: false,
    }))
    // router.push(href)
    realtimeLink({
      to: href,
      leaderUserId: panelMeetingDoc.leader?.id,
      meetingId: panelMeetingDoc.id,
      router,
      userId: idChip.id,
      setPanelMeetingDoc,

    })
  }

  const topHeader = {
    // py: '2px',
    // px: 3,
    // color: 'rgba(255, 255, 255, 0.7)',
    // '&:hover, &:focus': {
    display: "block",
    bgcolor: '#afac9b',
    color: "#F3E6DB",
    fontSize: "11px",
    // },
  };

  const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
  };

  const circleStatus = {
    borderRadius: "50px",
    height: "15px",
    width: "15px",
    display: "inline-block",
  }

  const circleStatusDangerStyle = {
    ...circleStatus,
    backgroundColor: theme.palette.error.dark,
  }

  const circleStatusSuccessStyle = {
    ...circleStatus,
    backgroundColor: theme.palette.success.dark,
  }

  // React.useEffect(() => {
  //   setCategoriesData(categories())

  //   //New notifications
  //   doYouHaveNewNotifications().then((response) => {
  //     if (!response.errors) {
  //       setNewBadge(response.data.doesUserHaveNewNotifications);
  //     }
  //   })
  // }, [])


  // React.useEffect(() => {
  //   setCategoriesData(categories())
  // }, [location])

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          style={{
            backgroundColor: "rgb(59 0 0)",
            color: "white",
          }}
        >
          <div>

            {!leftDrawer?.shouldApplyToTopNavMenu && (
              <br />
            )}
            <Typography
              variant='h5'
            >
              Pillar RCM with CMS
            </Typography>
            {!leftDrawer?.shouldApplyToTopNavMenu && (
              <br />
            )}
          </div>

        </ListItem>
        {leftDrawer.shouldApplyToTopNavMenu && (
          <ListItem sx={{ ...itemCategory, ...topHeader, fontSize: "11px", color: '#fff', backgroundColor: "#230f34" }}>
            <br />
            <div style={{ textAlign: "center" }}>
              <img src={`${process.env.NEXT_PUBLIC_WEB_API_URL}${leftDrawer.logo}`} alt="Description of image" style={{ width: "150px" }} />
              <br />
              <br />
              <h2>{leftDrawer.name}</h2>
            </div>
            <br />
          </ListItem>
        )}


        <ListItem
          sx={{ py: 0, px: 0, fontSize: "11px", }}
          onClick={() => changeUrl("/portal/profile")}
        >
          <ListItemButton>
            <ListItemText>
              <UserChip
                callByType={idChip.callByType}
                circleColor={idChip.circleColor}
                email={idChip.email}
                firstName={idChip.firstName}
                labelColor={idChip.labelColor}
                lastName={idChip.lastName}
                picturePreview={idChip.picture}
                username={idChip.username}
              />



            </ListItemText>
          </ListItemButton>
        </ListItem>

        {/* <br /> */}

        <ListItem
          sx={{ pt: "26px", pb: "2px" }}
        >
          <ListItemText>
            <Typography variant="body1" color="textSecondary">
              <em>
                <small>
                  For Organization
                </small>
              </em>
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem

          sx={{
            py: 0,
            px: 0,
            background: router.pathname.startsWith('/portal/dashboard') ? theme.palette.grey[300] : "initial",
          }}
          onClick={() => changeUrl("/portal/dashboard")}
        >
          <ListItemButton>
            <ListItemIcon>
              <img src="/admin/icons/dashboard.png" style={{ width: "50px", height: "50px" }} />
            </ListItemIcon>

            <ListItemText>
              <Typography color="inherit" variant="h6" component="h2"
                style={{
                  // lineHeight: 1.1,
                  color: theme.palette.grey[900]
                }}
              >
                Dashboard
              </Typography>


            </ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem

          sx={{
            py: 0,
            px: 0,
            background: router.pathname.startsWith('/portal/media-manager') ? theme.palette.grey[300] : "initial",
          }}
          onClick={() => changeUrl("/portal/media-manager")}
        >
          <ListItemButton>
            <ListItemIcon>
              <img src="/admin/icons/icons8-hdd-100.png" style={{ width: "50px", height: "50px" }} />
            </ListItemIcon>
            <ListItemText>
              <Typography color="inherit" variant="h6" component="h2"
                style={{
                  // lineHeight: 1.1,
                  color: theme.palette.grey[900]
                }}
              >
                Media Manager
              </Typography>


            </ListItemText>
          </ListItemButton>
        </ListItem>
        {/* <br /> */}


        {/* <ListItemButton onClick={() => changeUrl("/portal/calendar")}>

          <ListItem
            
            sx={{
              py: 0,
              px: 0,
              background: router.pathname.startsWith('/portal/admin/') ? theme.palette.grey[300] : "initial",
            }}
          >
            <ListItemText>
              <Typography color="inherit" variant="h6" component="h2"
                style={{
                  // lineHeight: 1.1,
                  color: theme.palette.grey[900]
                }}
              >
                Calendar
              </Typography>


            </ListItemText>
          </ListItem>
        </ListItemButton>
        <br /> */}
        <Box>
          {/* <ListItem 
            sx={{
              py: 0,
              px: 0,
              background: router.pathname.startsWith('/portal/admin/') ? theme.palette.grey[300] : "initial",
            }}>
            <ListItemText>
              <Typography color="inherit" variant="h6" component="h3"
                style={{
                  // lineHeight: 1.1,
                  color: theme.palette.grey[700]
                }}
              >
                <small>

                  Designers
                </small>
              </Typography>


            </ListItemText>
          </ListItem> */}

          <ListItem
            sx={{ pt: "26px", pb: "2px" }}
          >
            <ListItemText>
              <Typography variant="body1" color="textSecondary">
                <em>
                  <small>
                    For Content Creation
                  </small>
                </em>
              </Typography>
            </ListItemText>
          </ListItem>

          <ListItem

            sx={{
              py: 0,
              px: 0,
              background: router.pathname.startsWith('/portal/site') ? theme.palette.grey[300] : "initial",
            }}
            onClick={() => changeUrl("/portal/site/discussion")}
            secondaryAction={
              <div style={circleStatusSuccessStyle}></div>
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <img src="/admin/icons/icons8-website-100.png" style={{ width: "50px", height: "50px" }} />
              </ListItemIcon>

              <ListItemText>
                <Typography color="inherit" variant="h6" component="h2"
                  style={{
                    // lineHeight: 1.1,
                    color: theme.palette.grey[900]
                  }}
                >
                  Website
                </Typography>


              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={{ pt: "26px", pb: "2px" }}
          >
            <ListItemText>
              <Typography variant="body1" color="textSecondary">
                <em>
                  <small>
                    For users
                  </small>
                </em>
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            sx={{
              py: 0,
              px: 0,
              background: router.pathname.startsWith('/portal/admin') ? theme.palette.grey[300] : "initial",
            }}
            onClick={() => changeUrl("/portal/admin/user-management")}
            secondaryAction={
              <div style={circleStatusSuccessStyle}></div>
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <img src="/admin/icons/icons8-user-shield-100.png" style={{ width: "50px", height: "50px" }} />
              </ListItemIcon>
              <ListItemText>
                <Typography color="inherit" variant="h6" component="h2"
                  style={{
                    // lineHeight: 1.1,
                    color: theme.palette.grey[900]
                  }}
                >
                  Admins
                </Typography>


              </ListItemText>
            </ListItemButton>
          </ListItem>


          <br />
          <Divider />
          <br />
          <ListItemButton>

            <ListItem

              sx={{
                py: 0,
                px: 0,
              }}
            >
              <ListItemText>
                <Typography color="inherit" variant="h6" component="h2"
                  style={{
                    // lineHeight: 1.1,
                    color: theme.palette.grey[900]
                  }}
                >
                  Sign out
                </Typography>


              </ListItemText>
            </ListItem>
          </ListItemButton>
          <br />
          <Divider />
          <br />
          <div
            style={{
              padding: "8px 15px",
              color: theme.palette.grey[700]
            }}
          >
            <small>

              Version: Pre-Alpha
            </small>
          </div>

        </Box>
      </List>
    </Drawer>
  );
}
