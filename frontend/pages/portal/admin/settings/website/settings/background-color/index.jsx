'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import PreviewBackgroundColor from '@/pages-scripts/portal/admin/settings/pages/background-color/PreviewBackgroundColor.component';
import SettingBackgroundColorProvider from '@/pages-scripts/portal/admin/settings/pages/background-color/context/SettingBackgroundColor.context';
import WebsiteSettingsBackgroundColorSidebar from '@/pages-scripts/portal/admin/settings/pages/background-color/BackgroundColorOptions.sidebar';

const PageBackgroundColorBuilder = () => {
  const { setTabs } = React.useContext(AdminLayoutContext)

  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: [],
    }))
  }, [])
  return (
    <div>

      <PreviewBackgroundColor />
    </div>
  )
}

PageBackgroundColorBuilder.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      isWebsiteSetting
      SideMenu={<WebsiteSettingsBackgroundColorSidebar />}
      PageContext={SettingBackgroundColorProvider}
    >
      {page}
    </AdminLayout>
  )
}
export default PageBackgroundColorBuilder