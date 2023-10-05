// libraries
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';

// mine
import InformationModal from '@/components/modals/Information.modal';
import { postSiteDesignerDiscussion_addOne_GraphQL } from '../store/DiscussionAdd.store';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';

//mui
import TextField from '@mui/material/TextField';
import { realtimeLink } from '@/utils/realtime/link';


function NewPostModal({ isOpened, onClose }) {
  const { idChip, panelMeetingDoc, setPanelMeetingDoc } = useContext(AdminLayoutContext)
  const router = useRouter();

  const [title, setTitle] = useState('')
  const [post, setPost] = useState('')

  const handleSubmit = () => {
    postSiteDesignerDiscussion_addOne_GraphQL({
      post,
      title,
    }).then(result => {
      //change page with realTimeLink
      const newConvo = result.data.backendSiteDesignerDiscussion_addOne
      realtimeLink({
        to: `/portal/site/discussion/${newConvo.id}`,
        meetingId: panelMeetingDoc.id,
        leaderUserId: panelMeetingDoc.leader?.id,
        router,
        setPanelMeetingDoc,
        userId: idChip.id,
      })
    })
    onClose()
  }

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Create a new post."
      onSubmit={handleSubmit}
      submitLabel={"Create"}
    >
      <br />
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <br />
      <br />

      <TextField
        id="outlined-basic"
        label="Content"
        variant="outlined"
        fullWidth
        value={post}
        rows={5}
        multiline
        onChange={(event) => setPost(event.target.value)}
      />
      <br />
    </InformationModal>
  )
}

// NewMeetingModal.propTypes = {
//   isOpened: PropTypes.boolean,
//   onClose: PropTypes.func,
// }

export default NewPostModal
