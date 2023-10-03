'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';
import FolderView from '@/pages-scripts/portal/media-manager/components/FolderView.component';
import MediaManagerProvider from '@/pages-scripts/portal/media-manager/context/mediaManager.context';


const MediaManagerFolderPage = () => {
  return (
    <FolderView />
  )
}

MediaManagerFolderPage.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      <MediaManagerProvider>
        {page}
      </MediaManagerProvider>
    </AdminLayout>
  )
}

export default MediaManagerFolderPage