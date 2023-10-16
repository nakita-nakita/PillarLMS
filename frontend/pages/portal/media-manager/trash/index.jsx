'use client'

// Library
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';

// Mine
import AdminLayout from '@/layouts/admin/layout';
import { realtimeLink } from '@/utils/realtime/link';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import MediaManagerProvider, { MediaManagerContext } from '@/pages-scripts/portal/media-manager/context/mediaManager.context';
import { getMediaManagerTrashedPageGraphQL } from '@/pages-scripts/portal/media-manager/store/mediaManager-getTrashedPage.store';
import RestoreFileModal from '@/pages-scripts/portal/media-manager/modals/RestoreFile.modal';

// MUI
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

//icon
import FolderIcon from '@mui/icons-material/Folder';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ImageIcon from '@mui/icons-material/Image';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const menuItem = {
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgb(224, 224, 224)"
  }
}

const MediaManager = () => {
  const router = useRouter()
  const { idChip, panelMeetingDoc, setPanelMeetingDoc } = useContext(AdminLayoutContext)
  const { mediaManager, setMediaManager } = useContext(MediaManagerContext)

  const [anchorEl, setAnchorEl] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false)
  const [dropDowns, setDropDowns] = useState({})

  useEffect(() => {
    setMediaManager(prevState => ({
      ...prevState,
      selectedFolderId: null,
      folders: [],
      files: [],
    }))

    getMediaManagerTrashedPageGraphQL().then(result => {
      const files = result.data.backendMediaManagerFile_viewTrash

      setMediaManager(prevState => ({
        ...prevState,
        files,
      }))

      const newDropDown = {}
      files.map(f => {
        newDropDown[f.id] = false
      })

      setDropDowns(newDropDown)
      setIsLoaded(true)
    })

  }, [])


  const navigateFile = ({ id }) => {
    realtimeLink({
      to: `/portal/media-manager/detail/${id}`,
      meetingId: panelMeetingDoc.id,
      leaderUserId: panelMeetingDoc.leader?.id,
      router,
      setPanelMeetingDoc,
      userId: idChip.id,
    })
  }

  const navigateToMediaManager = () => {
    realtimeLink({
      to: `/portal/media-manager`,
      meetingId: panelMeetingDoc.id,
      leaderUserId: panelMeetingDoc.leader?.id,
      router,
      setPanelMeetingDoc,
      userId: idChip.id,
    })

  }

  const handleOpenDropDown = ({ event, id }) => {
    event.preventDefault();
    event.stopPropagation();

    setAnchorEl(event.currentTarget);
    setDropDowns(prevState => {
      const newDropDown = { ...prevState }

      newDropDown[id] = true

      return newDropDown
    })
  }

  const handleCloseDropDown = ({ event, id }) => {
    event.preventDefault();
    event.stopPropagation();
    setDropDowns(prevState => {
      const newDropDown = { ...prevState }

      newDropDown[id] = false

      return newDropDown
    })
  }

  const handleRestoreFileOpen = ({ event, id, name }) => {
    event.preventDefault();
    event.stopPropagation();

    setMediaManager(prevState => ({
      ...prevState,
      modal_isRestoreFileModalOpened: true,
      selectFileName: name,
      selectedFileId: id,
    }))

    handleCloseDropDown({ event, id })
  }
  
  return (
    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto",
      padding: "20px",
      minHeight: "350px",
    }}>
      {isLoaded && (
        <>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              sx={{ lineHeight: "50px", cursor: "pointer" }}
              underline="hover"
              color="inherit"
              onClick={() => navigateToMediaManager()}
            >
              Media Manager
            </Link>
            <Typography
              sx={{ lineHeight: "50px", cursor: "pointer" }}
              color="text.primary"
            >
              Trash Folder
            </Typography>
          </Breadcrumbs>
          <br />
          <br />
          <Paper elevation={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>

                <List dense={false}>
                  {mediaManager.files.map(f => (
                    <div key={f.id}>
                      <ListItem
                        sx={menuItem}
                        onClick={() => navigateFile({ id: f.id })}
                        secondaryAction={
                          <>
                            <IconButton
                              onClick={(event) => handleOpenDropDown({ event, id: f.id })}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <StyledMenu
                              id="demo-customized-menu"
                              MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                              }}
                              anchorEl={anchorEl}
                              open={dropDowns[f.id]}
                              onClose={(event) => handleCloseDropDown({ event, id: f.id })}
                            >
                              <MenuItem onClick={() => navigateFile({ id: f.id })}>
                                Open
                              </MenuItem>
                              <Divider sx={{ my: 0.5 }} />
                              <MenuItem onClick={(event) => handleRestoreFileOpen({ event, id: f.id, name: f.userFileName })}>
                                Restore
                              </MenuItem>
                            </StyledMenu>
                          </>
                        }
                      >
                        <ListItemIcon>
                          <ImageIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={f.userFileName}
                        />
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Paper>
          <RestoreFileModal 
            isOpened={mediaManager.modal_isRestoreFileModalOpened}
            onClose={() => {
              setMediaManager(prevState => ({
                ...prevState,
                modal_isRestoreFileModalOpened: false,
              }))
            }}

          />
        </>
      )}
    </Box>
  )
}

MediaManager.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      hasNoEntity
    >
      <MediaManagerProvider>
        {page}
      </MediaManagerProvider>
    </AdminLayout>
  )
}

export default MediaManager