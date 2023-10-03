// libraries
import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

// mine
import InformationModal from '@/components/modals/Information.modal';
import { postMediaManagerRenameFolderGraphQL } from '../store/mediaManager-renameFolder.store';
import { MediaManagerContext } from '../context/mediaManager.context';

//mui
import TextField from '@mui/material/TextField';
import { getMediaManagerPageGraphQL } from '../store/mediaManager-getPage.store';


function RenameFolderModal({ isOpened, onClose }) {
  const router = useRouter()
  const { mediaManager, setMediaManager } = useContext(MediaManagerContext)
  
  const [name, setName] = React.useState('')

  const handleSubmit = () => {
    postMediaManagerRenameFolderGraphQL({
      id: mediaManager.selectedFolderId,
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
    setName(mediaManager.selectFolderName)
  }, [mediaManager])

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Rename Folder"
      onSubmit={handleSubmit}
      submitLabel={"Rename"}
    >
      <br />
      <TextField
        id="outlined-basic"
        label="Folder name"
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

export default RenameFolderModal
