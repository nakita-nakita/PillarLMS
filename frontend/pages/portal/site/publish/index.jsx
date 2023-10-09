'use client'

// Library
import React from 'react'

// Mine
import tabsJson from '@/pages-scripts/portal/site/tabs.json';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';

// MUI
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const PublishPage = () => {
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
      <Paper elevation={3} sx={{ padding: "20px" }}>
        <dix style={{ float: "right" }}>
          subdomain.churchfirst.com
          <br />
          domain.com
        </dix>
        <h2>Publish</h2>
        <Stack spacing={2} direction="row">
          <Button variant="contained" color="success">Release</Button>
        </Stack>
        <br />
        <p>Errors (1)</p>

      </Paper>
      <br />
      <Alert severity="error">This is an error alert — check it out!</Alert>
      <br />
    </Box>
  )
}

PublishPage.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

export default PublishPage