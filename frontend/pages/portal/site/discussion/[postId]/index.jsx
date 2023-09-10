'use client'

//Library
import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router'

// Mine
import tabsJson from '@/pages-scripts/portal/site/tabs.json';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';
import PostCard from '@/pages-scripts/portal/site/discussion/[postId]/post.card';
import ReplyCard from '@/pages-scripts/portal/site/discussion/[postId]/reply.card';
import InputCard from '@/pages-scripts/portal/site/discussion/[postId]/input.card';

// MUI
import Box from '@mui/material/Box';

// Icons
import FastRewindIcon from '@mui/icons-material/FastRewind';


const DiscussionPage = () => {
  const { setTabs } = React.useContext(AdminLayoutContext)
  const router = useRouter();

  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 0,
    }))

  }, [])

  return (

    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto"
    }}>
      <Link href="/portal/site/discussion/">

        <Box
          sx={{
            flexGrow: 3,
          }}>
          <FastRewindIcon sx={{ m: "10px 10px 10px 0" }} />
          <span
            style={{
              display: "ruby-text-container",
            }}
          >
            Back
          </span>
        </Box>
      </Link>
      <PostCard />
      <br />
      {/* <br /> */}
      <ReplyCard />
      <br />
      <InputCard />
    </Box>
  )
}

DiscussionPage.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

export default DiscussionPage