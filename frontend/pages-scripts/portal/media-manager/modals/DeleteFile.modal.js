// libraries
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';

// mine
import InformationModal from '@/components/modals/Information.modal';
import { postMediaManagerDeleteFileGraphQL } from '../store/mediaManager-deleteFile.store';
import { MediaManagerContext } from '../context/mediaManager.context';
import { getMediaManagerPageGraphQL } from '../store/mediaManager-getPage.store';

//mui


function DeleteFileModal({ isOpened, onClose }) {
  const router = useRouter()
  const { mediaManager, setMediaManager } = useContext(MediaManagerContext)

  const handleSubmit = () => {
    postMediaManagerDeleteFileGraphQL({
      id: mediaManager.selectedFileId,
      folderId: router.query.id,
    }).then(() => {

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

    })

    onClose()
  }

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Delete file."
      onSubmit={handleSubmit}
      submitLabel={"Delete"}
    >
      <br />
      <p>Would you like to delete this file?</p>
      <br />
      <p>"{mediaManager.selectFileName}"</p>
      <br />
    </InformationModal>
  )
}

// NewMeetingModal.propTypes = {
//   isOpened: PropTypes.boolean,
//   onClose: PropTypes.func,
// }

export default DeleteFileModal
