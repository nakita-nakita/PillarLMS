// Libraries
import React from 'react';
import { useRouter } from 'next/navigation'

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

export default function Navigator(props) {
  const { setLeftDrawer, idChip, panelMeetingDoc, setPanelMeetingDoc } = React.useContext(AdminLayoutContext)
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

  const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
      bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
  };

  const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
  };

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
        <ListItem sx={{ ...itemCategory, ...topHeader, fontSize: "11px", color: '#fff', backgroundColor: "#230f34" }}>

          <br />
          <br />
          <br />
          {/* <Alert severity="warning">
            <small>
              <strong>
                Upgrade
              </strong>
            </small>
            <hr />
            <span>
              Building Plan
            </span>
          </Alert> */}
          <br />

        </ListItem>

        <Box sx={{ ...topHeader, fontSize: "11px", color: '#fff', backgroundColor: "aliceblue" }}>
          <ListItemButton onClick={() => changeUrl("/portal/profile")}>

            <ListItem
            // sx={{ py: 2, px: 3 }}
            // // will replace secondary action with gear for user settings at a later date
            // secondaryAction={
            //   <Avatar
            //     alt="Remy Sharp"
            //     src="https://random.imagecdn.app/v1/image?width=56&height=56"
            //     sx={{ width: 40, height: 40, mr: 1 }}
            //   />
            // }
            >
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
            </ListItem>
          </ListItemButton>

        </Box>
        <br />

        <ListItemButton onClick={() => changeUrl("/portal/media-manager/")}>

          <ListItem
            sx={{ py: 0, px: 3 }}
          >
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
          </ListItem>
        </ListItemButton>
        <br />


        <ListItemButton onClick={() => changeUrl("/portal/calendar")}>

          <ListItem
            sx={{ py: 0, px: 3 }}

          // secondaryAction={
          //   <Alert severity="warning"><small><strong>Upgrade</strong></small><hr /><span>Virtual Plan</span></Alert>
          // }
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
        <br />
        <Box>
          {/* <ListItem sx={{ py: 0, px: 3 }}>
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
          <ListItemButton onClick={() => changeUrl("/portal/site/discussion/")}>

            <ListItem sx={{ py: 0, px: 3 }}>
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
            </ListItem>
          </ListItemButton>
          {/* <ListItemButton>

            <ListItem
              sx={{ py: 0, px: 3 }}>
              <ListItemText>
                <Typography color="inherit" variant="h6" component="h2"
                  style={{
                    // lineHeight: 1.1,
                    color: theme.palette.grey[900]
                  }}
                >
                  Pricing Models
                </Typography>


              </ListItemText>
            </ListItem>
          </ListItemButton> */}

          <br />
          {/* <ListItem sx={{ py: 0, px: 3 }}>
            <ListItemText>
              <Typography color="inherit" variant="h6" component="h3"
                style={{
                  // lineHeight: 1.1,
                  color: theme.palette.grey[700]
                }}
              >
                <small>

                  Use Cases
                </small>
              </Typography>


            </ListItemText>
          </ListItem> */}
          {/* <ListItemButton>

            <ListItem sx={{ py: 0, px: 3 }}>
              <ListItemText>
                <Typography color="inherit" variant="h6" component="h2"
                  style={{
                    // lineHeight: 1.1,
                    color: theme.palette.grey[900]
                  }}
                >
                  Account Managing
                </Typography>


              </ListItemText>
            </ListItem>
          </ListItemButton> */}
          {/* <ListItemButton>
            <ListItem sx={{ py: 0, px: 3 }}>
              <ListItemText>
                <Typography color="inherit" variant="h6" component="h2"
                  style={{
                    // lineHeight: 1.1,
                    color: theme.palette.grey[900]
                  }}
                >
                  Marketing
                </Typography>


              </ListItemText>
            </ListItem>
          </ListItemButton> */}
          {/* <ListItemButton>
            <ListItem sx={{ py: 0, px: 3 }}>
              <ListItemText>
                <Typography color="inherit" variant="h6" component="h2"
                  style={{
                    // lineHeight: 1.1,
                    color: theme.palette.grey[900]
                  }}
                >
                  Finance
                </Typography>


              </ListItemText>
            </ListItem>
          </ListItemButton> */}
          {/* <ListItemButton>
            <ListItem sx={{ py: 0, px: 3 }}>
              <ListItemText>
                <Typography color="inherit" variant="h6" component="h2"
                  style={{
                    // lineHeight: 1.1,
                    color: theme.palette.grey[900]
                  }}
                >
                  Analytics
                </Typography>


              </ListItemText>
            </ListItem>
          </ListItemButton> */}
          <ListItemButton onClick={() => changeUrl("/portal/admin/user-management/")}>
            <ListItem sx={{ py: 0, px: 3 }}>
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
            </ListItem>
          </ListItemButton>


          <br />
          <Divider />
          <br />
          <ListItemButton>

            <ListItem
              sx={{ py: 0, px: 3 }}
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

        </Box>
      </List>
    </Drawer>
  );
}
