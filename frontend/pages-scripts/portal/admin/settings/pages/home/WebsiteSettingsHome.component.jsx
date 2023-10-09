import React from 'react'
import Box from '@mui/material/Box';
import PublishNoticeCard from '../../components/HomeView/PublishNoticeCard.component';

function WebsiteSettingsHome() {
  return (

    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto",
      padding: "20px",
      minHeight: "350px",
    }}>
      <PublishNoticeCard />
    </Box>
  )
}

export default WebsiteSettingsHome