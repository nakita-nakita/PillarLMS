// libraries
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';

// mine
import InformationModal from '@/components/modals/Information.modal';
import { MediaManagerContext } from '../context/mediaManager.context';
import { postMediaManagerRestoreFileGraphQL } from '../store/mediaManager-restoreTrashedFile.store copy';
import { getMediaManagerTrashedPageGraphQL } from '../store/mediaManager-getTrashedPage.store';

//mui


function RestoreFileModal({ isOpened, onClose }) {
  const router = useRouter()
  const { mediaManager, setMediaManager } = useContext(MediaManagerContext)

  const handleSubmit = () => {
    postMediaManagerRestoreFileGraphQL({
      id: mediaManager.selectedFileId,
    }).then(() => {

      // if in trash view, refresh to show it is out of the trash.
      if (router.pathname === "/portal/media-manager/trash") {

        getMediaManagerTrashedPageGraphQL().then(result => {
          const files = result.data.backendMediaManagerFile_viewTrash

          setMediaManager(prevState => ({
            ...prevState,
            files,
          }))
        })
      }
    })

    onClose()
  }

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Restore file."
      onSubmit={handleSubmit}
      submitLabel={"Restore"}
    >
      <br />
      <p>Would you like to restore this file?</p>
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

export default RestoreFileModal
