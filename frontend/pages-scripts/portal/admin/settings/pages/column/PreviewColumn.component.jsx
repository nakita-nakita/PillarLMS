'use client'
// Libraries
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

// MUI
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PreviewChromeTab from '@/components/previews/ChromeTab/PreviewChromeTab.component';
import { SettingColumnContext } from './context/SettingColumn.context';

// ... (previous imports)

function PreviewColumnSelection({ selectedColumnSize = 800 }) {
  const theme = useTheme()
  const scaleDownRatio = 5;
  const scaledDownSize = selectedColumnSize / scaleDownRatio;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="50vh"
    >
      {/* Computer Monitor */}
      <Paper
        elevation={3}
        style={{
          width: '60vw',
          maxWidth: "500px",
          height: '25vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          backgroundColor: '#1a1a1a', // Adjust background color as needed
        }}
      >
        {/* Screen */}
        <Box
          width="90%"
          height="90%"
          border={1}
          borderRadius={2}
          borderColor="#000"
          bgcolor={theme.palette.grey[100]}
          display="flex"
          justifyContent="center" // Center the content horizontally
          alignItems="center" // Center the content vertically
        >
          {/* Center Column */}
          <Box
            width={`${scaledDownSize}px`} // Set the width based on the scaled size
            p={2} // Padding for the center column
            borderColor="#333"
            height="100%"
            bgcolor={theme.palette.grey[300]} // Background color for the center column
          >
            {/* Content goes here */}
            <Typography variant="body1">
              Your website content
            </Typography>
          </Box>
        </Box>

        {/* Stand */}
        <Box
          width="10%"
          height="10%"
          borderTop={1}
          position="absolute"
          bottom={-23}
          bgcolor="#1a1a1a"
        />
      </Paper>

      {/* Decorative elements for the stand */}
      <Box
        width="20vw"
        maxWidth="220px"
        height="2vh"
        mt={2}
        border={1}
        borderTop={0}
        borderColor="#333"
        bgcolor="#1a1a1a"
      />
      
      {/* Additional Description */}
      <Typography variant="body2" mt={2} color="textSecondary">
        Giant Desktop monitor at a 5:1 scale
      </Typography>
    </Box>
  );
}

export default PreviewColumnSelection;









