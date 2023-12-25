// Libraries
import React, { useContext, useEffect, useState } from 'react'
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { getPublishRecordGraphQL } from '../store/getPublishes.store';
import { postReleaseWebsiteGraphQL } from '../store/postReleaseWebsite.store';

export const SiteDesignerPublishContext = React.createContext();

export function SiteDesignerPublishProvider({ children }) {

  const { navigate } = useContext(AdminLayoutContext)

  const [isLoaded, setIsLoaded] = useState(false)

  const [isNewPublishModalOpen, setIsNewPublishModalOpen] = useState(false)
  const [publishRecords, setPublishRecords] = useState(false)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  useEffect(() => {
    getPublishRecordGraphQL({ page, pageSize }).then(response => {
      const data = response.data.backendSiteDesignerPublishRecord_getManyWithPagination

      setPublishRecords(data.rows)

      setIsLoaded(true)
    })
  }, [])

  const openPublishModal = () => {
    setIsNewPublishModalOpen(true)
  }

  const publishWebsite = () => {
    postReleaseWebsiteGraphQL().then(response => {
      const data = response.data.backendSiteDesignerPublish_publishSite

      if (data) {
        setPublishRecords(prevState => ([
          ...prevState,
          data
        ]))
      }
      
    })
  }

  return (
    <SiteDesignerPublishContext.Provider value={{
      isLoaded, setIsLoaded,
      isNewPublishModalOpen, setIsNewPublishModalOpen,
      publishRecords, setPublishRecords,
      // utils
      openPublishModal,
      publishWebsite,
    }}>
      {children}
    </SiteDesignerPublishContext.Provider>
  )
}

export default SiteDesignerPublishProvider