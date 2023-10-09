'use client'

import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';

function PreviewChromeTab({ title, faviconUrl, url = "Your organization" }) {
  return (
    <Paper elevation={3} style={{ borderRadius: '8px 8px 0 0', background: '#e9ecef' }}>
      {/* Tab Header */}
      <Box display="flex" alignItems="center" padding="4px" bgcolor="#d5d9df" borderRadius="8px 8px 0 0" width="300px">
        
        {/* Favicon */}
        <Box bgcolor="white" padding="4px" borderRadius="4px" marginRight="8px">
          {/* <img src={faviconUrl} alt="favicon" width="16" height="16" /> */}
          
        <StarIcon />
        </Box>

        {/* Tab Title */}
        <Box fontSize="14px" color="#5a5d61" fontWeight="500" flexGrow={1} overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
          Home - {url}
        </Box>

        {/* Close Tab Icon */}
        <Box color="#5a5d61">
          <IconButton size="small" style={{ padding: '5px' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Tab Navigation */}
      <Box display="flex" alignItems="center" padding="4px" bgcolor="#f3f4f6">
        <IconButton size="small">
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
        <Input style={{ flexGrow: 1 }} />
        <Button variant="contained" size="small" style={{ marginLeft: '8px' }}>
          Go
        </Button>
      </Box>
    </Paper>
  );
}

export default PreviewChromeTab;
