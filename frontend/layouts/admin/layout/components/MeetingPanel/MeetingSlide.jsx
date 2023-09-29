//library
import React, { useEffect } from 'react'

// Mine
import { getUsersNotInMeetingGraphQL } from '@/layouts/admin/store/meeting-getUsersNotInMeeting.store';

// MUI
import { styled, alpha } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AdminLayoutContext from '../../adminLayout.context';
import UserChip from '@/components/chip/user.chip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { initSocket } from '@/utils/realtime/socket';

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


function MeetingSlide() {

  const { meetingPanel, setMeetingPanel, panelMeetingDoc, setPanelMeetingDoc, idChip } = React.useContext(AdminLayoutContext)

  const [dropDowns, setDropDowns] = React.useState({})
  const [inviteUsers, setInviteUsers] = React.useState({})

  const [anchorEl, setAnchorEl] = React.useState(null)

  const hangUp = () => {
    setPanelMeetingDoc(prevState => ({
      ...prevState,
      modal_isHangUpMeetingModalOpened: true
    }))
  }

  const end = () => {
    setPanelMeetingDoc(prevState => ({
      ...prevState,
      modal_isEndMeetingModalOpened: true
    }))
  }

  const changeName = () => {
    setPanelMeetingDoc(prevState => ({
      ...prevState,
      modal_isChangeNameModalOpened: true
    }))
  }

  const inviteUser = ({ id }) => {
    let socket = initSocket()

    socket.emit('server-meeting-invite-user', {
      userId: id,
      meetingId: panelMeetingDoc.id,
    })

    setInviteUsers(prevState => {
      const data = { ...prevState }
      data[id] = true
      return data
    })
  }

  const handleOpenDropDown = ({ event, id }) => {

    setAnchorEl(event.currentTarget);
    setDropDowns(prevState => {
      const newDropDown = { ...prevState }

      newDropDown[id] = true

      return newDropDown
    })
  }

  const handleCloseDropDown = ({ id }) => {
    setDropDowns(prevState => {
      const newDropDown = { ...prevState }

      newDropDown[id] = false

      return newDropDown
    })
  }

  const assignAsLeader = ({ id }) => {
    setPanelMeetingDoc(prevState => ({
      ...prevState,
      modal_isChangeLeaderModalOpened: true,
      selectedUserId: id,
    }))
    handleCloseDropDown({ id })

  }

  const kickUser = ({ id }) => {
    setPanelMeetingDoc(prevState => ({
      ...prevState,
      modal_isKickUserModalOpened: true,
      selectedUserId: id,
    }))
    handleCloseDropDown({ id })

  }


  React.useEffect(() => {
    getUsersNotInMeetingGraphQL({
      id: panelMeetingDoc.id
    }).then(result => {
      const onlineUserListNotInMeeting = result.data.collaborateMeeting_getOnlineUsersNotInMeeting

      setPanelMeetingDoc(prevState => ({
        ...prevState,
        onlineUserListNotInMeeting,
      }))
    })
  }, [])

  useEffect(() => {

    const newDropDown = {}
    const newInvites = { ...inviteUsers }
    panelMeetingDoc.users.map(u => {
      newDropDown[u.id] = false

      if (!newInvites[u.id]) {
        newInvites[u.id] === false
      }
    })

    setDropDowns(newDropDown)

    setInviteUsers(prevState => ({
      ...prevState,
      ...newInvites,
    }))




  }, [panelMeetingDoc.users])

  return (
    <>
      <List sx={{ width: "100%" }}>
        {/* {generate( */}
        <ListItem

          secondaryAction={
            // <a href="#">New</a>
            <>
              {
                idChip.id === panelMeetingDoc.leader.id && (
                  <Button variant="contained" color="error" onClick={end}>
                    End
                  </Button>
                )
              }
              {
                idChip.id !== panelMeetingDoc.leader.id && (
                  <Button variant="contained" color="error" onClick={hangUp}>
                    Hang up
                  </Button>
                )
              }
            </>
          }>
          <ListItemText
            primary={(
              <Typography variant="h6" component="div">
                Meeting
              </Typography>
            )}
          // secondary="Secondary text"
          />
        </ListItem>
      </List>
      {/* <Demo> */}
      <List sx={{ backgroundColor: "aliceblue", width: "100%", mb: 3, }}>
        {/* {generate( */}
        <ListItem

          secondaryAction={(
            <>
              {idChip.id === panelMeetingDoc.leader.id && (
                <p onClick={changeName} style={{ cursor: "pointer", textDecoration: "underline" }}>Change</p>
              )}
            </>
          )
          }>
          <ListItemText
            primary="Name"
            secondary={panelMeetingDoc.name}
          />
        </ListItem>
      </List>
      <List sx={{ backgroundColor: "aliceblue", width: "100%", mb: 3, }}>
        <ListItem>
          <ListItemText
            primary="Leader"
            secondary={(<UserChip
              callByType={panelMeetingDoc?.leader?.callByType}
              circleColor={panelMeetingDoc?.leader?.circleColor}
              email={panelMeetingDoc?.leader?.email}
              firstName={panelMeetingDoc?.leader?.firstName}
              labelColor={panelMeetingDoc?.leader?.labelColor}
              lastName={panelMeetingDoc?.leader?.lastName}
              picturePreview={panelMeetingDoc?.leader?.picture}
              username={panelMeetingDoc?.leader?.username}
            />)}
          />
        </ListItem>
      </List>

      <List sx={{ width: "100%" }}>
        <ListItem>
          <ListItemText
            primary={(
              <Typography variant="h6" component="div">
                In The Meeting
              </Typography>
            )}
          />
        </ListItem>
      </List>
      <List sx={{ backgroundColor: "aliceblue", width: "100%", mb: 3, }}>
        {Object.keys(dropDowns).length !== 0 && panelMeetingDoc.users.map(u => {
          return (
            <ListItem
              key={u.id}
              secondaryAction={(
                <div key={u.id}>
                  {idChip.id === panelMeetingDoc.leader.id && u.id !== panelMeetingDoc.leader.id && (
                    <>
                      <IconButton
                        onClick={(event) => handleOpenDropDown({ event, id: u.id })}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                          'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={dropDowns[u.id]}
                        onClose={() => handleCloseDropDown({ id: u.id })}
                      >
                        <MenuItem onClick={() => assignAsLeader({ id: u.id })}>
                          <EditIcon />
                          Assign as Leader
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={() => kickUser({ id: u.id })}>
                          <FileCopyIcon />
                          Kick from meeting
                        </MenuItem>
                      </StyledMenu>

                    </>
                  )}
                </div>
              )}
            >
              <UserChip
                callByType={u?.callByType}
                circleColor={u?.circleColor}
                email={u?.email}
                firstName={u?.firstName}
                labelColor={u?.labelColor}
                lastName={u?.lastName}
                picturePreview={u?.picture}
                username={u?.username}
              />
            </ListItem>
          )
        })}
      </List>
      <List sx={{ width: "100%" }}>
        <ListItem>
          <ListItemText
            primary={(
              <Typography variant="h6" component="div">
                Online
              </Typography>
            )}
          />
        </ListItem>
      </List>
      <List sx={{ backgroundColor: "aliceblue", width: "100%", mb: 3, }}>
        {panelMeetingDoc.onlineUserListNotInMeeting.map(u => (
          <ListItem
            key={u.id}
            secondaryAction={(
              <>
                {!inviteUsers[u.id] && (
                  <p onClick={() => inviteUser({ id: u.id })} style={{ cursor: "pointer", textDecoration: "underline" }}>Invite</p>
                )}
              </>
            )}
          >
            <UserChip
              callByType={u?.callByType}
              circleColor={u?.circleColor}
              email={u?.email}
              firstName={u?.firstName}
              labelColor={u?.labelColor}
              lastName={u?.lastName}
              picturePreview={u?.picture}
              username={u?.username}
            />
          </ListItem>
        ))}
        {panelMeetingDoc.onlineUserListNotInMeeting.length === 0 && (
          <ListItem>
            <ListItemText
              // primary="Leader"
              primary={"It's quiet here. No one's online at the moment."}
            />
          </ListItem>
        )}
      </List>
    </>
  )
}

export default MeetingSlide
