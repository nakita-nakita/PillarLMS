'use client'

// Library
import React from 'react'
import { useRouter } from 'next/router';

// Mine
import AdminLayout from '@/layouts/admin/layout';
import { realtimeLink } from '@/utils/realtime/link';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';

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
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

//icon
import FolderIcon from '@mui/icons-material/Folder';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ImageIcon from '@mui/icons-material/Image';

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
  const { idChip, panelMeetingDoc, setPanelMeetingDoc } = React.useContext(AdminLayoutContext)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateItem = () => {
    realtimeLink({
      to: `/portal/media-manager/detail/123`,
      meetingId: panelMeetingDoc.id,
      leaderUserId: panelMeetingDoc.leader?.id,
      router,
      setPanelMeetingDoc,
      userId: idChip.id,
    })
  }

  const navigateToTrashFolder = () => {
    realtimeLink({
      to: `/portal/media-manager/trash`,
      meetingId: panelMeetingDoc.id,
      leaderUserId: panelMeetingDoc.leader?.id,
      router,
      setPanelMeetingDoc,
      userId: idChip.id,
    })
  }
  const navigateFolder = () => {
    realtimeLink({
      to: `/portal/media-manager/folder/123`,
      meetingId: panelMeetingDoc.id,
      leaderUserId: panelMeetingDoc.leader?.id,
      router,
      setPanelMeetingDoc,
      userId: idChip.id,
    })
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
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
            <Button variant="contained" color="error" onClick={() => navigateToTrashFolder()}>
              View Trash
            </Button>
            <Button
              id="demo-customized-button"
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              New
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <FolderIcon />
                Folder
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={handleClose}>
                <FileUploadIcon />
                Upload
              </MenuItem>
            </StyledMenu>
          </Stack>
        </Grid>
      </Grid>
      <br />
      <Paper elevation={3}>

        {/* import FolderIcon from '@mui/icons-material/Folder'; */}




        <Grid container spacing={2}>
          <Grid item xs={12}>

            <List dense={false}>

              <ListItem sx={menuItem} onClick={() => navigateFolder()}>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Cool folder name"
                />
              </ListItem>
              <Divider />
              <ListItem sx={menuItem} onClick={() => navigateItem()}>
                <ListItemIcon>
                  <ImageIcon />
                </ListItemIcon>
                <ListItemText
                  primary="blah.test.jpg"
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

MediaManager.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

export default MediaManager