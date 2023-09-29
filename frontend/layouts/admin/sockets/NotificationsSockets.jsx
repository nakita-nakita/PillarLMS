import React, { useContext, useEffect } from 'react'
import AdminLayoutContext from '../layout/adminLayout.context'
import { initSocket } from '@/utils/realtime/socket';

function NotificationSockets({ children }) {
  const { setNotifications, notifications } = useContext(AdminLayoutContext)

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

    return () => {
      socket.off('new-notification')
    }

  }, []);

  return (
    <div>
      {children}
    </div>
  )
}

export default NotificationSockets