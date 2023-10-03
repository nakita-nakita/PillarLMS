// Libraries
import React from 'react'

export const MediaManagerContext = React.createContext();

export function MediaManagerProvider({ children }) {

  const [mediaManager, setMediaManager] = React.useState({
    
    //use for selecting items in drop downs
    selectedFolderId: null,
    selectedFileId: null,

    selectFolderName: "",
    selectFileName: "",

    // if the page is on a folder
    selectedFolderId: null,

    // ui
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

  return (
      <MediaManagerContext.Provider value={{
        mediaManager, setMediaManager,
      }}>
          {children}
       </MediaManagerContext.Provider>
  )
}

export default MediaManagerProvider