// libraries
import React from 'react'
import PropTypes from 'prop-types';

// mine
import InformationModal from '@/components/modals/Information.modal';
import { initSocket } from '@/utils/realtime/socket';

//mui
import TextField from '@mui/material/TextField';
import AdminLayoutContext from '../../../adminLayout.context';


function MeetingChangeNameModal({ isOpened, onClose }) {
  const { panelMeetingDoc } = React.useContext(AdminLayoutContext)

  const [meetingName, setMeetingName] = React.useState(panelMeetingDoc.name || '')

  const handleSubmit = () => {
    const socket = initSocket()

    console.log('meeting-name',
      {
        name: meetingName,
        meetingId: panelMeetingDoc.id
      }
    )

    socket.emit('server-meeting-change-name', {
      name: meetingName,
      meetingId: panelMeetingDoc.id,
    })

    onClose()
  }

  React.useEffect(() => {
    setMeetingName(panelMeetingDoc.name)
  }, [panelMeetingDoc])

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Change meeting name."
      onSubmit={handleSubmit}
      submitLabel={"Change name"}
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

MeetingChangeNameModal.propTypes = {
  isOpened: PropTypes.boolean,
  onClose: PropTypes.func,
}

export default MeetingChangeNameModal
