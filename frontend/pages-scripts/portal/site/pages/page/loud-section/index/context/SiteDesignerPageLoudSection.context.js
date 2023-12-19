// Libraries
import React, { useContext, useEffect, useState } from 'react'
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { useRouter } from 'next/router';
import { getSocketId } from '@/utils/realtime/socket';
import { deleteLoudSectionGraphQL } from '../store/deleteLoudSection.store';
import { loadLoudSectionGraphQL } from '../store/loadLoudSectionData.store';

export const SiteDesignerPageLoudSectionContext = React.createContext();

export function SiteDesignerPageLoudSectionProvider({ children }) {
  const router = useRouter();

  const { updateEntity, navigate } = useContext(AdminLayoutContext)

  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoudLoudSectionDeletionModalOpened, setIsLoudLoudSectionDeletionModalOpened] = useState(false)
  const [answer, setAnswer] = useState()
  const [isDarkMode, setIsDarkMode] = useState(false)

  // selected
  const [id, setId] = useState()
  const [entity, setEntity] = useState()

  // GUI
  const [webAssetImport, setWebAssetImport] = useState()
  const [menu, setMenu] = useState()
  const [userAnswers, setUserAnswers] = useState()
  const [name, setName] = useState()

  // for deletion modal
  const [nameInput, setNameInput] = useState()



  const deleteLoudSection = () => {
    if (nameInput === name) {
      deleteLoudSectionGraphQL({
        id: router.query.sectionId,
      }).then(() => {
        navigate(`/portal/site/pages/${router.query.pageId}/`)
      })
    }
  }



  useEffect(() => {
    loadLoudSectionGraphQL({
      pageId: router.query.pageId,
      socketId: getSocketId(),
    }).then(response => {
      const data = response.data.backendSiteDesignerPageSectionLoud_getOneRealTimeByPageId;

      // install entity.
      updateEntity({
        entity: data.entity
      })

      // set records
      setId(data.id)
      setEntity(data.entity)

      // realtime gui
      setUserAnswers(JSON.parse(data.userAnswersJsonB))
      setWebAssetImport(data.webAssetImport)
      setMenu(JSON.parse(data.menuJsonB))
      setName(data.name)

      setIsLoaded(true)
    })
    // loadPageGraphQL({
    //   pageId: router.query.pageId,
    //   socketId: getSocketId(),
    // }).then(response => {

    //   const pageData = response.data.backendSiteDesignerPage_getOneById
    //   const loudBuiltInData = response.data.backendSiteDesignerPageLoudSectionLoudBuiltIn_getMany
    //   const normalBuiltInData = response.data.backendSiteDesignerPageLoudSectionBuiltIn_getMany

    //   // updateEntity({
    //   //   entity: data.entity
    //   // })

    //   setId(router.query.pageId)
    //   // setEntity(data.entity)


    //   setSlug(pageData.slug)

    //   const loudHomePageLoudSectionBuiltIn = loudBuiltInData.filter(l => l.category === "HOMEPAGE")
    //   const loudPageLoudSectionBuiltIn = loudBuiltInData.filter(l => l.category === "NORMALPAGE")

    //   setLoudLoudSectionBuiltIn(
    //     pageData.slug === "/"
    //       ? [...loudHomePageLoudSectionBuiltIn, ...loudPageLoudSectionBuiltIn]
    //       : [...loudPageLoudSectionBuiltIn, ...loudHomePageLoudSectionBuiltIn]
    //   )

    //   const normalTextPageLoudSectionBuiltIn = normalBuiltInData.filter(l => l.category === "TEXT")
    //   const normalImagePageLoudSectionBuiltIn = normalBuiltInData.filter(l => l.category === "IMAGE")
    //   const normalListPageLoudSectionBuiltIn = normalBuiltInData.filter(l => l.category === "LIST")
    //   const normalOtherPageLoudSectionBuiltIn = normalBuiltInData.filter(l => l.category === "OTHER")

    //   setLoudSectionBuiltIn([
    //     ...normalTextPageLoudSectionBuiltIn,
    //     ...normalImagePageLoudSectionBuiltIn,
    //     ...normalListPageLoudSectionBuiltIn,
    //     ...normalOtherPageLoudSectionBuiltIn,
    //   ])

    //   // setIsReady(data.isReady)

    //   setIsLoaded(true)
    // })
  }, [])


  return (
    <SiteDesignerPageLoudSectionContext.Provider value={{
      isLoaded, setIsLoaded,
      isLoudLoudSectionDeletionModalOpened, setIsLoudLoudSectionDeletionModalOpened,
      // record
      id, setId,
      entity, setEntity,
      // realtime gui
      webAssetImport, setWebAssetImport,
      menu, setMenu,
      userAnswers, setUserAnswers,
      name, setName,
      // result
      answer, setAnswer,
      // config
      isDarkMode, setIsDarkMode,
      // name input
      nameInput, setNameInput,
      // utils
      deleteLoudSection,
    }}>
      {children}
    </SiteDesignerPageLoudSectionContext.Provider>
  )
}

export default SiteDesignerPageLoudSectionProvider