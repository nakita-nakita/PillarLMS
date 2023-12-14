// Libraries
import React, { useContext, useEffect, useState } from 'react'
import { getSocketId, initSocket } from '@/utils/realtime/socket';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { loadPageGraphQL } from '../store/loadPageData.store';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/router';

export const SiteDesignerPageContext = React.createContext();

export function SiteDesignerPageProvider({ children }) {
  const router = useRouter();

  const { updateEntity } = useContext(AdminLayoutContext)

  const [isLoaded, setIsLoaded] = useState(false)

  // selected
  const [id, setId] = useState()
  const [entity, setEntity] = useState()
  const [slug, setSlug] = useState()


  const [isLoudSectionModalOpened, setIsLoudSectionModalOpened] = useState(false)
  const [isNormalSectionModalOpened, setIsNormalSectionModalOpened] = useState(false)
  const [loudSectionBuiltIn, setLoudSectionBuiltIn] = useState([])
  const [loudSectionBuiltInSelected, setLoudSectionBuiltInSelected] = useState()
  const [normalSectionBuiltIn, setNormalSectionBuiltIn] = useState([])
  const [normalSectionBuiltInSelected, setNormalSectionBuiltInSelected] = useState()

  const [isReady, setIsReady] = useState()
  const [isReadyValue, setIsReadyValue] = useState()




  // const [selectionType, setSelectionType] = useState()
  // const [selectionId, setSelectionId] = useState()
  // const [webAssetImport, setWebAssetImport] = useState()
  // const [menu, setMenu] = useState()
  // const [userAnswers, setUserAnswers] = useState()

  // // selections
  // const [isSelectionModalOpened, setIsSelectionModalOpened] = useState(false)













  const selectLoudSectionComponent = ({ id }) => {
    const data = loudSectionBuiltIn.filter((component) => component.id === id)[0];
    setLoudSectionBuiltInSelected({ ...data })
  }

  const getNextLoudSectionComponent = () => {
    const index = loudSectionBuiltIn.findIndex((component) => component.id === loudSectionBuiltInSelected.id);

    if (index !== -1 && index < loudSectionBuiltIn.length - 1) {
      return loudSectionBuiltIn[index + 1];
    }

    return loudSectionBuiltIn[0];
  };

  const getPreviousLoudSectionComponent = () => {
    const index = loudSectionBuiltIn.findIndex((component) => component.id === loudSectionBuiltInSelected.id);

    if (index !== -1 && index > 0) {
      return loudSectionBuiltIn[index - 1];
    }

    return loudSectionBuiltIn[loudSectionBuiltIn.length - 1]; // Return the last component if the component with the given ID is not found or if it's the first component
  };

  const selectNormalSectionComponent = ({ id }) => {
    const data = normalSectionBuiltIn.filter((component) => component.id === id)[0];
    setNormalSectionBuiltInSelected({ ...data })
  }

  const getNextNormalSectionComponent = () => {
    const index = normalSectionBuiltIn.findIndex((component) => component.id === normalSectionBuiltInSelected.id);

    if (index !== -1 && index < normalSectionBuiltIn.length - 1) {
      return normalSectionBuiltIn[index + 1];
    }

    return normalSectionBuiltIn[0];
  };

  const getPreviousNormalSectionComponent = () => {
    const index = normalSectionBuiltIn.findIndex((component) => component.id === normalSectionBuiltInSelected.id);

    if (index !== -1 && index > 0) {
      return normalSectionBuiltIn[index - 1];
    }

    return normalSectionBuiltIn[normalSectionBuiltIn.length - 1]; // Return the last component if the component with the given ID is not found or if it's the first component
  };



  useEffect(() => {

    if (normalSectionBuiltIn[0]) {

      selectNormalSectionComponent({
        id: normalSectionBuiltIn[0].id
      })

    }
  }, [normalSectionBuiltIn])

  useEffect(() => {
    if (loudSectionBuiltIn[0]) {

      selectLoudSectionComponent({
        id: loudSectionBuiltIn[0].id
      })

    }
  }, [loudSectionBuiltIn])

  useEffect(() => {
    loadPageGraphQL({
      pageId: router.query.pageId,
      socketId: getSocketId(),
    }).then(response => {

      const pageData = response.data.backendSiteDesignerPage_getOneById
      const loudBuiltInData = response.data.backendSiteDesignerPageSectionLoudBuiltIn_getMany
      const normalBuiltInData = response.data.backendSiteDesignerPageSectionNormalBuiltIn_getMany

      // updateEntity({
      //   entity: data.entity
      // })

      setId(router.query.pageId)
      // setEntity(data.entity)


      setSlug(pageData.slug)

      const loudHomePageSectionBuiltIn = loudBuiltInData.filter(l => l.category === "HOMEPAGE")
      const loudNormalPageSectionBuiltIn = loudBuiltInData.filter(l => l.category === "NORMALPAGE")

      setLoudSectionBuiltIn(
        pageData.slug === "/"
          ? [...loudHomePageSectionBuiltIn, ...loudNormalPageSectionBuiltIn]
          : [...loudNormalPageSectionBuiltIn, ...loudHomePageSectionBuiltIn]
      )

      const normalTextPageSectionBuiltIn = normalBuiltInData.filter(l => l.category === "TEXT")
      const normalImagePageSectionBuiltIn = normalBuiltInData.filter(l => l.category === "IMAGE")
      const normalListPageSectionBuiltIn = normalBuiltInData.filter(l => l.category === "LIST")
      const normalOtherPageSectionBuiltIn = normalBuiltInData.filter(l => l.category === "OTHER")

      setNormalSectionBuiltIn([
        ...normalTextPageSectionBuiltIn,
        ...normalImagePageSectionBuiltIn,
        ...normalListPageSectionBuiltIn,
        ...normalOtherPageSectionBuiltIn,
      ])

      // setIsReady(data.isReady)

      setIsLoaded(true)
    })
  }, [])


  return (
    <SiteDesignerPageContext.Provider value={{
      isLoaded, setIsLoaded,
      //selected
      id, setId,
      slug, setSlug,
      entity, setEntity,

      isLoudSectionModalOpened, setIsLoudSectionModalOpened,
      isNormalSectionModalOpened, setIsNormalSectionModalOpened,
      loudSectionBuiltIn, setLoudSectionBuiltIn,
      loudSectionBuiltInSelected, setLoudSectionBuiltInSelected,
      normalSectionBuiltIn, setNormalSectionBuiltIn,
      normalSectionBuiltInSelected, setNormalSectionBuiltInSelected,

      isReady, setIsReady,
      isReadyValue, setIsReadyValue,


      selectLoudSectionComponent,
      getNextLoudSectionComponent,
      getPreviousLoudSectionComponent,
      selectNormalSectionComponent,
      getNextNormalSectionComponent,
      getPreviousNormalSectionComponent,


    }}>
      {children}
    </SiteDesignerPageContext.Provider>
  )
}

export default SiteDesignerPageProvider