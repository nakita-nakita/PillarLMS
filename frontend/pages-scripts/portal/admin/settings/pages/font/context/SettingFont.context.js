// Libraries
import React, { useContext, useEffect, useState } from 'react'
import { getSocketId, initSocket } from '@/utils/realtime/socket';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { getSettingFontGraphQL } from '../store/settingFont_getOneRealTime.store';

export const SettingFontContext = React.createContext();

export function SettingFontProvider({ children }) {
  const { updateEntity, idChip } = useContext(AdminLayoutContext)

  const [isLoaded, setLoaded] = useState(false)

  const [modals, setModals] = useState({
    isSystemFaviconsModalOpened: false,
  })

  const [id, setId] = useState()
  const [entity, setEntity] = useState()

  const [favicon, setFavicon] = useState()
  const [faviconValue, setFaviconValue] = useState()
  const [tab, setTab] = useState()
  const [tabValue, setTabValue] = useState()
  const [isReady, setIsReady] = useState()
  const [isReadyValue, setIsReadyValue] = useState()


  useEffect(() => {
    const socketId = getSocketId()
    // getSettingFontGraphQL({
    //   socketId,
    // }).then(result => {
    //   const site = result.data.backendSettingFont_getOneRealTime
    //   console.log('init data for site', site)
    //   if (site) {

    //     updateEntity({
    //       entity: site.entity
    //     })
    //     setEntity(site.entity)

    //     setId(site.id)
    //     setIsReady(site.isReady)

    //     setFavicon(site.favicon)

    //     setTab(site.tab)
    //   }

    //   setLoaded(true)
    // })

    setLoaded(true)

  }, [])

  return (
    <SettingFontContext.Provider value={{
      isLoaded, setLoaded,
      id, setId,
      entity, setEntity,
      favicon, setFavicon,
      faviconValue, setFaviconValue,
      tab, setTab,
      tabValue, setTabValue,
      isReady, setIsReady,
      isReadyValue, setIsReadyValue,
      modals, setModals,
    }}>
      {children}
    </SettingFontContext.Provider>
  )
}

export default SettingFontProvider