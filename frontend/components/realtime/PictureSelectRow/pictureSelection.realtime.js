'use client';

import React, { useContext, useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import UserChip from '@/components/chip/user.chip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import { initSocket } from '@/utils/realtime/socket';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';

function RealTimePictureSelectionRow({ data, entity, onChange, onFileSubmit }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { idChip } = useContext(AdminLayoutContext)

  // components
  const [tabValue, setTabValue] = useState("NO_IMAGE");
  const [selectedFile, setSelectedFile] = useState(null);

  //showing current state
  const [currentSelection, setCurrentSelection] = useState()

  // uploads
  const [uploads, setUploads] = useState([])


  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);

    const socket = initSocket()

    socket.emit('server-samedoc-picture-selection-change', {
      entity,
      name: data.name,
      selection: newValue,
    })
  };

  const handleFileChange = (event) => {
    // const file = event.target.files[0];
    // setSelectedFile(file);

    if (onFileSubmit) {
      onFileSubmit(event).then(result => {
        setUploads(prevState => [...prevState, {
          picture: result.data.picture,
          user: { ...idChip },
        }])
        setTabValue(result.data.picture)

      })
    }
  };

  useEffect(() => {
    if (onChange) {
      if (tabValue === "NO_IMAGE") {
        onChange(null)
      } else if (tabValue === "CURRENT_IMAGE") {
        onChange(undefined)
      } else {
        onChange(tabValue)
      }
    }
  }, [tabValue])

  useEffect(() => {

    if (data?.selection) {
      setTabValue(data.selection)
    }

    if (data?.currentSelection?.picture) {
      console.log('data?.currentSelection?.picture', data?.currentSelection?.picture)
      setCurrentSelection(data.currentSelection)
    }

    setUploads(data.uploads)

    const socket = initSocket()


    socket.on("samedoc-picture-selection-change", result => {
      if (result.entity === entity && result.name === data.name) {
        setTabValue(result.selection)
      }
    })

    socket.on('samedoc-upload-picture-change', result => {
      if (result.entity === entity && result.name === data.name) {
        setUploads(prevState => [...prevState, result])
        setTabValue(result.picture)
      }
    })

    return () => {
      socket.off("samedoc-picture-selection-change")
      socket.off('samedoc-upload-picture-change')
    }

  }, [])

  return (
    <ListItem>
      <Box display="flex" flexDirection={isMobile ? "column" : "row"} width="100%">
        {/* Image Upload Button and Tabs */}
        <Box
          flex="0 0 auto"
          minHeight={isMobile ? 'auto' : 'calc((48px * 4) + 45px)'}
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          mb={isMobile ? 2 : 0}
          mr={!isMobile ? 2 : 0}
        >
          <Button
            variant="contained"
            color='secondary'
            component="label"
            fullWidth
            style={{ marginBottom: '10px' }}
          >
            Upload File
            <input
              name="file"
              id="file"
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          <Tabs
            orientation="vertical"
            value={tabValue}
            onChange={handleTabChange}
            aria-label="Vertical tabs"
            variant="scrollable"
            indicatorColor="primary"
            textColor="primary"
            sx={{
              p: 0,
              m: 0,
              ".Mui-selected": {
                border: `3px solid ${theme.palette.primary.main}`,
                px: 2,
                borderRadius: "10px",
                width: "100%",
                m: 0,
              }
            }}
          >
            <Tab
              label="No Image"
              value="NO_IMAGE"
            />
            {currentSelection && (
              <Tab
                label="Current Image"
                value="CURRENT_IMAGE"

              />
            )}
            {uploads.length > 0 && uploads.map((upload) => (
              <Tab
                label={(
                  <UserChip
                    displayName={upload.user.displayName}
                    picturePreview={upload.user.picture}
                    labelColor={upload.user.labelColor}
                    circleColor={upload.user.circleColor}
                    callByType={upload.user.callByType}
                    email={upload.user.email}
                    firstName={upload.user.firstName}
                    lastName={upload.user.lastName}
                    username={upload.user.username}
                  />
                )}
                value={upload.picture}
              />
            ))}
            {/* Uncomment and modify the UserChip section for actual user pictures */}
            {/* {userPictures.map((picture, index) => (
                <UserChip
                  key={index}
                  picturePreview={picture.src}
                  circleColor={picture.circleColor}
                  labelColor={picture.labelColor}
                  callByType={picture.callByType}
                  email={picture.email}
                  firstName={picture.firstName}
                  lastName={picture.lastName}
                  username={picture.username}
                  displayName={picture.displayName}
                />
              ))} */}
          </Tabs>
        </Box>

        {/* Tabs Content View */}
        <Box flex="1" display="flex" alignItems="center" justifyContent="center" p={2} bgcolor={theme.palette.grey[200]}>
          {tabValue === "NO_IMAGE" && <img src={"/no-image/8_Bit_Dinosaur_With_Laptop.png"} alt="No Image Placeholder" style={{ width: "150px" }} />}
          {tabValue === "CURRENT_IMAGE" && currentSelection && <img src={`${process.env.NEXT_PUBLIC_WEB_API_URL}${currentSelection.picture}`} alt="Current Image Placeholder" style={{ width: isMobile ? '100%' : 'auto', maxHeight: '100%' }} />}

          {uploads.length > 0 && uploads.map((upload, i) => {

            return (
              <>
                {tabValue === upload.picture && <img alt={`Logo-${i + 1}`} src={`${process.env.NEXT_PUBLIC_WEB_API_URL}${upload.picture}`} style={{ width: isMobile ? '100%' : 'auto', maxHeight: '100%' }} />}
              </>
            )
          })}
          {/* Add other tab views as required */}
        </Box>
      </Box>
    </ListItem>
  );
}

export default RealTimePictureSelectionRow;
