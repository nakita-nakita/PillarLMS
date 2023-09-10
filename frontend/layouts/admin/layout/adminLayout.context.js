// Libraries
import React from 'react'
import { SettingTabsProvider } from '@/pages-scripts/portal/admin/settings/setting-tabs.context';

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


  return (
    <AdminLayoutContext.Provider value={{
      leftDrawer, setLeftDrawer,
      rightDrawer, setRightDrawer,
      meetingPanel, setMeetingPanel,
      panelHomeDoc, setPanelHomeDoc,
      panelMeetingDoc, setPanelMeetingDoc,
      whoIsOnPage, setWhoIsOnPage,
      notifications, setNotifications,
      tabs, setTabs,
    }}>
      <SettingTabsProvider>
        {children}
      </SettingTabsProvider>
    </AdminLayoutContext.Provider>
  )
}

export default AdminLayoutContext