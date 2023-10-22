// Libraries
import React, { useContext, useEffect, useState } from 'react'
import { getSettingLinkGraphQL } from '../store/settingLink_getOneRealTime.store';
import { getSocketId } from '@/utils/realtime/socket';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';

export const SettingLinkContext = React.createContext();

export function SettingLinkProvider({ children }) {
  const { updateEntity } = useContext(AdminLayoutContext)

  const [isLoaded, setLoaded] = useState(false)

  const [id, setId] = useState()
  const [entity, setEntity] = useState()

  const [title, setTitle] = useState()
  const [titleValue, setTitleValue] = useState()
  const [description, setDescription] = useState()
  const [descriptionValue, setDescriptionValue] = useState()
  const [image, setImage] = useState()
  const [imageValue, setImageValue] = useState()
  const [currentImage, setCurrentImage] = useState()
  const [isReady, setIsReady] = useState()
  const [isReadyValue, setIsReadyValue] = useState()



  useEffect(() => {
    const socketId = getSocketId()
    getSettingLinkGraphQL({
      socketId,
    }).then(result => {
      const link = result.data.backendSettingLink_getOneRealTime

      console.log('link data:', link)
      updateEntity({
        entity: link.entity
      })
      setId(link.id)
      setEntity(link.entity)
      setTitle(link.title)
      setDescription(link.description)
      setImage(link.image)
      setCurrentImage(link.image?.currentSelection?.picture)
      setIsReady(link.isReady)
      setLoaded(true)
    })

  }, [])

  return (
    <SettingLinkContext.Provider value={{
      isLoaded, setLoaded,
      id, setId,
      entity, setEntity,
      title, setTitle,
      titleValue, setTitleValue,
      description, setDescription,
      descriptionValue, setDescriptionValue,
      image, setImage,
      imageValue, setImageValue,
      currentImage, setCurrentImage,
      isReady, setIsReady,
      isReadyValue, setIsReadyValue,
    }}>
      {children}
    </SettingLinkContext.Provider>
  )
}

export default SettingLinkProvider