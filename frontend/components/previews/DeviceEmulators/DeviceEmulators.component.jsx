'use client'

import React, { useRef, useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function DeviceEmulator({ src }) {
  const iframeRef = useRef(null);
  const [selectedDevice, setSelectedDevice] = useState('laptop'); // Default to none selected
  const [deviceWidth, setDeviceWidth] = useState("1024px")

  const handleDeviceChange = (deviceType) => {
    setSelectedDevice(deviceType);  // Set the selected device

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
        iframeRef.current.style.width = '100%';
        setDeviceWidth("100%")
    }
  }

  return (
    <Container maxWidth="md" style={{ textAlign: 'center' }}>
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
          src={src}
          width="100%"
          height="100%"
          frameBorder="0"
        ></iframe>
      </Box>
    </Container>
  )
}

export default DeviceEmulator;
