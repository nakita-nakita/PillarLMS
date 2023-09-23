import * as React from 'react';
import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import NotificationRow from './NotificationRow';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';


export default function NotificationPopup() {

  const router = useRouter()
  const { notifications, setNotifications } = React.useContext(AdminLayoutContext)

  return (
    <Box sx={{ p: 0 }}>
      <CssBaseline />
      <List sx={{ p: 0 }}>
        {notifications.list.map(n => (
          <NotificationRow key={n.id} hasBeenSeen={n.hasBeenSeen} createdAt={n.createdAt} action={n.action} id={n.id} hasBeenClicked={n.hasBeenClicked} message={n.message} />
        ))}
        {notifications.list.length === 0 && (
          <div style={{ textAlign: 'center', padding: "10px" }}>
            <br />
            <em>All quiet here. No notifications for now.</em>
            <br />
            <br />
          </div>
        )}
      </List>
      <Paper elevation={3}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
          onClick={() => router.push('/portal/notifications')}
        >
          View All
        </Button>
      </Paper>
    </Box>
  );
}

// proptypes
// interface MessageExample {
//   primary: string;
//   secondary: string;
//   person: string;
// }

