'use client'
import * as React from 'react';
// import { Link as GatsbyLink } from 'gatsby';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';



import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
// import WithAvatarGroup from '../realtime/whoIsOnPage/WithTotalAvatars.component';
// import Header from '../../../vc/layout/components/Header';
// import AdminLayoutContext from '../../../vc/layout/adminLayout.context';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import Header from '@/layouts/admin/layout/components/Header';
import WebsiteSettingLayoutContext from './WebsiteSettingLayout.context';
// import MeetingPanel from '../../../vc/layout/components/MeetingPanel';
import SitePreview from './components/main-slides/site-preview';
import MetaDataPreview from './components/main-slides/meta-data-preview';
import MeetingPanel from '../admin/layout/components/MeetingPanel';
import NotificationSockets from '../admin/sockets/NotificationsSockets';
import MeetingSockets from '../admin/sockets/MeetingSockets';
import WhoIsOnPageSockets from '../admin/sockets/WhoIsOnPageSockets';
// import './styles/layout.css'

const drawerWidth = 400;

export default function InsideWebsiteSettingLayout({ SideMenu, children, ...props }) {
  const headerRef = React.useRef();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const adminLayoutContext = React.useContext(AdminLayoutContext)
  const webSettingLayoutContext = React.useContext(WebsiteSettingLayoutContext)
  console.log('webSettingLayoutContext'.webSettingLayoutContext)
  const [headerHeight, setHeaderHeight] = React.useState()

  React.useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.clientHeight)

    console.log("headerRef", headerRef)
  }, [headerRef])

  const handleDrawerOpen = () => {
    webSettingLayoutContext.setLeftDrawer(prevState => ({
      ...prevState,
      isOpened: true,
    }))
  };

  const handleDrawerClose = () => {

    webSettingLayoutContext.setLeftDrawer(prevState => ({
      ...prevState,
      isOpened: false,
    }))
  };


  const circleStatus = {
    borderRadius: "50px",
    height: "15px",
    width: "15px",
    display: "inline-block",
    marginRight: "5px"
  }

  const circleStatusDangerStyle = {
    ...circleStatus,
    backgroundColor: theme.palette.error.dark,
  }

  const circleStatusSuccessStyle = {
    ...circleStatus,
    backgroundColor: theme.palette.success.dark,
  }


  const handleDrawerToggle = () => {
    // setMobileOpen(!mobileOpen);
    webSettingLayoutContext.setLeftDrawer(prevState => ({
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

      <Box sx={{ display: 'flex', p: 0 }}>
        <CssBaseline />

        <Box
          component="nav"
          sx={{
            width: webSettingLayoutContext.leftDrawer.isOpened
              ? `${drawerWidth}`
              : `0`,
            flexShrink: { sm: 0 },
          }}
          aria-label="Page builder menu"
        >
          <Drawer

            sx={{

              width: drawerWidth,
              visibility: "visible",
              minHeight: "73px",
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, visibility: "visible" },
            }}
            variant="persistent"
            anchor="left"
            open={webSettingLayoutContext.leftDrawer.isOpened}
          >
            {SideMenu}
            {/* <DrawerHeader
              sx={{

                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" noWrap component="p" sx={{
                p: 2,
                // justifyContent: "space-between",
              }}>
                Website Settings
              </Typography>
              <IconButton>
                <div style={{
                  ...circleStatusDangerStyle,
                  marginRight: "15px"
                }}></div>
              </IconButton>
            </DrawerHeader>
            <Divider />
            <div>
              {webSettingLayoutContext.leftDrawer.slide === "HOME" && (<PageBuilderLeftSlidesHomeSidebar></PageBuilderLeftSlidesHomeSidebar>)}
              {webSettingLayoutContext.leftDrawer.slide === "PAGE" && (<PageBuilderLeftSlidesPageSidebar></PageBuilderLeftSlidesPageSidebar>)}
              {webSettingLayoutContext.leftDrawer.slide === "PANEL" && (<PageBuilderLeftSlidesPanelSidebar></PageBuilderLeftSlidesPanelSidebar>)}
              {webSettingLayoutContext.leftDrawer.slide === "METADATA" && (<PageBuilderLeftSlidesPageDataSidebar></PageBuilderLeftSlidesPageDataSidebar>)}

            </div> */}
          </Drawer>
        </Box>

        <Box component="nav">
          <MeetingPanel
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={adminLayoutContext.rightDrawer.isOpened}
            onClose={onMeetingDrawerToggle}
            anchor="right"
          />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 0,
            width: webSettingLayoutContext.leftDrawer.isOpened
              ? `calc(100vw - ${drawerWidth}px)`
              : `calc(100vw)`,
          }}
        >
          {/* <Main open={open} sx={{ p: 0 }}> */}

          <div
            ref={headerRef}
          >

            {/* <WhoIsOnPageSockets>
              <NotificationSockets>
                <MeetingSockets> */}
            <Header
              isOpened={webSettingLayoutContext.leftDrawer.isOpened}
              onDrawerToggle={handleDrawerToggle}
              onMeetingDrawerToggle={onMeetingDrawerToggle}
              tabs={[]}
            />
            {/* </MeetingSockets>
              </NotificationSockets>
            </WhoIsOnPageSockets> */}
          </div>
          <main style={{
            height: headerHeight ? `calc(100vh - ${headerHeight + 5}px)` : `0`,
            backgroundColor: theme.palette.grey[300],
            color: "black",
            overflow: "auto"

          }}>

            {children}
          </main>
        </Box>

      </Box>
    </>
  );
}

