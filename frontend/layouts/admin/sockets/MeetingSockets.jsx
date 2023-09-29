// libraries
import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack'

// mine
import NewMeetingModal from '../layout/components/MeetingPanel/modals/NewMeeting.modal'
import HangUpModal from '../layout/components/MeetingPanel/modals/HangUp.modal'
import EndMeetingModal from '../layout/components/MeetingPanel/modals/EndMeeting.modal'
import MeetingChangeNameModal from '../layout/components/MeetingPanel/modals/ChangeName.modal'
import MeetingChangeLeaderModal from '../layout/components/MeetingPanel/modals/ChangeLeader.modal'
import MeetingKickUserModal from '../layout/components/MeetingPanel/modals/KickUser.modal'
import NoMeetingModal from '../layout/components/MeetingPanel/modals/MeetingDoesntExist.modal'
import SendUrlRequestModal from '../layout/components/MeetingPanel/modals/SendUrlRequest.modal'
import RecievedUrlRequestModal from '../layout/components/MeetingPanel/modals/RecieveUrlRequest.modal'
import AdminLayoutContext from '../layout/adminLayout.context'
import { getMeetingById } from '../store/meeting-getById.store'
import { getUsersNotInMeetingGraphQL } from '../store/meeting-getUsersNotInMeeting.store'
import { getMeetingUsers } from '../store/meeting-getMeetingUsers.store'
import { initSocket } from '@/utils/realtime/socket';

function MeetingSockets({ children }) {
  const router = useRouter();
  const { setPanelMeetingDoc, panelMeetingDoc, setMeetingPanel } = useContext(AdminLayoutContext)

  useEffect(() => {
    const socket = initSocket()

    socket.on('new-notification', async () => {
      const newNoti = await getTopNotificationsGraphQL();
      const listOfNewNotification = newNoti.data.backendNotification_getFirstByCount

      setNotifications(prevState => ({
        ...prevState,
        badgeCount: notifications.badgeCount + 1,
        list: listOfNewNotification,
      }))

    })

    socket.on('meeting-start', (data) => {
      getMeetingById({ id: data.id }).then(result => {
        const meeting = result.data.collaborateMeeting_getMeetingById

        setPanelMeetingDoc(prevState => ({
          ...prevState,
          id: meeting.id,
          name: meeting.name,
          leader: meeting.leader,
          users: meeting.users || [],

        }))

        setMeetingPanel(prevState => ({
          ...prevState,
          slide: "MEETING"
        }))
      })
    })

    socket.on('meeting-user-join', data => {
      enqueueSnackbar(data.message)

      getUsersNotInMeetingGraphQL({ id: panelMeetingDoc.id }).then(result => {
        const onlineUserListNotInMeeting = result.data.collaborateMeeting_getOnlineUsersNotInMeeting

        setPanelMeetingDoc(prevState => ({
          ...prevState,
          onlineUserListNotInMeeting,
        }))

      })

      getMeetingUsers({ id: panelMeetingDoc.id }).then(result => {
        const users = result.data.collaborateMeeting_getUsersForMeeting

        setPanelMeetingDoc(prevState => ({
          ...prevState,
          users,
        }))

      })
    })

    socket.on('meeting-hang-up', data => {
      setMeetingPanel(prevState => ({
        ...prevState,
        slide: "HOME"
      }))

      setPanelMeetingDoc(prevState => ({
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

      getUsersNotInMeetingGraphQL({ id: panelMeetingDoc.id }).then(result => {
        const onlineUserListNotInMeeting = result.data.collaborateMeeting_getOnlineUsersNotInMeeting

        setPanelMeetingDoc(prevState => ({
          ...prevState,
          onlineUserListNotInMeeting,
        }))

      })

      getMeetingUsers({ id: panelMeetingDoc.id }).then(result => {
        const users = result.data.collaborateMeeting_getUsersForMeeting

        setPanelMeetingDoc(prevState => ({
          ...prevState,
          users,
        }))

      })
    })

    socket.on('meeting-end', data => {
      enqueueSnackbar('Meeting has ended.')
      setMeetingPanel(prevState => ({
        ...prevState,
        slide: "HOME"
      }))

      setPanelMeetingDoc(prevState => ({
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

      setPanelMeetingDoc(prevState => ({
        ...prevState,
        name: data.name,
      }))
    })

    socket.on('meeting-change-leader', data => {
      enqueueSnackbar(data.message)
      getMeetingById({ id: panelMeetingDoc.id }).then(result => {
        const meeting = result.data.collaborateMeeting_getMeetingById

        setPanelMeetingDoc(prevState => ({
          ...prevState,
          leader: meeting.leader,
        }))
      })
    })

    socket.on('meeting-info', data => {
      enqueueSnackbar(data.message)

      getUsersNotInMeetingGraphQL({ id: panelMeetingDoc.id }).then(result => {
        const onlineUserListNotInMeeting = result.data.collaborateMeeting_getOnlineUsersNotInMeeting

        setPanelMeetingDoc(prevState => ({
          ...prevState,
          onlineUserListNotInMeeting,
        }))
      })

      getMeetingUsers({ id: panelMeetingDoc.id }).then(result => {
        const users = result.data.collaborateMeeting_getUsersForMeeting

        setPanelMeetingDoc(prevState => ({
          ...prevState,
          users,
        }))
      })
    })

    socket.on('meeting-kick', data => {
      enqueueSnackbar('You have been kicked from the meeting.')

      setMeetingPanel(prevState => ({
        ...prevState,
        slide: "HOME"
      }))

      setPanelMeetingDoc(prevState => ({
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
      setPanelMeetingDoc(prevState => ({
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
      socket.off('meeting-change-url')
      socket.off('meeting-request-url')
    }

  }, [panelMeetingDoc]);


  return (
    <div>
      {children}
      <NewMeetingModal
        isOpened={panelMeetingDoc.modal_isNewMeetingModalOpened}
        onClose={() => {
          setPanelMeetingDoc(prevState => ({
            ...prevState,
            modal_isNewMeetingModalOpened: false,
          }))
        }}
      />
      <HangUpModal
        isOpened={panelMeetingDoc.modal_isHangUpMeetingModalOpened}
        onClose={() => {
          setPanelMeetingDoc(prevState => ({
            ...prevState,
            modal_isHangUpMeetingModalOpened: false,
          }))
        }}
      />
      <EndMeetingModal
        isOpened={panelMeetingDoc.modal_isEndMeetingModalOpened}
        onClose={() => {
          setPanelMeetingDoc(prevState => ({
            ...prevState,
            modal_isEndMeetingModalOpened: false,
          }))
        }}

      />
      <MeetingChangeNameModal
        isOpened={panelMeetingDoc.modal_isChangeNameModalOpened}
        onClose={() => {
          setPanelMeetingDoc(prevState => ({
            ...prevState,
            modal_isChangeNameModalOpened: false,
          }))
        }}

      />
      <MeetingChangeLeaderModal
        isOpened={panelMeetingDoc.modal_isChangeLeaderModalOpened}
        onClose={() => {
          setPanelMeetingDoc(prevState => ({
            ...prevState,
            modal_isChangeLeaderModalOpened: false,
          }))
        }}
      />

      <MeetingKickUserModal
        isOpened={panelMeetingDoc.modal_isKickUserModalOpened}
        onClose={() => {
          setPanelMeetingDoc(prevState => ({
            ...prevState,
            modal_isKickUserModalOpened: false,
          }))
        }}
      />

      <NoMeetingModal
        isOpened={panelMeetingDoc.modal_isNoMeetingModalOpened}
        onClose={() => {
          setPanelMeetingDoc(prevState => ({
            ...prevState,
            modal_isNoMeetingModalOpened: false,
          }))
        }}

      />

      <SendUrlRequestModal
        isOpened={panelMeetingDoc.modal_isSendUrlRequestModalOpened}
        onClose={() => {
          setPanelMeetingDoc(prevState => ({
            ...prevState,
            modal_isSendUrlRequestModalOpened: false,
          }))
        }}

      />


      <RecievedUrlRequestModal
        isOpened={panelMeetingDoc.modal_isRecieveUrlRequestModalOpened}
        onClose={() => {
          setPanelMeetingDoc(prevState => ({
            ...prevState,
            modal_isRecieveUrlRequestModalOpened: false,
          }))
        }}

      />


    </div>
  )
}

export default MeetingSockets