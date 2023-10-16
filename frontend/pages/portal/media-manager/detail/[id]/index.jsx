'use client'

// Library
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import moment from 'moment';

// Mine
import AdminLayout from '@/layouts/admin/layout';
import { realtimeLink } from '@/utils/realtime/link';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { getMediaManagerFileByIdGraphQL } from '@/pages-scripts/portal/media-manager/store/mediaManager-getFileById.store';
import { getMediaManagerUserChipGraphQL } from '@/pages-scripts/portal/media-manager/store/mediaManager-getUserChip.store';
import { getMediaManagerBreadCrumbsGraphQL } from '@/pages-scripts/portal/media-manager/store/mediaManager-breadCrumbs.store';
import UserChip from '@/components/chip/user.chip';
import MediaManagerProvider, { MediaManagerContext } from '@/pages-scripts/portal/media-manager/context/mediaManager.context';

// MUI
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import RestoreFileModal from '@/pages-scripts/portal/media-manager/modals/RestoreFile.modal';


const MediaManager = () => {
  const router = useRouter()
  const { idChip, panelMeetingDoc, setPanelMeetingDoc } = useContext(AdminLayoutContext)
  const { mediaManager, setMediaManager } = useContext(MediaManagerContext)

  const [isLoaded, setIsLoaded] = useState(false)

  const [file, setFile] = useState({})
  const [uploadedUser, setUploadedUser] = useState({})
  const [deletedByUser, setDeleteByUser] = useState({})
  const [breadCrumbs, setBreadCrumbs] = useState([])

  const loadData = ({ id, }) => {

    getMediaManagerFileByIdGraphQL({
      id,
    }).then(result => {

      const targetFile = result.data.backendMediaManagerFile_getOneById
      setFile(targetFile)

      if (targetFile.folderId) {
        getMediaManagerBreadCrumbsGraphQL({
          folderId: targetFile.folderId,
        }).then(breadResult => {
          let newBreadCrumbs = breadResult.data?.backendMediaManagerFolder_getBreadCrumb || []

          newBreadCrumbs = newBreadCrumbs.sort((a, b) => b.order - a.order)
          setBreadCrumbs(newBreadCrumbs)
        })
      }

      getMediaManagerUserChipGraphQL({
        id: targetFile.uploadedBy
      }).then(uploadUserResult => {

        const uploadUser = uploadUserResult.data.backendUserBasicView_them
        setUploadedUser(uploadUser)

        if (targetFile.deletedAt) {
          getMediaManagerUserChipGraphQL({
            id: targetFile.deletedBy
          }).then(deletedByResult => {

            const deletedUser = deletedByResult.data.backendUserBasicView_them
            setDeleteByUser(deletedUser)
            setIsLoaded(true)

          })
        } else {
          setIsLoaded(true)
        }

      })
    })

  }

  useEffect(() => {
    if (router.query?.id) {
      loadData({ id: router.query.id })
    }
  }, [router.query])

  // reload after restoring file.
  useEffect(() => {
    if (isLoaded && mediaManager.selectedFileId === null) {
      loadData({ id: router.query.id })
    }
  }, [mediaManager, isLoaded])

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
  const navigateFolder = ({ id }) => {
    realtimeLink({
      to: `/portal/media-manager/folder/${id}`,
      meetingId: panelMeetingDoc.id,
      leaderUserId: panelMeetingDoc.leader?.id,
      router,
      setPanelMeetingDoc,
      userId: idChip.id,
    })
  }

  const openRestoreFile = () => {

    setMediaManager(prevState => ({
      ...prevState,
      modal_isRestoreFileModalOpened: true,
      selectFileName: file.userFileName,
      selectedFileId: router.query.id,
    }))
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

          <Paper elevation={3}>

            {/* import FolderIcon from '@mui/icons-material/Folder'; */}




            <Grid container spacing={2} sx={{ p: 5 }}>
              <Grid item xs={12}>

                <img src={`${process.env.NEXT_PUBLIC_WEB_API_URL}${file.url}`} style={{ width: "100%" }} />
                <br />
                <br />
                {file.deletedAt && (
                  <div>
                    <p>
                      <strong>This file is in the trash folder</strong>
                    </p>
                    <br />
                    <p>Deleted on:</p>
                    <p>{moment(parseInt(file.deletedAt)).toLocaleString()}</p>

                    {/* <span>Deleted on (Jul 30) <span style={{ textDecoration: "underline" }}>Restore?</span></span> */}
                    <br />
                    <p>Deleted by user:</p>

                    <UserChip
                      callByType={deletedByUser.callByType}
                      circleColor={deletedByUser.circleColor}
                      email={deletedByUser.email}
                      firstName={deletedByUser.firstName}
                      labelColor={deletedByUser.labelColor}
                      lastName={deletedByUser.lastName}
                      username={deletedByUser.username}
                      picturePreview={deletedByUser.picture}
                    />
                    <br />
                    <Button variant="contained" color="info" onClick={() => openRestoreFile()}>
                      Restore File
                    </Button>
                    <br />
                    <br />
                    <hr />
                  </div>
                )}
                <br />
                <p>
                  <strong>Name</strong>
                  <br />
                  <span>{file.userFileName}</span>
                </p>
                <br />
                <p>
                  <strong>Location</strong>
                  <br />
                  <Link
                    sx={{ lineHeight: "50px", cursor: "pointer" }}
                    underline="hover"
                    color="inherit"
                    onClick={() => navigateToMediaManager()}
                  >
                    Media Manager
                  </Link>
                  {breadCrumbs.length !== 0 && (
                    <>
                      <span> / </span>
                      {breadCrumbs.map(b => (
                        <span key={b.id}>
                          <Link
                            sx={{ lineHeight: "50px", cursor: "pointer" }}
                            underline="hover"
                            color="inherit"
                            onClick={() => navigateFolder({ id: b.id })}
                          >
                            {b.name}
                          </Link>

                          <span> / </span>
                        </span>
                      ))}
                    </>
                  )}
                  {/* <span>Media Manager / cool folder</span> */}
                </p>
                <br />
                <p>
                  <strong>Uploaded On</strong>
                  <br />
                  <span>{moment(parseInt(file.createdAt)).toLocaleString()}</span>
                </p>
                <br />
                <p>
                  <strong>Uploaded By</strong>
                  <br />
                  <span>
                    <UserChip
                      callByType={uploadedUser.callByType}
                      circleColor={uploadedUser.circleColor}
                      email={uploadedUser.email}
                      firstName={uploadedUser.firstName}
                      labelColor={uploadedUser.labelColor}
                      lastName={uploadedUser.lastName}
                      username={uploadedUser.username}
                      picturePreview={uploadedUser.picture}
                    />

                  </span>
                </p>
              </Grid>
            </Grid>
          </Paper>
          <RestoreFileModal
            isOpened={mediaManager.modal_isRestoreFileModalOpened}
            onClose={() => {
              setMediaManager(prevState => ({
                ...prevState,
                modal_isRestoreFileModalOpened: false,
                selectedFileId: null,
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