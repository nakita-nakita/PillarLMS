// libraries
import * as React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

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

function Header(props) {
  const { onDrawerToggle, onMeetingDrawerToggle } = props;
  const { tabs } = React.useContext(AdminLayoutContext)

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

            {/* This is why pillarLMS test is slightly higher, todo: put in grid item soon. */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              PillarLMS
            </Typography>

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
              <Button
                color="secondary"
                variant="contained"
                aria-label="meeting panel"
                onClick={onMeetingDrawerToggle}
                edge="start"
                sx={{
                  my: 1,
                  color: "#fff"
                }}
              >
                <strong>
                  Meetings
                </strong>
              </Button>

            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {tabs?.tabs && tabs.tabs.length > 0 && (
        <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
          <div style={{ maxWidth: 936, margin: 'auto', width: "100%" }}>
            <Tabs value={tabs.selectedValue} textColor="inherit">
              {tabs.tabs.map(({ id, link, name }, index) => (
                <Link href={link} key={id || index}>
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
