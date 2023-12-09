'use client'

// Library
import React, { useContext, useEffect } from 'react'

// Mine
import tabsJson from '@/pages-scripts/portal/site/tabs.json';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';

// MUI
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import PageDataGrid from '@/pages-scripts/portal/site/pages/index/components/PageDataGrid';
import { Paper } from '@mui/material';
import SiteDesignerPagesProvider, { SiteDesignerPagesContext } from '@/pages-scripts/portal/site/pages/index/context/SiteDesignerPages.context';
import NewPageModal from '@/pages-scripts/portal/site/pages/index/modals/NewPage.modal';

const Page = () => {
  const { setTabs } = useContext(AdminLayoutContext)
  const { isNewPageModalOpen, setIsNewPageModalOpen, } = useContext(SiteDesignerPagesContext)

  useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 1,
    }))

  }, [])

  const handleNew = () => {
    setIsNewPageModalOpen(true)
  }

  return (

    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto"
    }}>

      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          color="success"
          onClick={handleNew}
        >
          New
        </Button>
      </Stack>
      <br />
      <br />
      <Paper sx={{ p: 0 }} className='admin-card'>
        <PageDataGrid />
      </Paper>

      <NewPageModal
        isOpened={isNewPageModalOpen}
        onClose={() => {
          setIsNewPageModalOpen(false)
        }}
      />
    </Box >
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      hasNoEntity
    >
      <SiteDesignerPagesProvider>
        {page}
      </SiteDesignerPagesProvider>
    </AdminLayout>
  )
}

export default Page