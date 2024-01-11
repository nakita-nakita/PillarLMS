// libraries
import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation'

// mine
import NotificationButton from './Header/NotificationButton.component';
import WithAvatarGroup from './Header/WithTotalAvatars.component';
import AdminLayoutContext from '../adminLayout.context';

// mui
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Badge, useTheme } from '@mui/material';
import { realtimeLink } from '@/utils/realtime/link';

import GroupIcon from '@mui/icons-material/Group';
function Header(props) {
  const router = useRouter()
  const theme = useTheme()

  const { onDrawerToggle, onMeetingDrawerToggle } = props;
  const { tabs, setLeftDrawer, idChip, panelMeetingDoc, setPanelMeetingDoc } = React.useContext(AdminLayoutContext)

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

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0} style={{
        paddingTop: "10px",
        paddingBottom: props.tabs.length === 0 ? "10px" : 0,
      }}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{
              // display: { sm: 'none', xs: 'block' } 
            }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item xs />

            <Grid item>
              <Tooltip title="Who is on the page">
                <IconButton
                  color="inherit"
                  aria-label="who is on page"
                  edge="start"
                  style={{
                    borderRadius: "5px",
                  }}
                >
                  <WithAvatarGroup max={4} />
                </IconButton>
              </Tooltip>

              <NotificationButton />
              <Tooltip title="Meetings">
                <IconButton
                  variant="contained"
                  aria-label="meeting panel"
                  onClick={onMeetingDrawerToggle}
                  edge="start"
                  sx={{
                    my: 1,
                    color: "#fff"
                  }}
                >
                  {panelMeetingDoc.id && (

                    <Badge badgeContent={"LIVE"} color="error" sx={{
                      '& .MuiBadge-badge': {
                        right: -3,
                        top: -10,
                      }
                    }}>
                      <GroupIcon fontSize="large" />
                    </Badge>
                  )}
                  {!panelMeetingDoc.id && (
                    <GroupIcon fontSize="large" />
                  )}

                </IconButton>
              </Tooltip>

            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {tabs?.tabs && tabs.tabs.length > 0 && (
        <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
          <div style={{ maxWidth: 936, margin: 'auto', width: "100%" }}>
            <Tabs value={tabs.selectedValue} textColor="inherit">
              {tabs.tabs.map(({ id, link, name }, index) => (
                <Link onClick={(() => changeUrl(link))} key={id || index}
                  sx={{ color: theme.palette.primary.contrastText }}>
                  <Tab
                    index={0}
                    label={name}
                    value={id}
                  />
                </Link>
              ))}
            </Tabs>
          </div>
        </AppBar>
      )}
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
