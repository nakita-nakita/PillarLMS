// Libraries
import React, { createContext, useEffect, useState } from 'react'
import { getMediaManagerPageGraphQL } from '@/pages-scripts/portal/media-manager/store/mediaManager-getPage.store';
import { getMediaManagerModelGraphQL } from '../store/getMedia.store';

export const SelectMediaManagerContext = createContext();

export function SelectMediaManagerProvider({ children }) {

  const [selectedFolderId, setSelectedFolderId] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const [mediaManager, setMediaManager] = useState({

    //use for selecting items in drop downs
    selectedFolderId: null,
    selectedFileId: null,

    selectFolderName: "",
    selectFileName: "",

    // if the page is on a folder
    selectedFolderId: null,

    // ui
    breadCrumbs: [],
    folders: [],
    files: [],


    // modals
    modal_isNewFolderModalOpened: false,
    modal_isDeleteFileModalOpened: false,
    modal_isDeleteFolderModalOpened: false,
    modal_isDeleteFolderFailedModalOpened: false,
    modal_isRenameFileModalOpened: false,
    modal_isRenameFolderModalOpened: false,
    modal_isRestoreFileModalOpened: false,
    modal_isUploadFileModalOpened: false,

  })

  const selectImage = ({ imageId }) => {

    const image = mediaManager.files.filter(f => f.id === imageId)[0]

    setSelectedImage(image)

    return image?.url
  }

  const selectFolder = ({ folderId }) => {
    getMediaManagerModelGraphQL({
      folderId,
    }).then(result => {
      const foldersFromServer = result.data.backendMediaManagerFolder_getMany
      const filesFromServer = result.data.backendMediaManagerFile_getMany
      // const breadCrumbs = result.data.backendMediaManagerFolder_getBreadCrumb

      setMediaManager(prevState => ({
        ...prevState,
        folders: foldersFromServer,
        files: filesFromServer,
        breadCrumbs: folderId ? result.data.backendMediaManagerFolder_getBreadCrumb : [],
      }))

      setSelectedFolderId(folderId)
      setSelectedImage(null)
    })
  }

  return (
    <SelectMediaManagerContext.Provider value={{
      mediaManager, setMediaManager,
      selectedImage, setSelectedImage,
      selectImage,
      selectFolder,
    }}>
      {children}
    </SelectMediaManagerContext.Provider>
  )
}

export default SelectMediaManagerProvider