'use client'

// Library
import React, { useEffect, useState } from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';
import FolderView from '@/pages-scripts/portal/media-manager/components/FolderView.component';
import MediaManagerProvider from '@/pages-scripts/portal/media-manager/context/mediaManager.context';
import { useRouter } from 'next/router';
// import { useRouter } from 'next/'


const MediaManagerFolderPage = () => {
  const router = useRouter()

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (router.query?.id) {
      setIsLoaded(true)
    }

  }, [router.query])
  return (
    <>
      {isLoaded && <FolderView />}
    </>
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