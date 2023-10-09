// Libraries
import * as React from 'react';

// Mine
import Navigator from './components/Navigator.jsx';
import Header from './components/Header';
import MeetingPanel from './components/MeetingPanel';
import AdminLayoutContext from './adminLayout.context';

// MUI
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import WhoIsOnPageSockets from '../sockets/WhoIsOnPageSockets.jsx';
import NotificationSockets from '../sockets/NotificationsSockets.jsx';
import MeetingSockets from '../sockets/MeetingSockets.jsx';

const drawerWidth = 350;

export default function AdminLayoutPage(props) {
  const adminLayoutContext = React.useContext(AdminLayoutContext)

  const handleDrawerToggle = () => {
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

  return (
    <>
      {/* <NotificationSockets>
        <MeetingSockets>
          <WhoIsOnPageSockets> */}
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box component="nav">
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={adminLayoutContext.leftDrawer.isOpened}
            onClose={handleDrawerToggle}
          />
          <MeetingPanel
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={adminLayoutContext.rightDrawer.isOpened}
            onClose={onMeetingDrawerToggle}
            anchor="right"
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header
            onDrawerToggle={handleDrawerToggle}
            onMeetingDrawerToggle={onMeetingDrawerToggle}
            tabs={props?.pageContext?.tabs || props?.tabs || []}
            title={props?.pageContext?.title || props?.title || ""}
          // pageContext={props.pageContext}
          />
          <Box component="main" sx={{ flex: 1, py: 3, px: 2, bgcolor: '#eaeff1', }}>
            {props.children}
          </Box>
        </Box>
      </Box>
      {/* </WhoIsOnPageSockets>
        </MeetingSockets>
      </NotificationSockets> */}
    </>
  );
}
