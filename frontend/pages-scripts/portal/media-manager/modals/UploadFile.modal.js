// libraries
import React, { useContext } from 'react'
import { useRouter } from 'next/router';

// mine
import InformationModal from '@/components/modals/Information.modal';
import uploaderUtil from '@/utils/uploader/callUploaderApi';
import { MediaManagerContext } from '../context/mediaManager.context';
import { getMediaManagerPageGraphQL } from '../store/mediaManager-getPage.store';

//mui
import Button from '@mui/material/Button';


function UploadFileModal({ isOpened, onClose }) {
  const router = useRouter()
  const { mediaManager, setMediaManager } = useContext(MediaManagerContext)


  const handleSubmit = (event) => {

    const data = new FormData(event.currentTarget);

    if (data.get('picture')) {

      uploaderUtil.postMediaManager({
        file: data.get('picture'),
        folderId: router.query?.id,
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
    }

    onClose()
  }

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Start new meeting."
      onSubmit={handleSubmit}
      submitLabel={"Start"}
    >
      <br />
      <Button
        variant="contained"
        component="label"
      >
        Upload File
        <input
          id="picture"
          name="picture"
          type="file"
          hidden
        />
      </Button>
    </InformationModal>
  )
}

// NewMeetingModal.propTypes = {
//   isOpened: PropTypes.boolean,
//   onClose: PropTypes.func,
// }

export default UploadFileModal
