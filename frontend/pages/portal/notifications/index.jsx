'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';

// MUI
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import { getNotificationsGraphQL } from '@/pages-scripts/portal/notifications/getNotifications.graphql';
import NotificationRow from '@/components/notification/NotificationRow';
import Button from '@mui/material/Button';
import { setNotificationSeenGraphQL } from '@/components/notification/store/notificationSeen.store';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';

const NotificationsPage = () => {
  const { setNotifications } = React.useContext(AdminLayoutContext)

  const [isLoaded, setIsLoaded] = React.useState(false)
  const [nofis, setNofis] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(20)
  const [showMoreButtonVisible, setShowMoreButtonVisible] = React.useState(false)

  const getNotifications = () => {
    getNotificationsGraphQL({ page, pageSize }).then(result => {
      const newNofis = result.data.backendNotification_getManyWithPagination.rows

      setNofis(prevState => ([
        ...prevState,
        ...newNofis
      ]))
      setPage(prevState => prevState + 1)

      if (newNofis.length !== pageSize) {
        setShowMoreButtonVisible(false)
      } else {
        setShowMoreButtonVisible(true)
      }

      setIsLoaded(true)
    })
  }

  React.useEffect(() => {
    getNotifications()
    setNotificationSeenGraphQL().then(() => {
      
      setNotifications(prevState => ({
        ...prevState,
        badgeCount: 0,
      }))
    })
  }, [])

  return (
    <>
      <Box sx={{
        flexGrow: 1,
        width: "100%",
        maxWidth: "700px",
        m: "auto",
        paddingBottom: "16px"
      }}>
        <Paper elevation={3} sx={{ padding: "0" }}>
          {/* import FolderIcon from '@mui/icons-material/Folder'; */}
          {nofis.map(n => {
            return (<NotificationRow key={n.id} action={n.action} hasBeenClicked={n.hasBeenClicked} id={n.id} message={n.message} createdAt={n.createdAt} stopSeenRequest={true} />)
          })}
          {isLoaded && nofis.length === 0 && (
            <div style={{ textAlign: 'center' }}>
              <br />
              <em>All quiet here. No notifications for now.</em>
              <br />
              <br />
            </div>
          )}
        </Paper>
        <br />
        {showMoreButtonVisible && (<Button variant="contained" onClick={getNotifications}>Load More</Button>)}
      </Box>
    </>
  )
}

NotificationsPage.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

export default NotificationsPage