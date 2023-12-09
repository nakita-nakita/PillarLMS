'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import PagePreviewDelete from '@/pages-scripts/portal/site/pages/page/delete/PagePreviewDelete';
import PageDeleteSidebar from '@/pages-scripts/portal/site/pages/page/delete/PageDeleteSidebar';
import SiteDesignerPageDeleteProvider from '@/pages-scripts/portal/site/pages/page/delete/context/SiteDesignerPageDelete.context';

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
    <AdminLayout
      hasNoEntity
      isWebsiteSetting
      SideMenu={<PageDeleteSidebar />}
      PageContext={SiteDesignerPageDeleteProvider}
    >

      {page}
    </AdminLayout>
  )
}
export default PageTemplateBuilder