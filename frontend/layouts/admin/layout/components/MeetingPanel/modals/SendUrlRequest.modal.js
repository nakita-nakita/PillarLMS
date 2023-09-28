// libraries
import React from 'react'
import PropTypes from 'prop-types';

// mine
import InformationModal from '@/components/modals/Information.modal';
import { initSocket } from '@/utils/realtime/socket';

//mui
import TextField from '@mui/material/TextField';
import AdminLayoutContext from '../../../adminLayout.context';


function SendUrlRequestModal({ isOpened, onClose }) {
  const { panelMeetingDoc } = React.useContext(AdminLayoutContext)

  const [meetingName, setMeetingName] = React.useState(panelMeetingDoc.name || '')

  const handleSubmit = () => {
    const socket = initSocket()

      socket.emit('server-meeting-request-url-change', {
        meetingId: panelMeetingDoc.id,
        url: panelMeetingDoc.sendRequestedUrl
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
      header="Ask leader to change page."
      onSubmit={handleSubmit}
      submitLabel={"Change name"}
    >
      <br />
      <p>Would you like to ask the meeting leader to change the page?</p>
      <br />
    </InformationModal>
  )
}

SendUrlRequestModal.propTypes = {
  isOpened: PropTypes.boolean,
  onClose: PropTypes.func,
}

export default SendUrlRequestModal
