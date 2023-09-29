// libraries
import React from 'react'
import PropTypes from 'prop-types';

// mine
import InformationModal from '@/components/modals/Information.modal';


function NoMeetingModal({ isOpened, onClose }) {

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Meeting doesn't exist."
      // onSubmit={handleSubmit}
      disableSubmit
    >
      <br />
      <p>Sorry, but this meeting doesn't exist.</p>
      <br />

    </InformationModal>
  )
}

// NoMeetingModal.propTypes = {
//   isOpened: PropTypes.boolean,
//   onClose: PropTypes.func,
// }

export default NoMeetingModal
