// Libraries
import React, { useContext, useEffect, useState } from 'react'
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { useRouter } from 'next/router';
import { normalSectionGraphQL } from '../store/loadSectionData.store';
import { getSocketId } from '@/utils/realtime/socket';
import { deleteNormalSectionGraphQL } from '../store/deleteNormalSection.store';

export const SiteDesignerPageSectionContext = React.createContext();

export function SiteDesignerPageSectionProvider({ children }) {
  const router = useRouter();

  const { updateEntity, navigate } = useContext(AdminLayoutContext)

  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoudSectionDeletionModalOpened, setIsLoudSectionDeletionModalOpened] = useState(false)
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



  const deleteSection = () => {
    if (nameInput === name) {
      deleteNormalSectionGraphQL({
        id: router.query.sectionId,
      }).then(() => {
        navigate(`/portal/site/pages/${router.query.pageId}/`)
      })
    }
  }



  useEffect(() => {
    normalSectionGraphQL({
      id: router.query.sectionId,
      socketId: getSocketId(),
    }).then(response => {
      const data = response.data.backendSiteDesignerPageSectionNormal_getOneRealTimeById;

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
    //   const loudBuiltInData = response.data.backendSiteDesignerPageSectionLoudBuiltIn_getMany
    //   const normalBuiltInData = response.data.backendSiteDesignerPageSectionNormalBuiltIn_getMany

    //   // updateEntity({
    //   //   entity: data.entity
    //   // })

    //   setId(router.query.pageId)
    //   // setEntity(data.entity)


    //   setSlug(pageData.slug)

    //   const loudHomePageSectionBuiltIn = loudBuiltInData.filter(l => l.category === "HOMEPAGE")
    //   const loudNormalPageSectionBuiltIn = loudBuiltInData.filter(l => l.category === "NORMALPAGE")

    //   setLoudSectionBuiltIn(
    //     pageData.slug === "/"
    //       ? [...loudHomePageSectionBuiltIn, ...loudNormalPageSectionBuiltIn]
    //       : [...loudNormalPageSectionBuiltIn, ...loudHomePageSectionBuiltIn]
    //   )

    //   const normalTextPageSectionBuiltIn = normalBuiltInData.filter(l => l.category === "TEXT")
    //   const normalImagePageSectionBuiltIn = normalBuiltInData.filter(l => l.category === "IMAGE")
    //   const normalListPageSectionBuiltIn = normalBuiltInData.filter(l => l.category === "LIST")
    //   const normalOtherPageSectionBuiltIn = normalBuiltInData.filter(l => l.category === "OTHER")

    //   setNormalSectionBuiltIn([
    //     ...normalTextPageSectionBuiltIn,
    //     ...normalImagePageSectionBuiltIn,
    //     ...normalListPageSectionBuiltIn,
    //     ...normalOtherPageSectionBuiltIn,
    //   ])

    //   // setIsReady(data.isReady)

    //   setIsLoaded(true)
    // })
  }, [])


  return (
    <SiteDesignerPageSectionContext.Provider value={{
      isLoaded, setIsLoaded,
      isLoudSectionDeletionModalOpened, setIsLoudSectionDeletionModalOpened,
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
      deleteSection,
    }}>
      {children}
    </SiteDesignerPageSectionContext.Provider>
  )
}

export default SiteDesignerPageSectionProvider