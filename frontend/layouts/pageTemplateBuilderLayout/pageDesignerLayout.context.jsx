'use client'
// Libraries
import React from 'react'

export const PageDesignerLayoutContext = React.createContext();

export function PageDesignerLayoutProvider({ children }) {

  const [leftDrawer, setLeftDrawer] = React.useState({
    isOpened: true,
    slide: "HOME", // HOME, PAGE, PANEL, METADATA
    main: "SITE", // SITE, METADATA
  })

  // const [rightDrawer, setRightDrawer] = React.useState({
  //   isOpened: false,
  //   anchor: false,
  //   isInMeeting: false,
  //   isMeetingOnPage: false,
  // })

  // const [meetingPanel, setMeetingPanel] = React.useState({
  //   slide: 'HOME', // HOME || MEETING
  // })

  // const [panelHomeDoc, setPanelHomeDoc] = React.useState({
  //   // doc
  //   allMeetingsList: [],
  //   listOfMeetingsOnThisPage: [],
  //   //being handled by notifications: // listOfMeetingInvites: [],

  //   //modal
  //   modal_isNewMeetingOpened: false,
  // })

  // const [panelMeetingDoc, setPanelMeetingDoc] = React.useState({
  //   // doc
  //   meetingId: null,
  //   meetingName: null,
  //   meetingLeaderId: null,
  //   meetingLeaderUsername: null,
  //   meetingLeaderPicture: null,
  //   meetingLeaderEmail: null,

  //   // user list:
  //   meetingUserList: [],
  //   offlineUserList: [],
  //   onlineUserListNotInMeeting: [],

  //   // modals
  //   modal_isEndMeetingModalOpened: false,
  //   modal_isChangeLeaderModalOpened: false,
  //   modal_isRequestPageModalOpened: false,
  //   modal_isInviteUsersModalOpened: false,
  //   modal_isSearchOnlineUsersModalOpened: false,

  // })

  // const [whoIsOnPage, setWhoIsOnPage] = React.useState({
  //   //doc
  //   isHidden: false,
  //   list: [],

  //   //modals
  //   modal_isEveryoneOnPageModalOpened: false,
  // })

  // const [notifications, setNotifications] = React.useState({
  //   // isBadgeHidden: zero or null value makes hidden
  //   badgeCount: "New", // badgeCount: null,
  //   isPopDownOpen: false,
  //   notificationList: [],


  // })


  return (
    <PageDesignerLayoutContext.Provider value={{
      leftDrawer, setLeftDrawer,
      // rightDrawer, setRightDrawer,
      // meetingPanel, setMeetingPanel,
      // panelHomeDoc, setPanelHomeDoc,
      // panelMeetingDoc, setPanelMeetingDoc,
      // whoIsOnPage, setWhoIsOnPage,
      // notifications, setNotifications,
    }}>
      {children}
    </PageDesignerLayoutContext.Provider>
  )
}

export default PageDesignerLayoutContext