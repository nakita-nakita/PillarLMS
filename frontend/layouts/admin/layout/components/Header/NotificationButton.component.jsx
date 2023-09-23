import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge';
import FixedBottomNavigation from './FixedBottomNavigation.item';
import AdminLayoutContext from '../../adminLayout.context';
import NotificationPopup from '@/components/notification/NotificationPopup';
// import FixedBottomNavigation from "../../items/FixedBottomNavigation/FixedBottomNavigation.item"

export default function NotificationButton() {
  const { notifications } = React.useContext(AdminLayoutContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ display: 'inline-block', position: "relative" }}>
      <Box sx={{ alignItems: 'center', textAlign: 'center' }}>
        {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
        <Tooltip title="Notifications">
          <IconButton

            color="inherit"
            variant="contained"
            aria-label="open drawer"
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'notifications-options' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            edge="start"
            style={{
              margin: "0 15px 0 0",
            }}
          >
            {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}
            <Badge badgeContent={notifications.badgeCount} color="secondary" style={{ color: "white" }}>
              <NotificationsIcon fontSize="large" />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{ sx: { pb: 0 } }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            // mt: 6.5,
            // pr: "20.5px",
            maxWidth: "330px",
            maxHeight: "33vh",
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <NotificationPopup />
      </Menu>
    </div>
  );
}