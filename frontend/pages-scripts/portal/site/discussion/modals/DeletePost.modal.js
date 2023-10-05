// libraries
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';

// mine
import InformationModal from '@/components/modals/Information.modal';
import { enqueueSnackbar } from 'notistack';
import { SiteDesignerDiscussionContext } from '../context/siteDesignerDiscussion.context';
import { postSiteDesignerDiscussion_deleteOne_GraphQL } from '../store/DiscussionDelete.store';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { realtimeLink } from '@/utils/realtime/link';

//mui


function DeletePostModal({ isOpened, onClose }) {
  const router = useRouter()
  const { siteDesignerDiscussion, setSiteDesignerDiscussion } = useContext(SiteDesignerDiscussionContext)
  const { setTabs, idChip, panelMeetingDoc, setPanelMeetingDoc } = useContext(AdminLayoutContext)

  const [title, setTitle]= useState("")
  const [post, setPost] = useState("")

  const handleSubmit = (event) => {
    postSiteDesignerDiscussion_deleteOne_GraphQL({
      id: siteDesignerDiscussion.selectedPostId
    }).then(result => {
      if (result.errors === undefined) {
        const newPosts = [...siteDesignerDiscussion.posts]

        for (let i = 0; i < newPosts.length; i++) {
          const post = newPosts[i];

          if (post.id === siteDesignerDiscussion.selectedPostId) {

            newPosts.splice(i, 1)

            setSiteDesignerDiscussion(prevState => ({
              ...prevState,
              posts: newPosts
            }))
            break;
          }
        }

        enqueueSnackbar("Discussion deleted.")
        navigatteToDiscussions()

      } else {

        enqueueSnackbar("DISCUSSION DID NOT DELETE! Please message IT.")
      }
    })
    onClose(event)
  }

  const navigatteToDiscussions = (event, info) => {
    realtimeLink({
      to: `/portal/site/discussion/`,
      meetingId: panelMeetingDoc.id,
      leaderUserId: panelMeetingDoc.leader?.id,
      router,
      setPanelMeetingDoc,
      userId: idChip.id,
    })
  }

  useEffect(() => {
    if (siteDesignerDiscussion.selectedPostId) {
      for (let i = 0; i < siteDesignerDiscussion.posts.length; i++) {
        const post = siteDesignerDiscussion.posts[i];

        if (post.id === siteDesignerDiscussion.selectedPostId) {
          setPost(post.post)
          setTitle(post.title)
          break;
        }
      }
    }
  }, [siteDesignerDiscussion])

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Delete this discussion."
      onSubmit={handleSubmit}
      submitLabel={"Delete"}
    >
      <br />
      <p>Would you like to delete this discussion?</p>
      <br />
      <h2>{title}</h2>
      <br />
      {post}
      <br />
    </InformationModal>
  )
}

// NewMeetingModal.propTypes = {
//   isOpened: PropTypes.boolean,
//   onClose: PropTypes.func,
// }

export default DeletePostModal
