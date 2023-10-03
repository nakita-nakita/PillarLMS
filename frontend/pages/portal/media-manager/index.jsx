'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';
import MediaManagerProvider from '@/pages-scripts/portal/media-manager/context/mediaManager.context';
import FolderView from '@/pages-scripts/portal/media-manager/components/FolderView.component';


const MediaManagerPage = () => {
  return (
    <FolderView />
  )

}

MediaManagerPage.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      <MediaManagerProvider>
        {page}
      </MediaManagerProvider>
    </AdminLayout>
  )
}

export default MediaManagerPage