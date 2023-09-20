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

  const [panelHomeDoc, setPanelHomeDoc] = React.useState({
    // doc
    allMeetingsList: [],
    listOfMeetingsOnThisPage: [],
    //being handled by notifications: // listOfMeetingInvites: [],

    //modal
    modal_isNewMeetingOpened: false,
  })

  const [panelMeetingDoc, setPanelMeetingDoc] = React.useState({
    // doc
    meetingId: null,
    meetingName: null,
    meetingLeaderId: null,
    meetingLeaderUsername: null,
    meetingLeaderPicture: null,
    meetingLeaderEmail: null,

    // user list:
    meetingUserList: [],
    offlineUserList: [],
    onlineUserListNotInMeeting: [],

    // modals
    modal_isEndMeetingModalOpened: false,
    modal_isChangeLeaderModalOpened: false,
    modal_isRequestPageModalOpened: false,
    modal_isInviteUsersModalOpened: false,
    modal_isSearchOnlineUsersModalOpened: false,

  })

  const [whoIsOnPage, setWhoIsOnPage] = React.useState({
    //doc
    isHidden: false,
    list: [],

    //modals
    modal_isEveryoneOnPageModalOpened: false,
  })

  const [notifications, setNotifications] = React.useState({
    // isBadgeHidden: zero or null value makes hidden
    badgeCount: "New", // badgeCount: null,
    isPopDownOpen: false,
    notificationList: [],


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
    })

  }, [])


  return (
    <SnackbarProvider>
      <AdminLayoutContext.Provider value={{
        leftDrawer, setLeftDrawer,
        rightDrawer, setRightDrawer,
        meetingPanel, setMeetingPanel,
        panelHomeDoc, setPanelHomeDoc,
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