'use client'

import React, { useRef, useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTheme } from '@mui/material';

function DiamondDeviceEmulator({ src }) {
  const theme = useTheme()

  const iframeRef = useRef(null);
  const [selectedDevice, setSelectedDevice] = useState('mobile'); // Default to none selected
  const [deviceWidth, setDeviceWidth] = useState("375px");
  const [mode, setMode] = useState('day'); // Default mode is 'day'

  const handleDeviceChange = (deviceType) => {
    setSelectedDevice(deviceType);

    switch (deviceType) {
      case 'laptop':
        iframeRef.current.style.width = '1024px';
        setDeviceWidth("1024px")
        break;
      case 'tablet':
        iframeRef.current.style.width = '768px';
        setDeviceWidth("768px")
        break;
      case 'mobile':
        iframeRef.current.style.width = '375px';
        setDeviceWidth("375px")
        break;
      default:
        iframeRef.current.style.width = '375px';
        setDeviceWidth("375px")
    }
  }

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'day' ? 'night' : 'day'));
  }

  const getIframeSrc = () => {
    return `${src}&mode=${mode}`;
  }



  return (
    <Container style={{ textAlign: 'center' }}>
      <ButtonGroup variant="contained" style={{ margin: '20px auto' }}>
        <Button
          onClick={() => handleDeviceChange('laptop')}
          style={{ backgroundColor: selectedDevice === 'laptop' ? undefined : 'white', color: selectedDevice === 'laptop' ? 'white' : 'black' }}
        >
          Laptop
        </Button>
        <Button
          onClick={() => handleDeviceChange('tablet')}
          style={{ backgroundColor: selectedDevice === 'tablet' ? undefined : 'white', color: selectedDevice === 'tablet' ? 'white' : 'black' }}
        >
          Tablet
        </Button>
        <Button
          onClick={() => handleDeviceChange('mobile')}
          style={{ backgroundColor: selectedDevice === 'mobile' ? undefined : 'white', color: selectedDevice === 'mobile' ? 'white' : 'black' }}
        >
          Mobile
        </Button>
      </ButtonGroup>







      <Button
        variant="contained"
        color={mode === 'night' ? 'night' : 'day'}
        onClick={toggleMode}
        sx={{
          marginLeft: '22px',
          color: mode === 'night' ? theme.palette.getContrastText(theme.palette.night.main) : theme.palette.getContrastText(theme.palette.day.main)
        }}
      >
        Dark Mode
      </Button>
      {/* <span style={{ marginLeft: "22px" }}>
        <FormControlLabel
          control={
            <Switch checked={mode === 'night'} onChange={toggleMode} />
          }
          label="Dark Mode"
        />
      </span> */}
      <div style={{
        overflow: "auto"
      }}>

        <Box
          mt={2}
          border={5}
          borderColor="black"
          borderRadius={2}
          overflow="hidden"
          mx="auto"
          style={{ height: '400px', width: deviceWidth }}
        >
          <iframe
            ref={iframeRef}
            title="device-emulator"
            src={getIframeSrc()}
            width="100%"
            height="100%"
            frameBorder="0"
          ></iframe>
        </Box>
      </div>
    </Container>
  )
}

export default DiamondDeviceEmulator;
