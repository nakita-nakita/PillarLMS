'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import SiteDesignerPageProvider from '@/pages-scripts/portal/site/pages/page/index/context/SiteDesignerPage.context';
import SiteDesignerPageSidebar from '@/pages-scripts/portal/site/pages/page/index/PageOptions.sidebar';
import PreviewSiteDesignerPage from '@/pages-scripts/portal/site/pages/page/index/PreviewPage.component';

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

      <PreviewSiteDesignerPage />
    </div>
  )
}

PageTemplateBuilder.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      isWebsiteSetting
      PageContext={SiteDesignerPageProvider}
      SideMenu={<SiteDesignerPageSidebar />}
    >
      {page}
    </AdminLayout>
  )
}
export default PageTemplateBuilder