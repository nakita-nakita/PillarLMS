'use client'

//library
import React, { useState } from 'react'

// Mine
import tabsJson from '@/pages-scripts/portal/admin/tabs.json';
import UserManagementTabsContext, { UserManagementTabsProvider } from '@/pages-scripts/portal/admin/user-management/tabs/UserManagementTabs.context';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';
import userManagementTabsJson from '@/pages-scripts/portal/admin/user-management/tabs/tabs.json';

// MUI
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import UserManagementTabs from '@/pages-scripts/portal/admin/user-management/tabs/tabs';
import InvitedUserDataGrid from '@/pages-scripts/portal/admin/user-management/invited-users/index/components/InvitedUserDataGrid';

const Page = () => {
  const { setTabs } = React.useContext(AdminLayoutContext)
  const settingsTabsContext = React.useContext(UserManagementTabsContext)

  const [isLoaded, setIsLoaded] = useState(false)


  const { navigate } = React.useContext(AdminLayoutContext)


  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 0,
    }))

    settingsTabsContext.setTabs(prevState => ({
      ...prevState,
      tabs: userManagementTabsJson.tabs,
      selectedValue: 2,
    }))

    setIsLoaded(true)

  }, [])


  return (

    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto"
    }}
      component="form"
      noValidate
    // onSubmit={handleSubmit}
    >

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <UserManagementTabs />
      </Box>

      {isLoaded && (
        <>
          <br />
          <Button variant="contained" color="primary">
            New
          </Button>
          <br />
          <br />

          <Paper sx={{ p: 0 }} className='admin-card'>
            <InvitedUserDataGrid />
          </Paper>
        </>
      )}
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