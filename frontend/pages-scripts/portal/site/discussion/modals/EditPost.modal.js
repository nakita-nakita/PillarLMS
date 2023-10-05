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


function EditPostModal({ isOpened, onClose, title, post, id }) {
  const { idChip, panelMeetingDoc, setPanelMeetingDoc } = useContext(AdminLayoutContext)
  const { siteDesignerDiscussion, setSiteDesignerDiscussion } = useContext(SiteDesignerDiscussionContext)

  
  const router = useRouter();

  const [titleInput, setTitleInput] = useState('')
  const [postInput, setPostInput] = useState('')

  const handleSubmit = (event) => {
    postSiteDesignerDiscussion_updateOne_GraphQL({
      post: postInput,
      title: titleInput,
      id: siteDesignerDiscussion.selectedPostId
    })

    const newPosts = [...siteDesignerDiscussion.posts]

    for (let i = 0; i < newPosts.length; i++) {
      const post = newPosts[i];
      console.log('post', post )
      
      if (post.id === id) {
        post.title = titleInput
        post.post = postInput
        post.hasBeenEdited = true

        break;
      }
    }

    setSiteDesignerDiscussion(prevState => ({
      ...prevState,
      posts: newPosts
    }))

    onClose(event)
  }

  useEffect(() => {
    setTitleInput(title)
    setPostInput(post)
  }, [])

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
        label="Title"
        variant="outlined"
        fullWidth
        value={titleInput}
        onChange={(event) => setTitleInput(event.target.value)}
      />
      <br />
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

export default EditPostModal
