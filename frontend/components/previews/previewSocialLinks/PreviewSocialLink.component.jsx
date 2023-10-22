'use client'

import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function PreviewSocialLink({ titleValue, descriptionValue, imageValue }) {
  return (
    <Box
      p={2}
      bgcolor="white"
      display="flex"
      flexDirection="column"
    >
      {/* Messages */}
      <Box display="flex" flexDirection="column">
        {/* Message from "them" */}
        <Box mb={2} p={1} bgcolor="blue" color="white" borderRadius={3} alignSelf="flex-start">
          Can you send me a cool link?
        </Box>
        {/* Message from "us" with link preview */}
        <Box p={1} bgcolor="grey.100" borderRadius={3} alignSelf="flex-end">
          Sure! Check this out:
          <Box mt={1} border={1} borderColor="grey.400" borderRadius={2}>
            <img
              src={imageValue ? `${process.env.NEXT_PUBLIC_WEB_API_URL}${imageValue}` : "https://via.placeholder.com/150"}
              alt="Preview"
              style={{ width: '100%', borderTopLeftRadius: '2px', borderTopRightRadius: '2px' }}
            />
            <Box p={1}>
              <strong>{titleValue || "Title of the Link"}</strong>
              <p>{descriptionValue || "Short description of the link..."}</p>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Message input */}
      <Box mt={2} display="flex">
        <TextField fullWidth variant="outlined" size="small" placeholder="Type a message..." />
        <Button variant="contained" color="primary" style={{ marginLeft: '8px' }}>
          Send
        </Button>
      </Box>
    </Box>
  )
}

export default PreviewSocialLink;
