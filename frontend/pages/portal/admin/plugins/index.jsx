// PluginSection.js
import { Box, Button, List, MenuItem, Select, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';
import tabsJson from '@/pages-scripts/portal/admin/tabs.json';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';

const pluginsData = [
  {
    id: 1,
    name: 'Plugin 1',
    author: "Cool Author",
    authorLink: "https://google.com",
    version: '1.0.0',
    versions: ['1.0.0', '0.9.14', '0.9.13', '0.1.0', '0.0.0'],
    description: 'This is the description for Plugin 1.',
    imageUrl: 'https://placekitten.com/200/200', // Replace with the actual image URL
  },
  {
    id: 2,
    name: 'Plugin 2',
    author: "Cool Author",
    authorLink: "https://google.com",
    version: '1.0.0',
    versions: ['1.0.0', '0.9.14', '0.9.13', '0.1.0', '0.0.0'],
    description: 'This is the description for Plugin 2.',
    imageUrl: 'https://placekitten.com/200/201', // Replace with the actual image URL
  },
  // Add more plugins as needed
];

const PluginCard = ({ plugin }) => {
  const theme = useTheme();
  const [action, setAction] = useState(''); // Activate/Deactivate/Uninstall
  const [selectedVersion, setSelectedVersion] = useState(plugin.version);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  const handleVersionChange = (event) => {
    setSelectedVersion(event.target.value);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuSelect = (value) => {
    handleMenuClose();
    // Handle the selected action (Activate, Deactivate, Uninstall)
    setAction(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid #ddd',
        borderRadius: '8px',
        marginBottom: '16px',
        background: theme.palette.grey[100],
      }}
    >
      <img
        src={plugin.imageUrl}
        alt={plugin.name}
        style={{
          maxWidth: '150px',
          height: 'auto',
          borderRadius: '8px 0 0 8px',
        }}
      />
      <Box
        sx={{
          // padding: '16px',
          width: "100%",
        }}
      >
        {/* <h3 style={{ fontWeight: 700 }}>{plugin.name} {plugin.author && (
            <>

            </>
          )} */}
        <List sx={{p: 0}}>
          <HeaderRow
            label={(
              // </h3>
              <>
                {plugin.name} {plugin.author && (
                  <>
                    {' '}
                    {plugin.authorLink ? (
                      <>
                        <span >@ </span>
                        <a href={plugin.authorLink} style={{ color: 'lightskyblue', textDecoration: 'underline' }}>
                          {plugin.author}
                        </a>
                      </>
                    ) : (
                      `@ ${plugin.author}`
                    )}
                  </>
                )}
              </>
            )}
            secondaryAction={(
              <>
                <IconButton
                  edge="end"
                  aria-label="menu"
                  aria-controls="action-menu"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  sx={{color: theme.palette.grey[200]}}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="action-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }} // Adjust the transformOrigin
                >
                  <MenuItem disabled onClick={() => handleMenuSelect('activate')}>Activate</MenuItem>
                  <MenuItem onClick={() => handleMenuSelect('deactivate')}>Deactivate</MenuItem>
                  <MenuItem onClick={() => handleMenuSelect('uninstall')}>Uninstall</MenuItem>
                </Menu>

              </>
            )}
          />
        </List>
        <Box
          sx={{
            padding: '16px',
            width: "100%",
          }}
        >
          {/* <div style={{
            float: "right",
          }} >

          

          </div> */}

          <p>{plugin.description}</p>

          <br />
          {/* Version selection */}
          <Select
            value={selectedVersion}
            onChange={handleVersionChange}
          >
            {plugin.versions.map(version => (
              <MenuItem key={version} value={version}>{version}</MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </Box>
  );
};

const Page = () => {
  const { setTabs, updateEntity } = React.useContext(AdminLayoutContext);
  const [plugins, setPlugins] = useState([]);

  useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 1,
    }));

    // Fetch plugins data (replace with actual data fetching logic)
    setPlugins(pluginsData);
  }, []);

  const handleUpload = () => {
    // Implement the logic for uploading plugins
    console.log('Uploading plugin...');
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        maxWidth: '900px',
        m: 'auto',
      }}
    >

      {/* Top row with an upload button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '16px',
        }}
      >
        <Button variant="contained" color="primary" onClick={handleUpload}>
          Upload Plugin
        </Button>
      </Box>

      {plugins.map(plugin => (
        <PluginCard key={plugin.id} plugin={plugin} />
      ))}
    </Box>
  );
};

Page.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      // remove later
      hasNoEntity
    >
      {page}
    </AdminLayout>
  );
};

export default Page;
