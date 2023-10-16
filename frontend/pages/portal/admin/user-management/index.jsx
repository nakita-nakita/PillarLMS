'use client'

// Library
import React from 'react'

// Mine
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import tabsJson from '@/pages-scripts/portal/admin/tabs.json';
import InviteList from '@/pages-scripts/portal/admin/user-management/invite.list';
import UserList from '@/pages-scripts/portal/admin/user-management/user.list';
import AdminLayout from '@/layouts/admin/layout';

// MUI
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Page = () => {
  const { setTabs } = React.useContext(AdminLayoutContext)

  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 0,
    }))

  }, [])

  return (

    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto"
    }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <h2>Users</h2>
          <Stack spacing={2} direction="row">
            <Button variant="contained" color="success">Invite People</Button>
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <UserList />
          {/* xs=9 */}
        </Grid>
      </Grid>
      <br />
      <hr />
      <br />

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <h2>Pending Invites</h2>
          
          
          {/* <p>
            Proin lobortis elit id ultricies sodales. Curabitur bibendum suscipit lacus, vel laoreet elit rutrum vitae.
          </p> */}
          {/* <Stack spacing={2} direction="row">
            <Button variant="contained" color="success">Invite People</Button>
          </Stack> */}
        </Grid>
        <Grid item xs={9}>
          <InviteList />
          {/* xs=9 */}
        </Grid>
      </Grid>
      {/* <UserManagementDataGrid /> */}
    </Box>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      hasNoEntity
    >
      {page}
    </AdminLayout>
  )
}

export default Page