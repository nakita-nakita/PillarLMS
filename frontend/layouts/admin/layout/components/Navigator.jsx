// Libraries
import React from 'react'; 
import { useRouter } from 'next/navigation'
import Link from 'next/link';

// import { globalHistory } from "@reach/router"
// import { Link as GatsbyLink, navigate } from 'gatsby';

// Mine
// import { doYouHaveNewNotifications } from '../store/Navigator.graphql.store';
// import PageLink from '../../../components/realtime/link/PageLink.component';
// import pageNavigate from '../../../components/realtime/link/pageNavigate.func';
// import { user } from '../../../components/admin/utils/user'

// MUI
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import Alert from '@mui/material/Alert'
import AdminLayoutContext from '../adminLayout.context';
// import AdminLayoutContext from "../adminLayout.context"

// import PeopleIcon from '@mui/icons-material/People';
// const path = globalHistory.location.pathname

export default function Navigator(props) {
  const { tabs, setLeftDrawer } = React.useContext(AdminLayoutContext)
  const router = useRouter()
  const [newBadge, setNewBadge] = React.useState(false)
  const other = props;
  const theme = useTheme();

  const changeUrl = (href) => {
    setLeftDrawer(prevState => ({
      ...prevState,
      isOpened: false,
    }))
    router.push(href)
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

          <br/>
          <br/>
          <br/>
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
              secondaryAction={
                <Avatar
                  alt="Remy Sharp"
                  src="https://random.imagecdn.app/v1/image?width=56&height=56"
                  sx={{ width: 40, height: 40, mr: 1 }}
                />
              }
            >
              <ListItemText>
                {/* <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>


                  </div>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}> */}

                <Typography color="inherit" variant="h6" component="h2"
                  style={{
                    lineHeight: 1.1,
                    color: theme.palette.grey[700]
                  }}
                >
                  John Edwards
                </Typography>
                {/* </div>
                </div> */}



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
