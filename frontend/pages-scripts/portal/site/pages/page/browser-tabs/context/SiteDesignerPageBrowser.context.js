// Libraries
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';

// code
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { loadPageBrowserGraphQL } from '../store/loadPageBrowser.store';
import { getSocketId } from '@/utils/realtime/socket';
import { savePageBrowserGraphQL } from '../store/savePageBrowser.store';
import { enqueueSnackbar } from 'notistack';

export const SiteDesignerPageBrowserContext = React.createContext();

export function SiteDesignerPageBrowserProvider({ children }) {
  const router = useRouter();

  const { updateEntity } = useContext(AdminLayoutContext)

  const [isLoaded, setIsLoaded] = useState(false)

  const [entity, setEntity] = useState()

  const [tabName, setTabName] = useState()
  const [tabNameValue, setTabNameValue] = useState("")
  const [slug, setSlug] = useState()

  const [favicon, setFavicon] = useState()
  const [tabOrgName, setTabOrgName] = useState()


  useEffect(() => {
    if (router.query?.pageId !== undefined) {
      loadPageBrowserGraphQL({
        pageId: router.query.pageId,
        socketId: getSocketId(),
      }).then(response => {
        const pageData = response.data.backendSiteDesignerPage_getOneById
        const pageBrowser = response.data.backendSiteDesignerPageBrowser_getOneRealTimeByPageId

        const siteData = response.data.backendSettingSite_getOne

        updateEntity({
          entity: pageBrowser.entity
        })
        setEntity(pageBrowser.entity)

        setSlug(pageData.slug)
        setTabName(pageBrowser.tabName)
        setFavicon(siteData.favicon)
        setTabOrgName(siteData.tab)

        setIsLoaded(true)
      })
    }
  }, [])

  const save = ({pageId, tabName}) => {
    savePageBrowserGraphQL({
      pageId,
      tabName,
    }).then(() => {
      enqueueSnackbar("Browser Tab Saved!")
    })
  }

  return (
    <SiteDesignerPageBrowserContext.Provider value={{
      isLoaded, setIsLoaded,
      entity, setEntity,
      slug, setSlug,
      tabName, setTabName,
      tabNameValue, setTabNameValue,
      favicon, setFavicon,
      tabOrgName, setTabOrgName,
      save,
    }}>
      {children}
    </SiteDesignerPageBrowserContext.Provider>
  )
}

export default SiteDesignerPageBrowserProvider