// libraries
import React from 'react'
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

// mine
import InformationModal from '@/components/modals/Information.modal';
import { initSocket } from '@/utils/realtime/socket';

//mui
import TextField from '@mui/material/TextField';
import AdminLayoutContext from '../../../adminLayout.context';


function HangUpModal({ isOpened, onClose }) {
  const adminLayoutContext = React.useContext(AdminLayoutContext)

  const handleSubmit = () => {
    const socket = initSocket()

    socket.emit('server-meeting-hang-up', {
      meetingId: adminLayoutContext.panelMeetingDoc.id
    })

    onClose()
  }

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Leave this meeting."
      onSubmit={handleSubmit}
      submitLabel={"Hang Up"}
    >
      <br />
      <p>Do you want to leave this meeting?</p>
      <br />
    </InformationModal>
  )
}

// HangUpModal.propTypes = {
//   isOpened: PropTypes.boolean,
//   onClose: PropTypes.func,
// }

export default HangUpModal
