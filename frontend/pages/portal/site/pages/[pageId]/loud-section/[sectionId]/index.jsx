'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import SiteDesignerPageLoudSectionSidebar from '@/pages-scripts/portal/site/pages/page/loud-section/index/PageLoudSectionOptions.sidebar';
import SiteDesignerPageLoudSectionProvider from '@/pages-scripts/portal/site/pages/page/loud-section/index/context/SiteDesignerPageLoudSection.context';
import PreviewSiteDesignerPageLoudSection from '@/pages-scripts/portal/site/pages/page/loud-section/index/PreviewPageLoudSection.component';

const PageLoudSectionBuilder = () => {
  const { setTabs } = React.useContext(AdminLayoutContext)

  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: [],
    }))
  }, [])
  return (
    <div>

      <PreviewSiteDesignerPageLoudSection />
    </div>
  )
}

PageLoudSectionBuilder.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      isWebsiteSetting
      PageContext={SiteDesignerPageLoudSectionProvider}
      SideMenu={<SiteDesignerPageLoudSectionSidebar />}
    >
      {page}
    </AdminLayout>
  )
}
export default PageLoudSectionBuilder
