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
import PageBuilderLeftSlidesHomeSidebar from './components/left-slides/home-slide';
import PageBuilderLeftSlidesPageSidebar from './components/left-slides/page-slide';
import PageBuilderLeftSlidesPanelSidebar from './components/left-slides/panel-slide';
import PageBuilderLeftSlidesPageDataSidebar from './components/left-slides/pagedata-slide';



import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
// import WithAvatarGroup from '../../components/realtime/whoIsOnPage/WithTotalAvatars.component';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import Header from '@/layouts/admin/layout/components/Header';
import PageDesignerLayoutContext from './pageDesignerLayout.context';
import SitePreview from './components/main-slides/site-preview';
import MetaDataPreview from './components/main-slides/meta-data-preview';
import WhoIsOnPageSockets from '../admin/sockets/WhoIsOnPageSockets';
import NotificationSockets from '../admin/sockets/NotificationsSockets';
import MeetingSockets from '../admin/sockets/MeetingSockets';
import MeetingPanel from '../admin/layout/components/MeetingPanel';


// import MeetingPanel from '../../../vc/layout/components/MeetingPanel';
// import './styles/layout.css'

const drawerWidth = 350;

export default function PageBuilderLayout({ children, ...props }) {

  const headerRef = React.useRef();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const adminLayoutContext = React.useContext(AdminLayoutContext)
  const pageDesignerLayoutContext = React.useContext(PageDesignerLayoutContext)
  const [headerHeight, setHeaderHeight] = React.useState()

  console.log("pageDesignerLayoutContext", pageDesignerLayoutContext)

  React.useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.clientHeight)

    console.log("headerRef", headerRef)
  }, [headerRef])

  const handleDrawerOpen = () => {
    pageDesignerLayoutContext.setLeftDrawer(prevState => ({
      ...prevState,
      isOpened: true,
    }))
  };

  const handleDrawerClose = () => {

    pageDesignerLayoutContext.setLeftDrawer(prevState => ({
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
    pageDesignerLayoutContext.setLeftDrawer(prevState => ({
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
            width: pageDesignerLayoutContext.leftDrawer.isOpened
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
            open={pageDesignerLayoutContext.leftDrawer.isOpened}
          >
            {children}
            {/* <DrawerHeader
              sx={{

                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" noWrap component="p" sx={{
                p: 2,
                // justifyContent: "space-between",
              }}>
                <div style={circleStatusDangerStyle}></div>
                Page Builder
              </Typography>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <div>
              {pageDesignerLayoutContext.leftDrawer.slide === "HOME" && (<PageBuilderLeftSlidesHomeSidebar></PageBuilderLeftSlidesHomeSidebar>)}
              {pageDesignerLayoutContext.leftDrawer.slide === "PAGE" && (<PageBuilderLeftSlidesPageSidebar></PageBuilderLeftSlidesPageSidebar>)}
              {pageDesignerLayoutContext.leftDrawer.slide === "PANEL" && (<PageBuilderLeftSlidesPanelSidebar></PageBuilderLeftSlidesPanelSidebar>)}
              {pageDesignerLayoutContext.leftDrawer.slide === "METADATA" && (<PageBuilderLeftSlidesPageDataSidebar></PageBuilderLeftSlidesPageDataSidebar>)}

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
            width: pageDesignerLayoutContext.leftDrawer.isOpened
              ? `calc(100vw - ${drawerWidth}px)`
              : `calc(100vw)`,
          }}
        >

          <div
            ref={headerRef}
          >
            {/* <WhoIsOnPageSockets>
              <NotificationSockets>
                <MeetingSockets> */}
            <Header
              isOpened={pageDesignerLayoutContext.leftDrawer.isOpened}
              onDrawerToggle={handleDrawerToggle}
              onMeetingDrawerToggle={onMeetingDrawerToggle}
              tabs={[]}
            />
            {/* </MeetingSockets>
              </NotificationSockets>
            </WhoIsOnPageSockets> */}
          </div>
          <div style={{
            height: headerHeight ? `calc(100vh - ${headerHeight + 5}px)` : `0`,
            backgroundColor: theme.palette.grey[300],
            color: "black",

          }}>

            {false && <SitePreview />}
            {/* {pageDesignerLayoutContext.leftDrawer.main === "SITE" && (<SitePreview />)} */}
            {/* {pageDesignerLayoutContext.leftDrawer.main === "METADATA" && (<MetaDataPreview />)} */}

          </div>
        </Box>
      </Box>
    </>
  );
}

