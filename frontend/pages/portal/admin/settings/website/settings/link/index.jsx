'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import WebsiteSettingsLinkSidebar from '@/pages-scripts/portal/admin/settings/pages/link/LinkOptions.sidebar';
import PreviewLink from '@/pages-scripts/portal/admin/settings/pages/link/PreviewLink.component';
import SettingLinkProvider from '@/pages-scripts/portal/admin/settings/pages/link/context/SettingLink.context';

const PageTemplateBuilder = () => {
  const { setTabs, updateEntity } = React.useContext(AdminLayoutContext)

  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: [],
    }))

    
  }, [])
  return (
    <div>

      <PreviewLink />
    </div>
  )
}

PageTemplateBuilder.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      isWebsiteSetting
      SideMenu={<WebsiteSettingsLinkSidebar />}
      PageContext={SettingLinkProvider}
    >
      {page}
    </AdminLayout>
  )
}
export default PageTemplateBuilder