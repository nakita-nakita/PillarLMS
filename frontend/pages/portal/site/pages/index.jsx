'use client'

// Library
import React from 'react'

// Mine
import tabsJson from '@/pages-scripts/portal/site/tabs.json';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import PagesDataGrid from '@/pages-scripts/portal/site/pages/components/data.grid';
import AdminLayout from '@/layouts/admin/layout';

// MUI
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import PageDataGrid from '@/pages-scripts/portal/site/pages/components/PageDataGrid';
import { Paper } from '@mui/material';

const Page = () => {
  const { setTabs } = React.useContext(AdminLayoutContext)

  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 1,
    }))

  }, [])

  return (

    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto"
    }}>

      <Stack spacing={2} direction="row">
        <Button variant="contained" color="success">New</Button>
      </Stack>
      <br />
      <br />
      <Paper sx={{p:0}} className='admin-card'>
        <PageDataGrid />
      </Paper>
    </Box >
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

export default Page