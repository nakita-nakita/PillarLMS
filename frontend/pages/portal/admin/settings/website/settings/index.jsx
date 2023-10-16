'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';
import WebsiteSettingsHome from '@/pages-scripts/portal/admin/settings/pages/home/WebsiteSettingsHome.component';
import WebsiteSettingsHomeSidebar from '@/pages-scripts/portal/admin/settings/pages/home/WebsiteSettingsHome.sidebar';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';

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

      <WebsiteSettingsHome />
    </div>
  )
}

PageTemplateBuilder.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      hasNoEntity
      isWebsiteSetting
      SideMenu={<WebsiteSettingsHomeSidebar />}
    >
      {page}
    </AdminLayout>
  )
}
export default PageTemplateBuilder