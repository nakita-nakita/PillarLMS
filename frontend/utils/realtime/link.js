import { initSocket } from "./socket"

export const realtimeLink = ({to, router, meetingId, userId, leaderUserId, setPanelMeetingDoc}) => {
  if (meetingId) {
    
    if (userId === leaderUserId) {
      router.push(to)
    } else {
      setPanelMeetingDoc(prevState => ({
        ...prevState,
        sendRequestedUrl: to,
        modal_isSendUrlRequestModalOpened: true,
      }))
      // socket.emit('server-meeting-request-url-change', {
      //   meetingId,
      //   url: to
      // })
    }

  } else {
    router.push(to)
  }

}