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


// import MeetingPanel from '../../../vc/layout/components/MeetingPanel';
// import './styles/layout.css'

const drawerWidth = 350;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PageBuilderLayout() {

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
            // sx={{
            //   width: drawerWidth,
            //   flexShrink: 0,
            //   '& .MuiDrawer-paper': {
            //     width: drawerWidth,
            //     boxSizing: 'border-box',
            //   },
            //   // background: theme.palette.grey[300]
            // }}

            //react react-spring
            sx={{

              width: drawerWidth,
              visibility: "visible",
              minHeight: "73px",
              // position: pageDesignerLayoutContext.leftDrawer.isOpened
              //   ? "relative"
              //   : "absolute",

              // display: {
              //   xs: 'block',
              //   sm: 'none'
              // },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, visibility: "visible" },
            }}
            variant="persistent"
            anchor="left"
            open={pageDesignerLayoutContext.leftDrawer.isOpened}
          >
            <DrawerHeader
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

            </div>
          </Drawer>
        </Box>

{/* Realtime removed */}
        {/* <MeetingPanel
          PaperProps={{ style: { width: drawerWidth } }}
          variant="temporary"
          open={adminLayoutContext.rightDrawer.isOpened}
          onClose={onMeetingDrawerToggle}
          anchor="right"
        // location={props.location}
        /> */}

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
          {/* <Main open={open} sx={{ p: 0 }}> */}

          <div
            ref={headerRef}
          >
            <Header
              isOpened={pageDesignerLayoutContext.leftDrawer.isOpened}
              onDrawerToggle={handleDrawerToggle}
              onMeetingDrawerToggle={onMeetingDrawerToggle}
              tabs={[]}
            />
          </div>
          <div style={{
            height: headerHeight ? `calc(100vh - ${headerHeight + 5}px)` : `0`,
            backgroundColor: theme.palette.grey[300],
            color: "black",

          }}>

            {pageDesignerLayoutContext.leftDrawer.main === "SITE" && (<SitePreview />)}
            {pageDesignerLayoutContext.leftDrawer.main === "METADATA" && (<MetaDataPreview />)}

          </div>
        </Box>
      </Box>
    </>
  );
}



// <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ mr: 2, ...(open && { display: 'none' }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Grid container spacing={1} alignItems="center">
//             {/* <Grid sx={{
//               // display: { sm: 'none', xs: 'block' } 
//             }} item>
//               <IconButton
//                 color="inherit"
//                 aria-label="open drawer"
//                 onClick={onDrawerToggle}
//                 edge="start"
//               >
//                 <MenuIcon fontSize="large" />
//               </IconButton>
//             </Grid>
//             <Grid item xs /> */}

//             <Grid item>
//               <Tooltip title="Who is on the page">
//                 <IconButton
//                   color="inherit"
//                   aria-label="who is on page"
//                   edge="start"
//                   style={{
//                     borderRadius: "5px",
//                   }}
//                 // disableRipple
//                 >
//                   <WithAvatarGroup max={4} total={15} listOfIcons={listOfIcons} />
//                 </IconButton>
//               </Tooltip>

//               <NotificationButton />
//               {/* <IconButton
//                 color="inherit"
//                 variant="contained"
//                 aria-label="open drawer"
//                 onClick={onDrawerToggle}
//                 edge="start"
//                 style={{
//                   marginRight: "20px",
//                 }}
//               >
//                 <NotificationsIcon fontSize="large" />
//               </IconButton> */}
//               <Button
//                 color="secondary"
//                 variant="contained"
//                 aria-label="meeting panel"
//                 onClick={onMeetingDrawerToggle}
//                 edge="start"
//                 sx={{
//                   my: 1,
//                   color: "#fff"
//                 }}
//               >
//                 {/* <Box sx={{ mx: 1 }}>
//                   <GroupsIcon fontSize="large" />
//                 </Box> */}

//                 {/* <Typography color="inherit" variant="h6" component="h6"> */}
//                 {/* Username Username */}
//                 {/* Company Name */}
//                 <strong>
//                   Meetings
//                 </strong>
//                 {/* </Typography> */}
//                 {/* <ChevronRightIcon /> */}
//               </Button>

//               {/* <Button variant="outlined" color="inherit">Start a Meeting</Button> */}
//             </Grid>
//           </Grid>
//         </Toolbar>
//       </AppBar>