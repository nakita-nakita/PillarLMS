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
import SettingFaviconModal from './modal/favicons.modal';

function RealTimeFaviconSelectionRow({ data, entity, onChange, onFileSubmit }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { idChip } = useContext(AdminLayoutContext)

  const [isLoaded, setIsLoaded] = useState(false)

  // components
  const [tabValue, setTabValue] = useState("NO_FAVICON");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpened, setIsModalOpened] = useState(false)

  //showing current state
  const [currentSelection, setCurrentSelection] = useState()

  // uploads
  const [uploads, setUploads] = useState([])


  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);

    const socket = initSocket()

    socket.emit('server-samedoc-favicon-selection-change', {
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
          favicon: result.data.favicon,
          user: { ...idChip },
        }])
        setTabValue(result.data.favicon)

      })
    }
  };

  const handleFaviconSelection = (faviconObj) => {
    let socket = initSocket();

    socket.emit("server-samedoc-update-favicon", {
      entity,
      name: data.name,
      favicon: faviconObj.link,
    })

    const hasAlreadyBeenUploaded = uploads.filter(u => u.favicon === faviconObj.link)[0]

    if (hasAlreadyBeenUploaded) {
      setTabValue(faviconObj.link)
    } else {
      setUploads(prevState => [...prevState, {
        favicon: faviconObj.link,
        user: { ...idChip },
      }])
      setTabValue(faviconObj.link)
    }


  }

  const handleUpload = useCallback((result) => {

    if (result.favicon.substring(0, 20) === '/resources/favicons/') {
      const hasAlreadyBeenUploaded = uploads.filter(u => u.favicon === result.favicon)[0]

      if (hasAlreadyBeenUploaded) {
        setTabValue(result.favicon)

      } else {
        setUploads(prevState => [...prevState, result])
        setTabValue(result.favicon)
      }

    } else if (result.entity === entity && result.name === data.name) {
      setUploads(prevState => [...prevState, result])
      setTabValue(result.favicon)
    }
  }, [uploads])

  const handleSelection = useCallback((result) => {
    if (result.entity === entity && result.name === data.name) {
      setTabValue(result.selection)
    }
  }, [])

  useEffect(() => {
    if (onChange) {
      if (tabValue === "NO_FAVICON") {
        onChange(null)
      } else if (tabValue === "CURRENT_FAVICON") {
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

      if (data?.currentSelection?.favicon) {
        console.log('data?.currentSelection?.favicon', data?.currentSelection?.favicon)
        setCurrentSelection(data.currentSelection)
        setTabValue("CURRENT_FAVICON")
      }

      if (data?.uploads) {
        setUploads(data.uploads)
      }

      setIsLoaded(true)
    }

    const socket = initSocket()


    socket.on("samedoc-favicon-selection-change", handleSelection)
    socket.on('samedoc-upload-favicon-change', handleUpload)

    return () => {
      socket.off("samedoc-favicon-selection-change")
      socket.off('samedoc-upload-favicon-change')
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
              label="No Favicon"
              value="NO_FAVICON"
            />
            {currentSelection && (
              <Tab
                label="Current Favicon"
                value="CURRENT_FAVICON"

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
                value={upload.favicon}
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
          {tabValue === "NO_FAVICON" && <InsertDriveFileIcon />}
          {tabValue === "CURRENT_FAVICON" && currentSelection && <img src={`${process.env.NEXT_PUBLIC_WEB_API_URL}${currentSelection.favicon}`} alt="Current Image Placeholder" style={{ width: "16px", height: "16px" }} />}

          {uploads.length > 0 && uploads.map((upload, i) => {

            return (
              <>
                {tabValue === upload.favicon && <img alt={`Logo-${i + 1}`} src={`${process.env.NEXT_PUBLIC_WEB_API_URL}${upload.favicon}`} style={{ width: "16px", height: "16px" }} />}
              </>
            )
          })}
          {/* Add other tab views as required */}
        </Box>
      </Box>
      <SettingFaviconModal
        open={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        onSelect={handleFaviconSelection}
      />
    </ListItem>
  );
}

export default RealTimeFaviconSelectionRow;
