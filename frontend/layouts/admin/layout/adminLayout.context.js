// Libraries
import React, { useEffect } from 'react'
import { SettingTabsProvider } from '@/pages-scripts/portal/admin/settings/setting-tabs.context';
import { getAdminLayoutInitGraphQL } from '../store/init.store';
import { SnackbarProvider } from 'notistack';

export const AdminLayoutContext = React.createContext();

export function AdminLayoutProvider({ children }) {

  const [leftDrawer, setLeftDrawer] = React.useState({
    isOpened: false,
    anchor: false,
  })

  const [rightDrawer, setRightDrawer] = React.useState({
    isOpened: false,
    anchor: false,
    isInMeeting: false,
    isMeetingOnPage: false,
  })

  const [meetingPanel, setMeetingPanel] = React.useState({
    slide: 'HOME', // HOME || MEETING
  })

  const [panelMeetingDoc, setPanelMeetingDoc] = React.useState({
    // doc
    id: null,
    name: null,
    leader: null,
    users: [],
    onlineUserListNotInMeeting: [],

    //use for selecting user in drop down
    selectedUserId: null,

    // to show the leader who is requesting url change
    recievedUrlRequestUserId: null,
    requestedUrl: null,

    // for non leader url request hold
    sendRequestedUrl: null,

    // modals
    modal_isNoMeetingModalOpened: false,
    modal_isNewMeetingModalOpened: false,
    modal_isEndMeetingModalOpened: false,
    modal_isHangUpMeetingModalOpened: false,
    modal_isChangeLeaderModalOpened: false,
    modal_isKickUserModalOpened: false,
    modal_isChangeNameModalOpened: false,
    modal_isRequestPageModalOpened: false,
    modal_isRecieveUrlRequestModalOpened: false,
    modal_isSendUrlRequestModalOpened: false,

  })

  const [whoIsOnPage, setWhoIsOnPage] = React.useState({
    //doc
    isHidden: false,
    list: [],
    total: 0,

    //modals
    modal_isEveryoneOnPageModalOpened: false,
  })

  const [notifications, setNotifications] = React.useState({
    // isBadgeHidden: zero or null value makes hidden
    badgeCount: 0, // badgeCount: null,
    isPopDownOpen: false,
    list: [],


  })

  const [tabs, setTabs] = React.useState({
    tabs: null,
    selectedValue: null,
  })

  const [idChip, setIdChip] = React.useState({
    callByType: null,
    circleColor: null,
    email: null,
    firstName: null,
    id: null,
    labelColor: null,
    lastName: null,
    picture: null,
    username: null,
  })

  useEffect(() => {
    getAdminLayoutInitGraphQL().then(initAdminStore => {
      const id = initAdminStore.data.backendUserBasicView_me;
      const notificationCount = initAdminStore.data.backendNotification_getUnseenNotificationCount
      const listOfNewNotification = initAdminStore.data.backendNotification_getFirstByCount
      console.log("initAdminStore", initAdminStore, id)

      setIdChip(prevState => ({
        ...prevState,
        callByType: id.callByType,
        circleColor: id.circleColor,
        email: id.email,
        firstName: id.firstName,
        id: id.id,
        labelColor: id.labelColor,
        lastName: id.lastName,
        picture: id.picture,
        username: id.username,
      }))

      setNotifications(prevState => ({
        ...prevState,
        badgeCount: notificationCount,
        list: listOfNewNotification,
      }))
    })

  }, [])


  return (
    <SnackbarProvider>
      <AdminLayoutContext.Provider value={{
        leftDrawer, setLeftDrawer,
        rightDrawer, setRightDrawer,
        meetingPanel, setMeetingPanel,
        panelMeetingDoc, setPanelMeetingDoc,
        whoIsOnPage, setWhoIsOnPage,
        notifications, setNotifications,
        tabs, setTabs,
        idChip, setIdChip,
      }}>
        <SettingTabsProvider>
          {children}
        </SettingTabsProvider>
      </AdminLayoutContext.Provider>
    </SnackbarProvider>
  )
}

export default AdminLayoutContext