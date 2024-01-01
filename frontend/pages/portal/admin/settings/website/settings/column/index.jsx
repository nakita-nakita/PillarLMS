'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import WebsiteSettingsColumnSidebar from '@/pages-scripts/portal/admin/settings/pages/column/ColumnOptions.sidebar';
import SettingColumnProvider from '@/pages-scripts/portal/admin/settings/pages/column/context/SettingColumn.context';
import PreviewColumnSelection from '@/pages-scripts/portal/admin/settings/pages/column/PreviewColumn.component';

const PageColumnBuilder = () => {
  const { setTabs } = React.useContext(AdminLayoutContext)

  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: [],
    }))
  }, [])
  return (
    <div>

      <PreviewColumnSelection />
    </div>
  )
}

PageColumnBuilder.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      isWebsiteSetting
      SideMenu={<WebsiteSettingsColumnSidebar />}
      PageContext={SettingColumnProvider}
    >
      {page}
    </AdminLayout>
  )
}
export default PageColumnBuilder