'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import WebsiteSettingsLinkSidebar from '@/pages-scripts/portal/admin/settings/pages/link/LinkOptions.sidebar';
import PreviewLink from '@/pages-scripts/portal/admin/settings/pages/link/PreviewLink.component';
import PagePreviewLink from '@/pages-scripts/portal/site/pages/page/link/PagePreviewLink.component';
import PageLinkSidebar from '@/pages-scripts/portal/site/pages/page/link/PageLinkOptions.sidebar';
import SiteDesignerPageLinkProvider from '@/pages-scripts/portal/site/pages/page/link/context/SiteDesignerPageLink.context';

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

      <PagePreviewLink />
    </div>
  )
}

PageTemplateBuilder.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      isWebsiteSetting
      PageContext={SiteDesignerPageLinkProvider}
      SideMenu={<PageLinkSidebar />}
    >
      {page}
    </AdminLayout>
  )
}
export default PageTemplateBuilder