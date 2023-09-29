// libraries
import React from 'react'
import PropTypes from 'prop-types';

// mine
import InformationModal from '@/components/modals/Information.modal';
import { initSocket } from '@/utils/realtime/socket';

//mui
import AdminLayoutContext from '../../../adminLayout.context';
import UserChip from '@/components/chip/user.chip';


function MeetingKickUserModal({ isOpened, onClose }) {
  const { panelMeetingDoc } = React.useContext(AdminLayoutContext)

  const [id, setId] = React.useState("")
  const [callByType, setCallByType] = React.useState("")
  const [circleColor, setCircleColor] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [firstName, setFirstName] = React.useState("")
  const [labelColor, setLabelColor] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [picture, setPicture] = React.useState("")
  const [username, setUsername] = React.useState("")

  const handleSubmit = () => {
    const socket = initSocket()

    socket.emit('server-meeting-kick-user', {
      meetingId: panelMeetingDoc.id,
      userId: panelMeetingDoc.selectedUserId,
    })

    onClose()
  }

  React.useEffect(() => {
    if (panelMeetingDoc.selectedUserId) {
      const user = panelMeetingDoc.users.filter(s => s.id === panelMeetingDoc.selectedUserId)[0]
  
      setCallByType(user.callByType)
      setCircleColor(user.circleColor)
      setEmail(user.email)
      setFirstName(user.firstName)
      setId(user.id)
      setLabelColor(user.labelColor)
      setLastName(user.lastName)
      setPicture(user.picture)
      setUsername(user.username)
    }
  }, [panelMeetingDoc.selectedUserId])

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Kick user."
      onSubmit={handleSubmit}
      submitLabel={"Kick user"}
    >
      <br />
      <p>
        Would you like to kick this user from the meeting?
      </p>
      <br />
      <UserChip
        callByType={callByType}
        circleColor={circleColor}
        email={email}
        firstName={firstName}
        labelColor={labelColor}
        lastName={lastName}
        picturePreview={picture}
        username={username}
      />
    </InformationModal>
  )
}

// MeetingKickUserModal.propTypes = {
//   isOpened: PropTypes.boolean,
//   onClose: PropTypes.func,
// }

export default MeetingKickUserModal
