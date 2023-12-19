'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import PreviewSiteDesignerPageSection from '@/pages-scripts/portal/site/pages/page/section/index/PreviewPageSection.component';
import SiteDesignerPageSectionProvider from '@/pages-scripts/portal/site/pages/page/section/index/context/SiteDesignerPageSection.context';
import SiteDesignerPageSectionSidebar from '@/pages-scripts/portal/site/pages/page/section/index/PageSectionOptions.sidebar';

const PageSectionBuilder = () => {
  const { setTabs } = React.useContext(AdminLayoutContext)

  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: [],
    }))
  }, [])
  return (
    <div>

      <PreviewSiteDesignerPageSection />
    </div>
  )
}

PageSectionBuilder.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      isWebsiteSetting
      PageContext={SiteDesignerPageSectionProvider}
      SideMenu={<SiteDesignerPageSectionSidebar />}
    >
      {page}
    </AdminLayout>
  )
}
export default PageSectionBuilder
