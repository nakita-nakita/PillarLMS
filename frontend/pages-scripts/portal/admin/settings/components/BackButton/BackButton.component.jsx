'use client'

import React, { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Badge from '@mui/material/Badge';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { realtimeLink } from '@/utils/realtime/link';


function SettingsBackButton({ label, href, isPrimary }) {
  const theme = useTheme();
  const router = useRouter()


  const { setLeftDrawer, idChip, panelMeetingDoc, setPanelMeetingDoc } = useContext(AdminLayoutContext)

  const changeUrl = (href) => {
    // router.push(href)
    realtimeLink({
      to: href,
      leaderUserId: panelMeetingDoc.leader?.id,
      meetingId: panelMeetingDoc.id,
      router,
      userId: idChip.id,
      setPanelMeetingDoc,

    })
  }

  const primaryStyles = {
    // backgroundColor: theme.palette.grey[100],
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    }
  }

  const secondaryStyles = {
    // backgroundColor: theme.palette.grey[100],
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.secondary.contrastText,
    }
  }

  return (

    <ListItemButton
      onClick={() => changeUrl(href)}
      sx={isPrimary ? primaryStyles : secondaryStyles}
    >

      <ListItem
        sx={{
          py: 1,
          px: 2,
        }}
      >
        <ListItemText>
          <div style={{ display: "flex" }}>
            {/* <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Avatar
              alt={(<ArrowBackIcon />)}
              // src={(<ArrowBackIcon />)}
              sx={{ width: 40, height: 40, mr: 1 }}
            />

          </div> */}
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}>

              <div style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                color: theme.palette.grey[100],
                height: "35px",
              }}>
                <ArrowBackIcon sx={{ mr: 1 }} />
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "column",
                color: theme.palette.grey[300]
              }}>

                {/* <Typography color="inherit" variant="h6" component="h2"
                style={{
                  lineHeight: 1.1,
                }}
              > */}
                {label}

                {/* </Typography> */}
              </div>
            </div>
          </div>



        </ListItemText>
      </ListItem>
    </ListItemButton>
  )
}

export default SettingsBackButton