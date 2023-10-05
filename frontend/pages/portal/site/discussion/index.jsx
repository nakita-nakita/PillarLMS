'use client'

// Library
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';

// Mine
import AdminLayout from '@/layouts/admin/layout';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import tabsJson from '@/pages-scripts/portal/site/tabs.json';
import SiteDesignerDiscussionProvider, { SiteDesignerDiscussionContext } from '@/pages-scripts/portal/site/discussion/context/siteDesignerDiscussion.context';
import { getSiteDesignerDiscussion_getMany_GraphQL } from '@/pages-scripts/portal/site/discussion/store/DiscussionGetMany.store';
import FilterToggle from '@/pages-scripts/portal/site/discussion/components/filter.toggle';
import NewPostModal from '@/pages-scripts/portal/site/discussion/modals/NewPost.modal';
import PostCard from '@/pages-scripts/portal/site/discussion/components/post.card';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { realtimeLink } from '@/utils/realtime/link';

const DiscussionPage = () => {
  const router = useRouter()
  const { setTabs, idChip, panelMeetingDoc, setPanelMeetingDoc } = useContext(AdminLayoutContext)

  const { siteDesignerDiscussion, setSiteDesignerDiscussion } = useContext(SiteDesignerDiscussionContext)

  const [pageVar, setPageVar] = useState(1)
  const [pageSizeVar, setPageSizeVar] = useState(25)
  const [isLoaded, setIsLoaded] = useState(false)

  const initData = ({ type, page, pageSize }) => {
    getSiteDesignerDiscussion_getMany_GraphQL({ type, page, pageSize, }).then(result => {
      const posts = result.data.backendSiteDesignerDiscussion_getManyWithPagination?.rows || []
      setSiteDesignerDiscussion(prevState => ({
        ...prevState,
        posts,
      }))

      setIsLoaded(true)
    })
  }

  useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 0,
    }))

    setSiteDesignerDiscussion(prevState => ({
      ...prevState,
      posts: [],
      comments: [],
    }))

    initData({ type: "NEW", page: 1, pageSize: 25 })


  }, [])

  const handlePostFilter = (event, info) => {
    initData({ type: info.type, page: 1, pageSize: 25 })

    setPageVar(1)
  }

  const handleNewPost = () => {
    setSiteDesignerDiscussion(prevState => ({
      ...prevState,
      modal_isNewPostModalOpened: true,
    }))
  }

  const handlePostClick = (event, info) => {
    realtimeLink({
      to: `/portal/site/discussion/${info.id}`,
      meetingId: panelMeetingDoc.id,
      leaderUserId: panelMeetingDoc.leader?.id,
      router,
      setPanelMeetingDoc,
      userId: idChip.id,
    })

  }

  return (

    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto"
    }}>
      {isLoaded && (
        <>
          <Stack spacing={2} direction="row">
            <Button variant="contained" color="success" onClick={handleNewPost}>New</Button>
            <FilterToggle onChange={(event, info) => handlePostFilter(event, info)} />
          </Stack>
          <br />
          <br />
          {siteDesignerDiscussion.posts.length === 0 && (
            <p style={{ textAlign: "center" }}>Nothing here.</p>
          )}
          {siteDesignerDiscussion.posts.length !== 0 && siteDesignerDiscussion.posts.map(p => (
            <PostCard
              key={p.id}
              commentsCount={p.commentsCount}
              createdAt={p.createdAt}
              hasBeenEdited={p.hasBeenEdited}
              id={p.id}
              myVote={p.myVote}
              post={p.post}
              title={p.title}
              user={p.user}
              voteTotal={p.voteTotal}
              onClick={handlePostClick}
            />
          ))}
          {/* <PostCard /> */}
        </>
      )}
      <NewPostModal
        isOpened={siteDesignerDiscussion.modal_isNewPostModalOpened}
        onClose={() => {
          setSiteDesignerDiscussion(prevState => ({
            ...prevState,
            modal_isNewPostModalOpened: false,
          }))
        }}
      />
    </Box>
  )
}

DiscussionPage.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      <SiteDesignerDiscussionProvider>
        {page}
      </SiteDesignerDiscussionProvider>
    </AdminLayout>
  )
}

export default DiscussionPage