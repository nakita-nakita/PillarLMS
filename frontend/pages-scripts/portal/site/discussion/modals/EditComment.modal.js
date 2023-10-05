// libraries
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';

// mine
import InformationModal from '@/components/modals/Information.modal';
import { postSiteDesignerDiscussion_addOne_GraphQL } from '../store/DiscussionAdd.store';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';

//mui
import TextField from '@mui/material/TextField';
import { realtimeLink } from '@/utils/realtime/link';
import { postSiteDesignerDiscussion_updateOne_GraphQL } from '../store/DiscussionUpdate.store';
import { SiteDesignerDiscussionContext } from '../context/siteDesignerDiscussion.context';
import { postSiteDesignerDiscussionComment_updateOne_GraphQL } from '../store/DiscussionCommentUpdate.store';


function EditCommentModal({ isOpened, onClose, title, post, id }) {
  const { idChip, panelMeetingDoc, setPanelMeetingDoc } = useContext(AdminLayoutContext)
  const { siteDesignerDiscussion, setSiteDesignerDiscussion } = useContext(SiteDesignerDiscussionContext)

  
  const router = useRouter();

  const [postInput, setPostInput] = useState('')

  const handleSubmit = (event) => {
    postSiteDesignerDiscussionComment_updateOne_GraphQL({
      post: postInput,
      id: siteDesignerDiscussion.selectedCommentId
    })

    const newComments = [...siteDesignerDiscussion.comments]

    for (let i = 0; i < newComments.length; i++) {
      const comment = newComments[i];
      
      if (comment.id === siteDesignerDiscussion.selectedCommentId) {
        comment.post = postInput
        comment.hasBeenEdited = true

        break;
      }
    }

    setSiteDesignerDiscussion(prevState => ({
      ...prevState,
      comments: newComments
    }))

    onClose(event)
  }

  useEffect(() => {
    if (siteDesignerDiscussion.selectedCommentId) {
      for (let i = 0; i < siteDesignerDiscussion.comments.length; i++) {
        const comment = siteDesignerDiscussion.comments[i];
        if (comment.id === siteDesignerDiscussion.selectedCommentId) {

          setPostInput(comment.post)

          break;
        }
      }
    }
  }, [siteDesignerDiscussion])

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Edit your post."
      onSubmit={handleSubmit}
      submitLabel={"Edit"}
    >
      <br />

      <TextField
        id="outlined-basic"
        label="Content"
        variant="outlined"
        fullWidth
        value={postInput}
        rows={5}
        multiline
        onChange={(event) => setPostInput(event.target.value)}
      />
      <br />
    </InformationModal>
  )
}

// NewMeetingModal.propTypes = {
//   isOpened: PropTypes.boolean,
//   onClose: PropTypes.func,
// }

export default EditCommentModal
