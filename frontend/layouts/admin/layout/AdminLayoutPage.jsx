// Libraries
import * as React from 'react';
import { useRouter } from 'next/router';
// import { navigate } from 'gatsby-link';
import { enqueueSnackbar } from 'notistack';

// Mine
// import { getSavedUser, user } from '../../components/admin/utils/user';
import Navigator from './components/Navigator.jsx';
import Header from './components/Header';
// import NewMeetingModal from './components/MeetingPanel/modals/NewMeeting.modal.js'

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
import { getTopNotificationsGraphQL } from '../store/top-notifications.js';
import NewMeetingModal from './components/MeetingPanel/modals/NewMeeting.modal.js';
import { getMeetingById } from '../store/meeting-getById.store.js';
import { getUsersNotInMeetingGraphQL } from '../store/meeting-getUsersNotInMeeting.store.js';
import { getMeetingUsers } from '../store/meeting-getMeetingUsers.store.js';
import HangUpModal from './components/MeetingPanel/modals/HangUp.modal.js';
import EndMeetingModal from './components/MeetingPanel/modals/EndMeeting.modal.js';
import MeetingChangeNameModal from './components/MeetingPanel/modals/ChangeName.modal.js';
import MeetingChangeLeaderModal from './components/MeetingPanel/modals/ChangeLeader.modal.js';
import MeetingKickUserModal from './components/MeetingPanel/modals/KickUser.modal.js';
import NoMeetingModal from './components/MeetingPanel/modals/MeetingDoesn\'tExist.modal.js';
import RecievedUrlRequestModal from './components/MeetingPanel/modals/RecieveUrlRequest.modal.js';
import SendUrlRequestModal from './components/MeetingPanel/modals/SendUrlRequest.modal.js';

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
  const [lastRoute, setLastRoute] = React.useState({
    pathname: undefined,
    asPath: undefined
  })
  // const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  // const { socket } = React.useContext(SocketContext)

  // console.log('socket')


  const refreshWhoIsOnPage = async ({ url }) => {
    const usersOnPage = await getSamePageGraphQL({ url, })

    adminLayoutContext.setWhoIsOnPage(prevState => ({
      ...prevState,
      list: usersOnPage.data.collaborateSamePage_getAllUsersFromPage.users,
      total: usersOnPage.data.collaborateSamePage_getAllUsersFromPage.total,

    }))
  }

  React.useEffect(() => {

    const socket = initSocket()

    // delay for socket to fully connect.
    // setTimeout(() => {
    socket.emit('change-url', {
      currentAsPath: router.asPath,
      currentPathname: router.pathname,
      oldAsPath: lastRoute?.asPath,
      oldPathname: lastRoute?.pathname,
    });

    setLastRoute({
      pathname: router.pathname,
      asPath: router.asPath,
    })

    // }, 500)

    // user left page
    socket.on('user-left-page', async (data) => {
      await refreshWhoIsOnPage({ url: router.pathname })
      enqueueSnackbar(data.message)
    })

    // toast
    // refreshWhoIsOnPage

    //user enter page
    socket.on('user-enter-page', async (data) => {
      await refreshWhoIsOnPage({ url: router.pathname })
      enqueueSnackbar(data.message)
    })

    refreshWhoIsOnPage({ url: router.pathname })

    return () => {
      socket.off('user-enter-page')
      socket.off('user-left-page')
    }

  }, [router.pathname]);

  React.useEffect(() => {
    // router updated instead of adminLayoutContext
    if (router.pathname !== lastRoute.pathname) {
      //if there is a meeting and you are the leader, emit url change to everyone else.
      if (adminLayoutContext.panelMeetingDoc.id && adminLayoutContext.idChip.id === adminLayoutContext.panelMeetingDoc.leader?.id) {
        const socket = initSocket()

        socket.emit("server-meeting-url-change", {
          meetingId: adminLayoutContext.panelMeetingDoc.id,
          url: router.pathname,
        })
      }
    }

  }, [router.pathname, adminLayoutContext])

  React.useEffect(() => {

    const socket = initSocket()

    socket.on('new-notification', async () => {
      const newNoti = await getTopNotificationsGraphQL();
      const listOfNewNotification = newNoti.data.backendNotification_getFirstByCount

      adminLayoutContext.setNotifications(prevState => ({
        ...prevState,
        badgeCount: adminLayoutContext.notifications.badgeCount + 1,
        list: listOfNewNotification,
      }))

    })

    socket.on('meeting-start', (data) => {
      getMeetingById({ id: data.id }).then(result => {
        const meeting = result.data.collaborateMeeting_getMeetingById

        adminLayoutContext.setPanelMeetingDoc(prevState => ({
          ...prevState,
          id: meeting.id,
          name: meeting.name,
          leader: meeting.leader,
          users: meeting.users || [],

        }))

        adminLayoutContext.setMeetingPanel(prevState => ({
          ...prevState,
          slide: "MEETING"
        }))
      })
    })

    socket.on('meeting-user-join', data => {
      enqueueSnackbar(data.message)

      getUsersNotInMeetingGraphQL({ id: adminLayoutContext.panelMeetingDoc.id }).then(result => {
        const onlineUserListNotInMeeting = result.data.collaborateMeeting_getOnlineUsersNotInMeeting

        adminLayoutContext.setPanelMeetingDoc(prevState => ({
          ...prevState,
          onlineUserListNotInMeeting,
        }))

      })

      getMeetingUsers({ id: adminLayoutContext.panelMeetingDoc.id }).then(result => {
        const users = result.data.collaborateMeeting_getUsersForMeeting

        adminLayoutContext.setPanelMeetingDoc(prevState => ({
          ...prevState,
          users,
        }))

      })
    })

    socket.on('meeting-hang-up', data => {
      adminLayoutContext.setMeetingPanel(prevState => ({
        ...prevState,
        slide: "HOME"
      }))

      adminLayoutContext.setPanelMeetingDoc(prevState => ({
        ...prevState,
        id: null,
        name: null,
        leader: null,
        users: [],
        onlineUserListNotInMeeting: []
      }))
    })

    socket.on('meeting-user-left', data => {
      enqueueSnackbar(data.message)

      getUsersNotInMeetingGraphQL({ id: adminLayoutContext.panelMeetingDoc.id }).then(result => {
        const onlineUserListNotInMeeting = result.data.collaborateMeeting_getOnlineUsersNotInMeeting

        adminLayoutContext.setPanelMeetingDoc(prevState => ({
          ...prevState,
          onlineUserListNotInMeeting,
        }))

      })

      getMeetingUsers({ id: adminLayoutContext.panelMeetingDoc.id }).then(result => {
        const users = result.data.collaborateMeeting_getUsersForMeeting

        adminLayoutContext.setPanelMeetingDoc(prevState => ({
          ...prevState,
          users,
        }))

      })
    })

    socket.on('meeting-end', data => {
      enqueueSnackbar('Meeting has ended.')
      adminLayoutContext.setMeetingPanel(prevState => ({
        ...prevState,
        slide: "HOME"
      }))

      adminLayoutContext.setPanelMeetingDoc(prevState => ({
        ...prevState,
        id: null,
        name: null,
        leader: null,
        users: [],
        onlineUserListNotInMeeting: []
      }))
    })

    socket.on('meeting-change-name', data => {
      enqueueSnackbar(`Meeting changed name to '${data.name}'.`)

      adminLayoutContext.setPanelMeetingDoc(prevState => ({
        ...prevState,
        name: data.name,
      }))
    })

    socket.on('meeting-change-leader', data => {
      enqueueSnackbar(data.message)
      getMeetingById({ id: adminLayoutContext.panelMeetingDoc.id }).then(result => {
        const meeting = result.data.collaborateMeeting_getMeetingById

        adminLayoutContext.setPanelMeetingDoc(prevState => ({
          ...prevState,
          leader: meeting.leader,
        }))
      })
    })

    socket.on('meeting-info', data => {
      enqueueSnackbar(data.message)

      getUsersNotInMeetingGraphQL({ id: adminLayoutContext.panelMeetingDoc.id }).then(result => {
        const onlineUserListNotInMeeting = result.data.collaborateMeeting_getOnlineUsersNotInMeeting

        adminLayoutContext.setPanelMeetingDoc(prevState => ({
          ...prevState,
          onlineUserListNotInMeeting,
        }))
      })

      getMeetingUsers({ id: adminLayoutContext.panelMeetingDoc.id }).then(result => {
        const users = result.data.collaborateMeeting_getUsersForMeeting

        adminLayoutContext.setPanelMeetingDoc(prevState => ({
          ...prevState,
          users,
        }))
      })
    })

    socket.on('meeting-kick', data => {
      enqueueSnackbar('You have been kicked from the meeting.')

      adminLayoutContext.setMeetingPanel(prevState => ({
        ...prevState,
        slide: "HOME"
      }))

      adminLayoutContext.setPanelMeetingDoc(prevState => ({
        ...prevState,
        id: null,
        name: null,
        leader: null,
        users: [],
        onlineUserListNotInMeeting: []
      }))
    })

    socket.on('meeting-change-url', data => {
      router.push(data.url)
    })

    socket.on('meeting-request-url', data => {
      adminLayoutContext.setPanelMeetingDoc(prevState => ({
        ...prevState,
        modal_isRecieveUrlRequestModalOpened: true,
        recievedUrlRequestUserId: data.userId,
        requestedUrl: data.url,
      }))
    })

    return () => {
      socket.off('new-notification')
      socket.off('meeting-start')
      socket.off('meeting-user-join')
      socket.off('meeting-hang-up')
      socket.off('meeting-user-left')
      socket.off('meeting-end')
      socket.off('meeting-change-name')
      socket.off('meeting-change-leader')
      socket.off('meeting-info')
      socket.off('meeting-kick')
      socket.off('meeting-doesnt-exist')
      socket.off('meeting-request-url')
    }

  }, [adminLayoutContext.panelMeetingDoc]);
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
      <NewMeetingModal
        isOpened={adminLayoutContext.panelMeetingDoc.modal_isNewMeetingModalOpened}
        onClose={() => {
          adminLayoutContext.setPanelMeetingDoc(prevState => ({
            ...prevState,
            modal_isNewMeetingModalOpened: false,
          }))
        }}
      />
      <HangUpModal
        isOpened={adminLayoutContext.panelMeetingDoc.modal_isHangUpMeetingModalOpened}
        onClose={() => {
          adminLayoutContext.setPanelMeetingDoc(prevState => ({
            ...prevState,
            modal_isHangUpMeetingModalOpened: false,
          }))
        }}
      />
      <EndMeetingModal
        isOpened={adminLayoutContext.panelMeetingDoc.modal_isEndMeetingModalOpened}
        onClose={() => {
          adminLayoutContext.setPanelMeetingDoc(prevState => ({
            ...prevState,
            modal_isEndMeetingModalOpened: false,
          }))
        }}

      />
      <MeetingChangeNameModal
        isOpened={adminLayoutContext.panelMeetingDoc.modal_isChangeNameModalOpened}
        onClose={() => {
          adminLayoutContext.setPanelMeetingDoc(prevState => ({
            ...prevState,
            modal_isChangeNameModalOpened: false,
          }))
        }}

      />
      <MeetingChangeLeaderModal
        isOpened={adminLayoutContext.panelMeetingDoc.modal_isChangeLeaderModalOpened}
        onClose={() => {
          adminLayoutContext.setPanelMeetingDoc(prevState => ({
            ...prevState,
            modal_isChangeLeaderModalOpened: false,
          }))
        }}
      />

      <MeetingKickUserModal
        isOpened={adminLayoutContext.panelMeetingDoc.modal_isKickUserModalOpened}
        onClose={() => {
          adminLayoutContext.setPanelMeetingDoc(prevState => ({
            ...prevState,
            modal_isKickUserModalOpened: false,
          }))
        }}
      />

      <NoMeetingModal
        isOpened={adminLayoutContext.panelMeetingDoc.modal_isNoMeetingModalOpened}
        onClose={() => {
          adminLayoutContext.setPanelMeetingDoc(prevState => ({
            ...prevState,
            modal_isNoMeetingModalOpened: false,
          }))
        }}

      />

      <SendUrlRequestModal
        isOpened={adminLayoutContext.panelMeetingDoc.modal_isSendUrlRequestModalOpened}
        onClose={() => {
          adminLayoutContext.setPanelMeetingDoc(prevState => ({
            ...prevState,
            modal_isSendUrlRequestModalOpened: false,
          }))
        }}

      />


      <RecievedUrlRequestModal
        isOpened={adminLayoutContext.panelMeetingDoc.modal_isRecieveUrlRequestModalOpened}
        onClose={() => {
          adminLayoutContext.setPanelMeetingDoc(prevState => ({
            ...prevState,
            modal_isRecieveUrlRequestModalOpened: false,
          }))
        }}

      />

    </>


  );
}
