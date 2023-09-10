import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';


// import { SocketContext } from '../../global/Socket'
// import { navigate } from '../../global/Link';

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
// import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
// import AvatarGroup from '../../components/avatars/AvatarGroup.component';
// import { closeSockets, getUsersForPage, getUsersForPageResponse, userJoinedPage, userJoinedPageResponse, userLeftPage, userLeftPageResponse } from '../store/Header.graphql.store';
import MuiAlert from '@mui/material/Alert';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
// import { user } from '../../../components/admin/utils/user';
// import WhoIsOnPageModal from '../../components/modals/WhoIsOnPageModal';
// import pageNavigate from '../../../components/realtime/link/pageNavigate.func';
import GroupsIcon from '@mui/icons-material/Groups';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationButton from './Header/NotificationButton.component';
import WithAvatarGroup from './Header/WithTotalAvatars.component';
import AdminLayoutContext from '../adminLayout.context';
// import AdminLayoutContext from '../adminLayout.context';
// import WithAvatarGroup from '../../../components/realtime/whoIsOnPage/WithTotalAvatars.component';
// import NotificationButton from '../../../components/realtime/notification/NotificationButton.component';

// import Typography from '@mui/material/Typography';
// import NotificationsIcon from '@mui/icons-material/Notifications';

let previousLocation;

const AlertToast = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const lightColor = 'rgba(255, 255, 255, 0.7)';

function Header(props) {
  // const { location: { search, pathname }, pageContext } = props;
  // const id = new URLSearchParams(location.search).get('id');
  const { onDrawerToggle, onMeetingDrawerToggle } = props;
  // const adminLayoutContext = React.useContext(AdminLayoutContext)
  const { tabs } = React.useContext(AdminLayoutContext)

  console.log('tabs', tabs)

  let tabSelected = 0;

  const [isLoaded, setIsLoaded] = React.useState(false)
  const [isWhoIsOnPageModalOpened, setIsWhoIsOnPageModalOpened] = React.useState(false)
  // const [pageHasMultiUsers, setPageHasMultiUsers] = React.useState(false)
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [isSnackbarOpened, setIsSnackbarOpened] = React.useState(false)
  const [userAvatarArray, setUserAvatarArray] = React.useState([]);
  // const { socket } = React.useContext(SocketContext)

  // if (props?.tabs) {
  //   const tabValue = [...props.tabs].map((tab, index) => {
  //     if (tab.active) {
  //       return index
  //     } else {
  //       return 0
  //     }
  //   }).filter((tab) => tab > 0)

  //   tabSelected = tabValue.length ? tabValue[0] : 0;
  // }

  // const userLeft = response => {
  //   setSnackbarMessage(`${response?.username || "Another user"} has left the page.`)
  //   setIsSnackbarOpened(true)
  // }

  // const userJoined = response => {
  //   setSnackbarMessage(`${response?.username || "Another user"} has entered the page.`)
  //   setIsSnackbarOpened(true)
  // }

  // const usersLoad = response => {
  //   const newUserAvatarArray = [...response];
  //   // console.log('!!! log (Header Component, useEffect), get users for page response:', { response, userAvatarArray, newUserAvatarArray })
  //   setUserAvatarArray(() => newUserAvatarArray)
  //   setIsLoaded(true)
  // }


  // React.useEffect(() => {
  //   previousLocation = props.location
  //   // if (isLoaded) {
  //   //   userLeftPage({ socket, location: { search, pathname } })
  //   // }

  //   userLeftPageResponse({
  //     socket,
  //     next: userLeft
  //   })

  //   userJoinedPage({ socket, location: { search, pathname } })
  //   userJoinedPageResponse({
  //     socket,
  //     next: userJoined
  //   })

  //   getUsersForPage({ socket, location: { search, pathname } })
  //   getUsersForPageResponse({
  //     socket,
  //     next: usersLoad
  //   })

  // console.log('!!! useEffect (Header Component), location', { location, previousLocation })

  //   return () => {
  //     // console.log('close');
  //     userLeftPage({ socket, location: { search: previousLocation.search, pathname: previousLocation.pathname } })
  //     // closeSockets({ socket });
  //   }
  // }, [location.pathname, location.search]) //isSameDocActive



  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSnackbarOpened(false)
  };

  const listOfIcons = [
    {
      id: "1",
      src: "Bob",
      alt: "Bob",
      status: "asdfase fasf asef",
    },
    {
      id: "2",
      src: "Alice",
      alt: "Alice",
      status: "feasfkefl;e ffedfase fasf asef",
    },
    {
      id: "3",
      src: "John",
      alt: "John",
      status: "fewlasdfase fasffew asef",
    },
    {
      id: "4",
      src: "Bruce",
      alt: "Bruce",
      status: "vzxcasdfase fasnfnzf asznef",
    },
    {
      id: "5",
      src: "Max",
      alt: "Max",
      status: "czxnasdfase fazxasef",
    },
    {
      id: "6",
      src: "Frank",
      alt: "Frank",
      status: "ditd stjssj sjef",
    },
    {
      id: "7",
      src: "Matt",
      alt: "Matt",
      status: "asti stdief",
    },
    {
      id: "8",
      src: "Jack",
      alt: "Jack",
      status: "asdti  tisdis sdef",
    }
  ]

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0} style={{
        paddingTop: "10px",
        paddingBottom: props.tabs.length === 0 ? "10px" : 0,
      }}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{
              // display: { sm: 'none', xs: 'block' } 
            }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon fontSize="large" />
              </IconButton>

            </Grid>
            <Grid item xs />

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              PillarLMS
            </Typography>

            <Grid item>
              {/* // REAL TIME DISCONNECTED */}
              <Tooltip title="Who is on the page">
                <IconButton
                  color="inherit"
                  aria-label="who is on page"
                  edge="start"
                  style={{
                    borderRadius: "5px",
                  }}
                // disableRipple
                >
                  <WithAvatarGroup max={4} total={15} listOfIcons={listOfIcons} />
                </IconButton>
              </Tooltip>

              <NotificationButton />

              {/* // REAL TIME DISCONNECTED */}
              <Button
                color="secondary"
                variant="contained"
                aria-label="meeting panel"
                onClick={onMeetingDrawerToggle}
                edge="start"
                sx={{
                  my: 1,
                  color: "#fff"
                }}
              >
                <strong>
                  Meetings
                </strong>
              </Button>

            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {tabs?.tabs && tabs.tabs.length > 0 && (
        <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
          <div style={{ maxWidth: 936, margin: 'auto', width: "100%" }}>
            <Tabs value={tabs.selectedValue} textColor="inherit">
              {tabs.tabs.map(({ id, link, name }, index) => (

                // I left off here, I need to add value to select the tabs on the page

                <Link href={link} key={id || index}>
                  <Tab
                    index={0}
                    label={name}
                    value={id}
                  />
                </Link>
              ))}
            </Tabs>
          </div>
        </AppBar>
      )}
      {/* <WhoIsOnPageModal isOpen={isWhoIsOnPageModalOpened} userAvatarArray={userAvatarArray} onClose={() => setIsWhoIsOnPageModalOpened(false)} /> */}
      <Snackbar
        open={isSnackbarOpened}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <AlertToast onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </AlertToast>
      </Snackbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
