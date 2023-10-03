// libraries
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';

// mine
import InformationModal from '@/components/modals/Information.modal';
import { getMediaManagerPageGraphQL } from '../store/mediaManager-getPage.store';
import { postMediaManagerRenameFileGraphQL } from '../store/mediaManager-renameFile.store';
import { MediaManagerContext } from '../context/mediaManager.context';

//mui
import TextField from '@mui/material/TextField';


function RenameFileModal({ isOpened, onClose }) {
  const router = useRouter()
  const { mediaManager, setMediaManager } = useContext(MediaManagerContext)
  
  const [name, setName] = useState('')

  const handleSubmit = () => {
    postMediaManagerRenameFileGraphQL({
      id: mediaManager.selectedFileId,
      name,
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

  useEffect(() => {
    setName(mediaManager.selectFileName)
  }, [mediaManager])

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Rename file."
      onSubmit={handleSubmit}
      submitLabel={"Rename"}
    >
    <br />
    <TextField
      id="outlined-basic"
      label="File name"
      variant="outlined"
      fullWidth
      value={name}
      onChange={(event) => setName(event.target.value)}
    />
    </InformationModal>
  )
}

// NewMeetingModal.propTypes = {
//   isOpened: PropTypes.boolean,
//   onClose: PropTypes.func,
// }

export default RenameFileModal
