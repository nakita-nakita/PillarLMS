// 'use client'

// // Library
// import React from 'react'

// // Mine
// import AdminLayout from '@/layouts/admin/layout';
// import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
// import WebsiteSettingsBrowserTabSidebar from '@/pages-scripts/portal/admin/settings/pages/browser-tabs/BrowserTabOptions.sidebar';
// import PreviewBrowserTabs from '@/pages-scripts/portal/admin/settings/pages/browser-tabs/PreviewBrowserTab.component';
// import SettingSiteProvider from '@/pages-scripts/portal/admin/settings/pages/browser-tabs/context/SettingSite.context';

// const PageTemplateBuilder = () => {
//   const { setTabs } = React.useContext(AdminLayoutContext)

//   React.useEffect(() => {
//     setTabs(prevState => ({
//       ...prevState,
//       tabs: [],
//     }))
//   }, [])
//   return (
//     <div>

//       <PreviewBrowserTabs />
//     </div>
//   )
// }

// PageTemplateBuilder.getLayout = function getLayout(page) {
//   return (
//     <AdminLayout
//       isWebsiteSetting
//       SideMenu={<WebsiteSettingsBrowserTabSidebar />}
//       PageContext={SettingSiteProvider}
//     >
//       {page}
//     </AdminLayout>
//   )
// }
// export default PageTemplateBuilder