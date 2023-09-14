// Libraries
import * as React from 'react';
import { useRouter } from 'next/router';
// import { navigate } from 'gatsby-link';

// Mine
// import { getSavedUser, user } from '../../components/admin/utils/user';
import Navigator from './components/Navigator.jsx';
import Header from './components/Header';
// import { documentSaved } from './layout.store'
// import { SocketContext } from "../../global/Socket"
// import pageNavigate from '../../components/realtime/link/pageNavigate.func';
// import { SiteDesignerProvider } from '../../pagesMirror/admin/site-designer/site-designer.context';
// import PageCopyright from "../../components/admin/panels/PageCopyright/PageCopyright.component"

// MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
// import { ___theme } from './layout';
import MeetingPanel from './components/MeetingPanel';
import AdminLayoutContext from './adminLayout.context';
import { initSocket } from '@/utils/realtime/socket.js';
import { getSamePageGraphQL } from '../store/samepage.store.js';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const drawerWidth = 350;

export default function AdminLayoutPage(props) {
  const router = useRouter();
  const adminLayoutContext = React.useContext(AdminLayoutContext)
  
  // console.log('adminLayoutContext', adminLayoutContext)
  // const theme = ___theme;
  // const router = useRouter()
  // console.log('check', props)
  // const saveAlertMessage = "Document Saved"
  const [isSavedAlertOpened, setIsSavedAlertOpened] = React.useState(false)
  // const [savedMessage, setSavedMessage] = React.useState(saveAlertMessage)
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  // const { socket } = React.useContext(SocketContext)

  // console.log('socket')

  let lastRoute;

  React.useEffect(() => {
    
    const url = router.pathname

    const socket = initSocket()
    socket.emit('addUserToUrl', {
      url,
    });

    if (lastRoute) {
      socket.emit('removeUserFromUrl', {
        url,
      });
    }
    lastRoute = router

    socket.on('samepage', async () => {
      const usersOnPage = await getSamePageGraphQL({url,})
      console.log('usersOnPage', usersOnPage);
      adminLayoutContext.setWhoIsOnPage(prevState => ({
        ...prevState,
        list: usersOnPage.data.collaborateSamePage_getAllUsersFromPage.users
      }))
      // collaborateSamePage_getAllUsersFromPage
    })

    return () => {
      socket.off('samepage')
    }

  }, [router.asPath]);

  const handleDrawerToggle = () => {
    // setMobileOpen(!mobileOpen);
    adminLayoutContext.setLeftDrawer(prevState => ({
      ...prevState,
      isOpened: !prevState.isOpened,
    }))
  };

  const onMeetingDrawerToggle = () => {
    adminLayoutContext.setRightDrawer(prevState => ({
      ...prevState,
      isOpened: !prevState.isOpened,
    }))
  }

  const handleSavedClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSavedAlertOpened(false)
  };

  return (
    <>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box
          component="nav"
        // sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {/* {isSmUp ? null : ( */}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={adminLayoutContext.leftDrawer.isOpened}
            onClose={handleDrawerToggle}
          // location={props.location}
          />
          
              {/* // REAL TIME DISCONNECTED */}
          <MeetingPanel
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={adminLayoutContext.rightDrawer.isOpened}
            onClose={onMeetingDrawerToggle}
            anchor="right"
          // location={props.location}
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header onDrawerToggle={handleDrawerToggle} onMeetingDrawerToggle={onMeetingDrawerToggle} tabs={props?.pageContext?.tabs || props?.tabs || []} title={props?.pageContext?.title || props?.title || ""} location={props.location} pageContext={props.pageContext} />
          <Box component="main" sx={{ flex: 1, py: 3, px: 2, bgcolor: '#eaeff1', }}>
{/* 
            <Box sx={{
              flexGrow: 1,
              width: "100%",
              maxWidth: "900px",
              m: "auto"
            }}> */}
              {props.children}
            {/* </Box> */}
          </Box>
        </Box>
      </Box>
      {/* Possible repeat from header.js file */}
      <Snackbar
        open={isSavedAlertOpened}
        autoHideDuration={6000}
        onClose={handleSavedClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSavedClose} severity="success" sx={{ width: '100%' }}>
          testing
        </Alert>
      </Snackbar>
    </>


  );
}
