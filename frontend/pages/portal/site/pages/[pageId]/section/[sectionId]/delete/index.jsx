'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import PagePreviewDelete from '@/pages-scripts/portal/site/pages/delete/PagePreviewDelete';
import PageDeleteSidebar from '@/pages-scripts/portal/site/pages/delete/PageDeleteSidebar';

const PageTemplateBuilder = () => {
  const { setTabs } = React.useContext(AdminLayoutContext)

  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: [],
    }))
  }, [])
  return (
    <div>

      <PagePreviewDelete />
    </div>
  )
}

PageTemplateBuilder.getLayout = function getLayout(page) {
  return (
    <AdminLayout isWebsiteSetting SideMenu={<PageDeleteSidebar />}>
      {page}
    </AdminLayout>
  )
}
export default PageTemplateBuilder