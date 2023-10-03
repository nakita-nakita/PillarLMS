// libraries
import React from 'react'
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

// mine
import InformationModal from '@/components/modals/Information.modal';
import { initSocket } from '@/utils/realtime/socket';

//mui
import TextField from '@mui/material/TextField';


function DeleteFolderFailedModal({ isOpened, onClose }) {

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      disableSubmit
      header="Cannot Delete Folder."
      submitLabel={"Ok"}
    >
      <br />
      <p>You can not delete a folder that has a file in it.</p>
      <br />
    </InformationModal>
  )
}

// NewMeetingModal.propTypes = {
//   isOpened: PropTypes.boolean,
//   onClose: PropTypes.func,
// }

export default DeleteFolderFailedModal
