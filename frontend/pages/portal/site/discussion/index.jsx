'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';
import PostCard from '@/pages-scripts/portal/site/discussion/post.card';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import tabsJson from '@/pages-scripts/portal/site/tabs.json';
import FilterToggle from '@/pages-scripts/portal/site/discussion/filter.toggle';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


const DiscussionPage = () => {
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

      <Stack spacing={2} direction="row">
        <Button variant="contained" color="success">New</Button>
        <FilterToggle />
      </Stack>
      <br />
      <br />
      <PostCard />
    </Box>
  )
}

DiscussionPage.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

export default DiscussionPage