// libraries
import React from 'react'
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

// mine
import InformationModal from '@/components/modals/Information.modal';
import { initSocket } from '@/utils/realtime/socket';

//mui
import AdminLayoutContext from '../../../adminLayout.context';


function EndMeetingModal({ isOpened, onClose }) {
  const adminLayoutContext = React.useContext(AdminLayoutContext)

  const handleSubmit = () => {
    const socket = initSocket()

    socket.emit('server-meeting-end', {
      meetingId: adminLayoutContext.panelMeetingDoc.id
    })

    onClose()
  }

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="End this meeting."
      onSubmit={handleSubmit}
      submitLabel={"End Meeting"}
    >
      <br />
      <p>Do you want to End this meeting? Everyone will exit meeting mode.</p>
      <br />
    </InformationModal>
  )
}

// EndMeetingModal.propTypes = {
//   isOpened: PropTypes.boolean,
//   onClose: PropTypes.func,
// }

export default EndMeetingModal
