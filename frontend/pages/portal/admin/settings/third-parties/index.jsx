'use client'

//library
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

// Mine
// import AdminLayoutContext from '../../../layout/adminLayout.context';
// import * as tabsJson from '../../tabs.json';
// import * as settingsTabsJson from '../tabs.json';
// import FaviconUpload from './favicon.upload';
// import SettingTabsContext from '../setting-tabs.context';
// import SettingTabs from '../tabs';
import tabsJson from '@/pages-scripts/portal/admin/tabs.json';
import settingsTabsJson from '@/pages-scripts/portal/admin/settings/tabs/tabs.json';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';
import SettingTabs from '@/pages-scripts/portal/admin/settings/tabs/tabs';
import SettingTabsContext from '@/pages-scripts/portal/admin/settings/tabs/setting-tabs.context';
// import FaviconUpload from '@/pages-scripts/portal/admin/settings/website/favicon.upload';

// MUI
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
// import { getSettingsSiteGraphQL, postSettingsSiteGraphQL } from '@/pages-scripts/portal/admin/settings/site/site.graphql';
import { processGraphQLErrors } from '@/utils/graphql/processGraphQLErrors.func';
import { realtimeLink } from '@/utils/realtime/link';
import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, useTheme } from '@mui/material';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

const ServiceListItem = ({ service, onDelete }) => {
  const theme = useTheme()

  const rowStyles = {
    hover: 'pointer',
    "&:hover": {
      backgroundColor: theme.palette.grey[300],
    }
  }
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuSelect = (action) => {
    handleClose();
    // Handle the selected action (View, Delete, etc.)
    // You can add the logic based on the action.
  };

  return (
    <ListItem button sx={service.isSelected ? { backgroundColor: theme.palette.grey[200], ...rowStyles } : rowStyles}>
      <ListItemText primary={(<>
        {service.name} {service.isSelected && (
          <small>
            <strong>
              * Selected
            </strong>
          </small>
        )}
      </>
      )}

      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="menu" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {!service.isSelected && <MenuItem onClick={() => handleMenuSelect('select')}>Select</MenuItem>}
          <MenuItem onClick={() => handleMenuSelect('view')}>View</MenuItem>
          <MenuItem onClick={() => handleMenuSelect('delete')}>Delete</MenuItem>
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const Page = () => {
  const router = useRouter()
  const theme = useTheme()

  const { setTabs } = React.useContext(AdminLayoutContext)
  const settingsTabsContext = React.useContext(SettingTabsContext)

  const [isLoaded, setIsLoaded] = useState(false)

  const { navigate } = React.useContext(AdminLayoutContext)

  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 2,
    }))

    settingsTabsContext.setTabs(prevState => ({
      ...prevState,
      tabs: settingsTabsJson.tabs,
      selectedValue: 2,
    }))

    setIsLoaded(true)

  }, [])


  ////////////////////////temp
  const analyticsServicesItems = [
    { id: 42, name: 'Google Analytics', isSelected: true, },
  ];

  const emailServicesItems = [
    { id: 43, name: 'MailChimp', isSelected: true, },
    { id: 43, name: 'Mailinator', isSelected: false, },
    { id: 43, name: 'Protomail', isSelected: false, },
  ];

  const fontServicesItems = [
    { id: 43, name: 'Google Fonts', isSelected: true, },
  ];






  return (
    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto"
    }}>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <SettingTabs />
        {/* <Tabs value={1} aria-label="basic tabs example">
          <Tab value={0} label="Church" />
          <Tab label="Colors" />
          <Tab label="Links" />
          <Tab label="Sites" />
        </Tabs> */}
      </Box>

      {isLoaded && (
        <>
          <br />

          <Paper elevation={3}>
            <List sx={{ p: 0 }}>
              <HeaderRow label="Analytics Services" />
            </List>
            <div className="admin-card">
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => console.log('New button clicked')}
              >
                New
              </Button>
            </div>
            <List>
              {analyticsServicesItems.map((service, index) => (
                <ServiceListItem key={index} service={service} onDelete={() => console.log('Delete button clicked')} />
              ))}
            </List>
          </Paper>
          <br />

          <Paper elevation={3}>
            <List sx={{ p: 0 }}>
              <HeaderRow label="Email Services" />
            </List>
            <div className="admin-card">
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => console.log('New button clicked')}
              >
                New
              </Button>
            </div>
            <List>
              {emailServicesItems.map((service, index) => (
                <ServiceListItem key={index} service={service} onDelete={() => console.log('Delete button clicked')} />
              ))}
            </List>
          </Paper>
          <br />

          {/* ... (similar modifications for Email Services and Fonts Services) */}

          <Paper elevation={3}>
            <List sx={{ p: 0 }}>
              <HeaderRow label="Fonts Services" />
            </List>
            <div className="admin-card">
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => console.log('New button clicked')}
              >
                New
              </Button>
            </div>
            <List>
              {fontServicesItems.map((service, index) => (
                <ServiceListItem key={index} service={service} onDelete={() => console.log('Delete button clicked')} />
              ))}
            </List>
          </Paper>


          <br />
        </>
      )}
    </Box>
  );
};

Page.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      hasNoEntity
    >
      {page}
    </AdminLayout>
  )
}

export default Page