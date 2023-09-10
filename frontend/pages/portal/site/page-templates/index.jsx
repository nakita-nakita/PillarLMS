'use client'

// library
import React from 'react'

// mine
import tabsJson from '@/pages-scripts/portal/site/tabs.json';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import PageTemplatesDataGrid from '@/pages-scripts/portal/site/page-templates/data.grid';
import AdminLayout from '@/layouts/admin/layout';

//mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
// import * as tabsJson from '../tabs.json';

const Page = () => {
  const { setTabs } = React.useContext(AdminLayoutContext)

  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 2,
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
      <PageTemplatesDataGrid />
    </Box>
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