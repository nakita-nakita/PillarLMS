// libraries
import React from 'react'
import PropTypes from 'prop-types';

// mine
import InformationModal from '@/components/modals/Information.modal';

//mui
import AdminLayoutContext from '../../../adminLayout.context';
import UserChip from '@/components/chip/user.chip';
import { useRouter } from 'next/router';


function RecievedUrlRequestModal({ isOpened, onClose }) {
  const router = useRouter()
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
    router.push(panelMeetingDoc.requestedUrl)
    // const socket = initSocket()

    // requestedUrl
    // socket.emit('server-meeting-kick-user', {
    //   meetingId: panelMeetingDoc.id,
    //   userId: panelMeetingDoc.selectedUserId,
    // })

    onClose()
  }

  React.useEffect(() => {
    if (panelMeetingDoc.recievedUrlRequestUserId) {
      const user = panelMeetingDoc.users.filter(s => s.id === panelMeetingDoc.recievedUrlRequestUserId)[0]

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
  }, [panelMeetingDoc.recievedUrlRequestUserId])

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="User in meeting navigation."
      onSubmit={handleSubmit}
      submitLabel={"Accept user navigation."}
    >
      <br />
      <p>
        This user has requested to navigate to a different page.
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

RecievedUrlRequestModal.propTypes = {
  isOpened: PropTypes.boolean,
  onClose: PropTypes.func,
}

export default RecievedUrlRequestModal
