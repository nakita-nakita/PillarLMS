import React from 'react'
import { useRouter } from 'next/router';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AdminLayoutContext from '../../adminLayout.context';
import { getGetAllMeetingsGraphQL } from '@/layouts/admin/store/meeting-getall.store';
import { getMeetingByUrl } from '@/layouts/admin/store/meeting-getByUrl.story';
import { initSocket } from '@/utils/realtime/socket';
import { getMeetingById } from '@/layouts/admin/store/meeting-getById.store';

function HomeSlide() {
  const router = useRouter();

  const { meetingPanel, setMeetingPanel, setPanelMeetingDoc } = React.useContext(AdminLayoutContext)

  const [meetings, setMeeting] = React.useState([])
  const [meetingsForUrl, setMeetingForUrl] = React.useState([])

  // const goToMeeting = () => {
  //   setMeetingPanel(prevState => ({
  //     ...prevState,
  //     slide: "MEETING"
  //   }))
  // }

  const handleStartMeeting = () => {
    setPanelMeetingDoc(prevState => ({
      ...prevState,
      modal_isNewMeetingModalOpened: true
    }))
  }

  const handleJoin = ({ id }) => {
    const socket = initSocket()

    socket.emit('server-meeting-join', {
      meetingId: id
    })

    getMeetingById({ id }).then(result => {
      const meeting = result.data?.collaborateMeeting_getMeetingById

      if (meeting) {
        setPanelMeetingDoc(prevState => ({
          ...prevState,
          id: meeting.id,
          name: meeting.name,
          url: meeting.url,
          leader: meeting.leader,
          users: meeting.users || [],

        }))

        setMeetingPanel(prevState => ({
          ...prevState,
          slide: "MEETING"
        }))


        router.push(meeting.url)
      }
    })
  }


  React.useEffect(() => {
    getGetAllMeetingsGraphQL().then((result) => {
      const data = result.data.collaborateMeeting_getAllMeetings
      setMeeting(data)
    })

    getMeetingByUrl({ url: router.pathname }).then(result => {
      const data = result.data.collaborateMeeting_getMeetingsForUrl
      setMeetingForUrl(data)
    })
  }, [])


  React.useEffect(() => {
    const socket = initSocket()

    socket.on('meeting-doesnt-exist', data => {

      setPanelMeetingDoc(prevState => ({
        ...prevState,
        modal_isNoMeetingModalOpened: true,
      }))
      getGetAllMeetingsGraphQL().then((result) => {
        const data = result.data.collaborateMeeting_getAllMeetings
        setMeeting(data)
      })

      getMeetingByUrl({ url: router.pathname }).then(result => {
        const data = result.data.collaborateMeeting_getMeetingsForUrl
        setMeetingForUrl(data)
      })

    }, [])

    return () => {
      socket.off('meeting-doesnt-exist')
    }
  }, [])



  return (
    <>

      {/* <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={12} md={6} sx={{ width: "100%" }}> */}

      <List sx={{ width: "100%" }}>
        {/* {generate( */}
        <ListItem

          secondaryAction={
            // <a href="#">New</a>
            <Button variant="contained" onClick={handleStartMeeting}>New</Button>
          }>
          <ListItemText
            primary={(
              <Typography variant="h6" component="div">
                Meetings
              </Typography>
            )}
          // secondary="Secondary text"
          />
        </ListItem>
      </List>
      {/* <Demo> */}
      <List sx={{ backgroundColor: "aliceblue", width: "100%", mb: 3, }}>

        {meetings && meetings.length > 0 && meetings.map(m => (
          <ListItem
            key={m.id}
            secondaryAction={
              <a href="#" onClick={() => handleJoin({ id: m.id })}>Join</a>
            }>
            <ListItemText
              primary={m.name}
            // secondary="Secondary text"
            />
          </ListItem>
        ))}

        {!meetings || meetings.length === 0 && (
          <ListItem>
            <ListItemText
              primary={<em>No Meetings</em>}
            />
          </ListItem>
        )}
      </List>
      {/* </Demo> */}
      {/* </Grid>
      </Grid> */}

      {/* <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={12} md={6} sx={{ width: "100%" }}> */}
      <Typography sx={{ p: 2 }} variant="h6" component="div">
        On this page
      </Typography>
      {/* <Demo> */}
      <List sx={{ width: "100%" }}>
        {/* {generate( */}
        {meetingsForUrl && meetingsForUrl.length > 0 && meetingsForUrl.map(m => (
          <ListItem
            key={m.id}
            secondaryAction={
              <a href="#" onClick={() => handleJoin({ id: m.id })}>Join</a>
            }>
            <ListItemText
              primary={m.name}
            // secondary="Secondary text"
            />
          </ListItem>
        ))}

        {!meetingsForUrl || meetingsForUrl.length === 0 && (
          <ListItem>
            <ListItemText
              primary={<em>No Meetings</em>}
            />
          </ListItem>
        )}
      </List>
      {/* </Demo> */}
      {/* </Grid>
      </Grid> */}
    </>
  )
}

export default HomeSlide
