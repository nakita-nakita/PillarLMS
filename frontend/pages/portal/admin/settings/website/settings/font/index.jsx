'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import SettingFontProvider from '@/pages-scripts/portal/admin/settings/pages/font/context/SettingFont.context';
import WebsiteSettingsFontSidebar from '@/pages-scripts/portal/admin/settings/pages/font/FontOptions.sidebar';
import PreviewFont from '@/pages-scripts/portal/admin/settings/pages/font/PreviewFont.component';

const PageFontBuilder = () => {
  const { setTabs } = React.useContext(AdminLayoutContext)

  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: [],
    }))
  }, [])
  return (
    <div>

      <PreviewFont />
    </div>
  )
}

PageFontBuilder.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      isWebsiteSetting
      SideMenu={<WebsiteSettingsFontSidebar />}
      PageContext={SettingFontProvider}
    >
      {page}
    </AdminLayout>
  )
}
export default PageFontBuilder