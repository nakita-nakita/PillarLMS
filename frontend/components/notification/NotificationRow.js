import * as React from 'react';
import { useRouter } from 'next/navigation'
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import GroupsIcon from '@mui/icons-material/Groups';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CloudIcon from '@mui/icons-material/Cloud';
import { setNotificationClickedGraphQL } from './store/notificationClicked.store';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import moment from "moment"
import { setNotificationSeenByIdGraphQL } from './store/notificationSeenById.store';


const SelectIcon = ({ icon }) => {
  switch (icon) {
    case "MEETING":
      return (
        <Avatar alt="MEETING">
          <GroupsIcon />
        </Avatar>
      )
    case "DISCUSSION":
      return (
        <Avatar alt="MEETING">
          <QuestionAnswerIcon />
        </Avatar>
      )
    case "SYSTEM":
      return (
        <Avatar alt="MEETING">
          <CloudIcon />
        </Avatar>
      )
  }
}

const buildUrl = ({ noti }) => {

  if (!noti.data.urlQuery) {
    return noti.data.url
  }

  let paramsArray = [];

  for (let i = 0; i < noti.data.urlQuery.length; i++) {
    const query = noti.data.urlQuery[i];

    paramsArray.push(`${query.key}=${query.value}`)
  }

  return `${noti.data.url}?${paramsArray.join('&')}`
}


export default function NotificationRow({ action, hasBeenClicked, hasBeenSeen, message, id, createdAt, stopSeenRequest }) {
  const router = useRouter()
  const { notifications, setNotifications } = React.useContext(AdminLayoutContext)

  const [noti] = React.useState(JSON.parse(action))
  const hasBeenClickedColor = "#E0E0E0"
  const hasNotBeenClickedColor = "#BEBEBE"
  const backgroundColor = "#585858"

  // setNotificationSeenByIdGraphQL
  React.useEffect(() => {
    if (!stopSeenRequest && !hasBeenSeen) {
      setNotificationSeenByIdGraphQL({id}).then(result => {
        const updatedNotifications = [...notifications.list].map(n => {
          if (n.id === id) {
            n.hasBeenSeen = true
          }
    
          return n
        })
    
        setNotifications(prevState => ({
          ...prevState,
          list: updatedNotifications,
          badgeCount: prevState.badgeCount - 1,
        }))
      })
    }
  }, [])

  const SelectAction = () => {
    switch (noti.type) {
      case "URL":
        router.push(buildUrl({ noti }))
      case "MEETING":
        // not implemented
        break;
    }
  }

  const clickHandler = () => {
    setNotificationClickedGraphQL({ id })

    const updatedNotifications = [...notifications.list].map(n => {
      if (n.id === id) {
        n.hasBeenClicked = true
      }

      return n
    })

    setNotifications(prevState => ({
      ...prevState,
      list: updatedNotifications
    }))

    SelectAction({ noti })

  }

  return (
    <ListItem onClick={clickHandler} sx={{
      backgroundColor: hasBeenClicked ? hasBeenClickedColor : hasNotBeenClickedColor,
      borderBottom: "1px solid #383838",
      cursor: "pointer",
      ':hover': {
        backgroundColor,
      }
    }} >
      <ListItemAvatar>
        <SelectIcon icon={noti.icon} />
      </ListItemAvatar>
      <ListItemText primary={message} secondary={moment(parseInt(createdAt)).fromNow()} />
    </ListItem>
  );
}
