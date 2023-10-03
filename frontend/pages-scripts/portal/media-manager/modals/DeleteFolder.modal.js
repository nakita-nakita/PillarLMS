// libraries
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';

// mine
import InformationModal from '@/components/modals/Information.modal';
import { postMediaManagerDeleteFolderGraphQL } from '../store/mediaManager-deleteFolder.store';
import { MediaManagerContext } from '../context/mediaManager.context';
import { getMediaManagerPageGraphQL } from '../store/mediaManager-getPage.store';

//mui


function DeleteFolderModal({ isOpened, onClose }) {
  const router = useRouter()
  const { mediaManager, setMediaManager } = useContext(MediaManagerContext)

  const handleSubmit = () => {
    postMediaManagerDeleteFolderGraphQL({
      id: mediaManager.selectedFolderId,
      folderId: router.query?.id,
    }).then(postResult => {

      if (!postResult.errors) {

        getMediaManagerPageGraphQL({
          folderId: router.query?.id,
        }).then(result => {
          const foldersFromServer = result.data.backendMediaManagerFolder_getMany
          const filesFromServer = result.data.backendMediaManagerFile_getMany

          setMediaManager(prevState => ({
            ...prevState,
            files: filesFromServer,
            folders: foldersFromServer
          }))
        })
      } else {
        setMediaManager(prevState => ({
          ...prevState,
          modal_isDeleteFolderModalOpened: false,
          modal_isDeleteFolderFailedModalOpened: true,
        }))
      }

    })

    onClose()
  }

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Delete Folder"
      onSubmit={handleSubmit}
      submitLabel={"Delete"}
    >
      <br />
      <p>Would you like to delete this folder?</p>
      <br />
      <p>"{mediaManager.selectFolderName}"</p>
      <br />
    </InformationModal>
  )
}

// NewMeetingModal.propTypes = {
//   isOpened: PropTypes.boolean,
//   onClose: PropTypes.func,
// }

export default DeleteFolderModal
