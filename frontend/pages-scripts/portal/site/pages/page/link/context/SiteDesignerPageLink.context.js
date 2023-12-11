// Libraries
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';

// code
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { loadPageLinkGraphQL } from '../store/loadPageLink.store';
import { getSocketId } from '@/utils/realtime/socket';
import { savePageLinkGraphQL } from '../store/savePageLink.store';

export const SiteDesignerPageLinkContext = React.createContext();

export function SiteDesignerPageLinkProvider({ children }) {
  const router = useRouter();

  const { updateEntity } = useContext(AdminLayoutContext)

  const [isLoaded, setIsLoaded] = useState(false)

  const [entity, setEntity] = useState()
  const [id, setId] = useState()

  const [title, setTitle] = useState()
  const [titleValue, setTitleValue] = useState()
  const [description, setDescription] = useState()
  const [descriptionValue, setDescriptionValue] = useState()
  const [picture, setPicture] = useState()
  const [pictureValue, setPictureValue] = useState()

  // const [favicon, setFavicon] = useState()
  // const [tabOrgName, setTabOrgName] = useState()


  useEffect(() => {
    if (router.query?.pageId !== undefined) {
      loadPageLinkGraphQL({
        pageId: router.query.pageId,
        socketId: getSocketId(),
      }).then(response => {
        const data = response.data.backendSiteDesignerPageLink_getOneRealTimeByPageId

        updateEntity({
          entity: data.entity
        })
        setEntity(data.entity)
        setId(data.id || undefined)

        setTitle(data.title || undefined)
        setDescription(data.description || undefined)
        setPicture(data.picture)

        if (data.picture?.currentSelection?.media) {
          setPictureValue(data.picture.currentSelection.media)
        }

        setIsLoaded(true)
      })
    }
  }, [])

  const save = () => {
    savePageLinkGraphQL({
      pageId: router.query.pageId,
      id,
      title: titleValue,
      description: descriptionValue,
      picture: pictureValue,
      pictureAlt: undefined,
    }).then(() => {
      enqueueSnackbar("Link Tab Saved!")
    })
  }

  return (
    <SiteDesignerPageLinkContext.Provider value={{
      isLoaded, setIsLoaded,
      id, setId,
      entity, setEntity,
      title, setTitle,
      titleValue, setTitleValue,
      description, setDescription,
      descriptionValue, setDescriptionValue,
      picture, setPicture,
      pictureValue, setPictureValue,
      save,
    }}>
      {children}
    </SiteDesignerPageLinkContext.Provider>
  )
}

export default SiteDesignerPageLinkProvider