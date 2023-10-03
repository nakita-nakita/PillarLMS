// libraries
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';

// mine
import InformationModal from '@/components/modals/Information.modal';

//mui
import TextField from '@mui/material/TextField';
import { postMediaManagerNewFolderGraphQL } from '../store/mediaManager-addFolder.store';
import { MediaManagerContext } from '../context/mediaManager.context';
import { getMediaManagerPageGraphQL } from '../store/mediaManager-getPage.store';


function NewFolderModal({ isOpened, onClose }) {
  const { mediaManager, setMediaManager } = useContext(MediaManagerContext)
  const router = useRouter();

  const [name, setName] = useState('')

  const handleSubmit = () => {
    postMediaManagerNewFolderGraphQL({
      name,
      folderId: router.query?.id,
    }).then(result => {

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
      header="Create a new folder."
      onSubmit={handleSubmit}
      submitLabel={"Create"}
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

export default NewFolderModal
