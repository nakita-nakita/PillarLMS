'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import WebsiteSettingsHeaderSidebar from '@/pages-scripts/portal/admin/settings/pages/header/HeaderOptions.sidebar';
import PreviewHeader from '@/pages-scripts/portal/admin/settings/pages/header/PreviewHeader.component';
import SettingHeaderProvider from '@/pages-scripts/portal/admin/settings/pages/header/context/SettingHeader.context';

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

      <PreviewHeader />
    </div>
  )
}

PageTemplateBuilder.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      isWebsiteSetting
      PageContext={SettingHeaderProvider}
      SideMenu={<WebsiteSettingsHeaderSidebar />}
    >
      {page}
    </AdminLayout>
  )
}
export default PageTemplateBuilder