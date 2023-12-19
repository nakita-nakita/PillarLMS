// libraries
import React, { useContext } from 'react'

// mine
import InformationModal from '@/components/modals/Information.modal';
import { SiteDesignerPageLoudSectionContext } from '../context/SiteDesignerPageLoudSection.context';

//mui
import TextField from '@mui/material/TextField';


function LoudSectionDeletionModal({ isOpened, onClose, onSubmit }) {
  const { nameInput, setNameInput, name, } = useContext(SiteDesignerPageLoudSectionContext)

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit()
    }

    if (onClose) {
      onClose()
    }
  }

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Delete LoudSection."
      onSubmit={handleSubmit}
      submitLabel={"Delete LoudSection"}
      disableSubmit={name !== nameInput}
    >
      <p>Please enter the section name "{name}" to delete it.</p>
      <br />
      <TextField
        id="outlined-basic"
        label="LoudSection Name"
        variant="outlined"
        fullWidth
        value={nameInput}
        onChange={(event) => setNameInput(event.target.value)}
      />
    </InformationModal>
  )
}

// MeetingChangeNameModal.propTypes = {
//   isOpened: PropTypes.boolean,
//   onClose: PropTypes.func,
// }

export default LoudSectionDeletionModal
