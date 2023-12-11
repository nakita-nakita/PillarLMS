'use client';

import React, { useCallback, useContext, useEffect, useState } from 'react';
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
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SelectMediaModal from './modal/Media.modal';

function RealTimeMediaSelectionRow({ data, entity, onChangeByUser, onChange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { idChip } = useContext(AdminLayoutContext)

  const [isLoaded, setIsLoaded] = useState(false)

  // components
  const [tabValue, setTabValue] = useState("NO_MEDIA");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpened, setIsModalOpened] = useState(false)

  //showing current state
  const [currentSelection, setCurrentSelection] = useState()

  // uploads
  const [uploads, setUploads] = useState([])


  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);

    const socket = initSocket()

    socket.emit('server-samedoc-media-selection-change', {
      entity,
      name: data.name,
      selection: newValue,
    })

    
    if (onChangeByUser) {
      if (newValue === "NO_MEDIA") {
        onChangeByUser({
          type: "NONE",
        })
      } else if (newValue === "CURRENT_MEDIA") {
        onChangeByUser({
          type: "BUILT_IN",
          url: currentSelection.media
        })

      } else {
        onChangeByUser({
          type: "BUILT_IN",
          url: newValue
        })
      }
    }
  };

  const handleMediaSelection = (mediaObj) => {
    let socket = initSocket();

    socket.emit("server-samedoc-update-media", {
      entity,
      name: data.name,
      media: mediaObj.url,
    })

    const hasAlreadyBeenUploaded = uploads.filter(u => u.media === mediaObj.url)[0]

    if (hasAlreadyBeenUploaded) {
      setTabValue(mediaObj.url)
    } else {
      setUploads(prevState => [...prevState, {
        media: mediaObj.url,
        user: { ...idChip },
      }])
      setTabValue(mediaObj.url)
    }

    
    if (onChangeByUser) {
      onChangeByUser({
        type: "BUILT_IN",
        url: mediaObj.url
      })
    }


  }

  const handleUpload = useCallback((result) => {

    if (result.media.substring(0, 20) === '/resources/medias/') {
      const hasAlreadyBeenUploaded = uploads.filter(u => u.media === result.media)[0]

      if (hasAlreadyBeenUploaded) {
        setTabValue(result.media)

      } else {
        setUploads(prevState => [...prevState, result])
        setTabValue(result.media)
      }

    } else if (result.entity === entity && result.name === data.name) {
      setUploads(prevState => [...prevState, result])
      setTabValue(result.media)
    }

  }, [uploads])

  const handleSelection = useCallback((result) => {
    if (result.entity === entity && result.name === data.name) {
      setTabValue(result.selection)
    }
  }, [])

  useEffect(() => {
    if (onChange) {
      if (tabValue === "NO_MEDIA") {
        onChange(null)
      } else if (tabValue === "CURRENT_MEDIA") {
        onChange(undefined)
      } else {
        onChange(tabValue)
      }
    }
  }, [tabValue])

  useEffect(() => {
    if (!isLoaded) {

      if (data?.selection) {
        setTabValue(data.selection)
      }

      if (data?.currentSelection?.media) {
        setCurrentSelection(data.currentSelection)
        setTabValue("CURRENT_MEDIA")
      }

      if (data?.uploads) {
        setUploads(data.uploads)
      }

      setIsLoaded(true)
    }

    const socket = initSocket()


    socket.on("samedoc-media-selection-change", handleSelection)
    socket.on('samedoc-upload-media-change', handleUpload)

    return () => {
      socket.off("samedoc-media-selection-change")
      socket.off('samedoc-upload-media-change')
    }

  }, [uploads])

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
            color='primary'
            component="label"
            fullWidth
            style={{ marginBottom: '10px' }}
            onClick={() => setIsModalOpened(true)}
          >
            Select
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
              label="No Media"
              value="NO_MEDIA"
            />
            {currentSelection && (
              <Tab
                label="Current Media"
                value="CURRENT_MEDIA"

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
                value={upload.media}
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
          {/* {tabValue === "NO_MEDIA" && <InsertDriveFileIcon />} */}
          {tabValue === "CURRENT_MEDIA" && currentSelection && <img src={`${process.env.NEXT_PUBLIC_WEB_API_URL}${currentSelection.media}`} alt="Current Image Placeholder" style={{ width: "100%" }} />}

          {uploads.length > 0 && uploads.map((upload, i) => {

            return (
              <>
                {tabValue === upload.media && <img alt={`Logo-${i + 1}`} src={`${process.env.NEXT_PUBLIC_WEB_API_URL}${upload.media}`} style={{ width: "100%" }} />}
              </>
            )
          })}
          {/* Add other tab views as required */}
        </Box>
      </Box>
      <SelectMediaModal
        open={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        onSelect={handleMediaSelection}
      />
    </ListItem>
  );
}

export default RealTimeMediaSelectionRow;
