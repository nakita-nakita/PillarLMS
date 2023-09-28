// libraries
import React from 'react'
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

// mine
import InformationModal from '@/components/modals/Information.modal';
import { initSocket } from '@/utils/realtime/socket';

//mui
import TextField from '@mui/material/TextField';


function NewMeetingModal({ isOpened, onClose }) {
  const router = useRouter();

  const [meetingName, setMeetingName] = React.useState('')

  const handleSubmit = () => {
    const socket = initSocket()

    socket.emit('server-meeting-start', {
      name: meetingName,
      url: router.pathname
    })

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
      <TextField
        id="outlined-basic"
        label="Meeting Name"
        variant="outlined"
        fullWidth
        value={meetingName}
        onChange={(event) => setMeetingName(event.target.value)}
      />
    </InformationModal>
  )
}

NewMeetingModal.propTypes = {
  isOpened: PropTypes.boolean,
  onClose: PropTypes.func,
}

export default NewMeetingModal
