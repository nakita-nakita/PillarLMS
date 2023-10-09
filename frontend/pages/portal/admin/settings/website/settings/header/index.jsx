'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import PreviewFooter from '@/pages-scripts/portal/admin/settings/pages/footer/PreviewFooter.component';
import WebsiteSettingsHeaderSidebar from '@/pages-scripts/portal/admin/settings/pages/header/HeaderOptions.sidebar';
import PreviewHeader from '@/pages-scripts/portal/admin/settings/pages/header/PreviewHeader.component';
import { LinksProvider } from '@/pages-scripts/portal/admin/settings/components/NavLinks/LinkContext';

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
    <AdminLayout isWebsiteSetting SideMenu={(
      <LinksProvider>
        <WebsiteSettingsHeaderSidebar />
      </LinksProvider>
    )}
    >
      {page}
    </AdminLayout>
  )
}
export default PageTemplateBuilder