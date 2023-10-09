'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import PageBrowserTabSidebar from '@/pages-scripts/portal/site/pages/browser-tabs/PageBrowserTabOptions.sidebar';
import PagePreviewBrowserTabs from '@/pages-scripts/portal/site/pages/browser-tabs/PagePreviewBrowserTab.component';

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

      <PagePreviewBrowserTabs />
    </div>
  )
}

PageTemplateBuilder.getLayout = function getLayout(page) {
  return (
    <AdminLayout isWebsiteSetting SideMenu={<PageBrowserTabSidebar/>}>
      {page}
    </AdminLayout>
  )
}
export default PageTemplateBuilder