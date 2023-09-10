// Libraries
import React from 'react';
import { useRouter } from 'next/router';

// import { globalHistory } from "@reach/router"
// import { Link as GatsbyLink, navigate } from 'gatsby';

// Mine
// import { doYouHaveNewNotifications } from '../store/Navigator.graphql.store';
// import PageLink from '../../../components/realtime/link/PageLink.component';
// import pageNavigate from '../../../components/realtime/link/pageNavigate.func';
// import { user } from '../../../components/admin/utils/user'

// MUI
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import AdminLayoutContext from "../adminLayout.context"
// import HomeSlide from '../../../components/realtime/meeting/HomeSlide.component';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeSlide from './MeetingPanel/HomeSlide';
import MeetingSlide from './MeetingPanel/MeetingSlide';
// import MeetingSlide from '../../../components/realtime/meeting/MeetingSlide.componet';
// import PeopleIcon from '@mui/icons-material/People';
// const path = globalHistory.location.pathname

export default function MeetingPanel(props) {
  const { meetingPanel, setMeetingPanel, } = React.useContext(AdminLayoutContext)
  const [newBadge, setNewBadge] = React.useState(false)
  const other = props;
  const theme = useTheme();

  const EndMeetingHandler = (event) => {
    setMeetingPanel(prevState => ({
      ...prevState,
      slide: "HOME",
    }))
  }

  const categories = () => [
    {
      id: 'Creator',
      children: [
        {
          id: 'Courses',
          icon: <GolfCourseIcon />,
          // active: location ? location.pathname.toLowerCase().startsWith("/admin/courses") : false,
          onClick: () => navigate("/admin/courses/")
        },
      ],
    },
    {
      id: "Admin",
      children: [
        {
          id: 'User Management',
          icon: <PeopleIcon />,
          onClick: () => navigate("/admin/user-management/"),
          // active: location ? location.pathname.toLowerCase().startsWith("/admin/user-management") : false,
        },
        {
          id: 'Settings',
          icon: <SettingsIcon />,
          onClick: () => navigate("/admin/settings/"),
          // active: location ? location.pathname.toLowerCase().startsWith("/admin/settings") : false,
        },
      ]
    },
    {
      id: "User",
      children: [
        {
          id: 'Account',
          icon: <SettingsIcon />,
          onClick: () => navigate("/app/account/?display=admin"),
          // active: location ? location.pathname.toLowerCase().startsWith("/app/account") : false,
        },
        { id: 'Log out', icon: <LogoutIcon />, onClick: () => navigate("/") },
      ]
    }
  ];

  const topHeader = {
    // py: '2px',
    // px: 3,
    // color: 'rgba(255, 255, 255, 0.7)',
    // '&:hover, &:focus': {
    bgcolor: '#afac9b',
    color: "#F3E6DB",
    // },
  };



  const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
      bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
  };

  const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    // px: 3,
  };

  const [categoriesData, setCategoriesData] = React.useState(categories)

  return (
    <Drawer variant="permanent" {...other}>
      {meetingPanel.slide === "HOME" && (
        <HomeSlide />
      )}

      {meetingPanel.slide === "MEETING" && (
        <MeetingSlide />
      )}
    </Drawer>
  );
}
