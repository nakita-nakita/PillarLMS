// PluginSection.js
import { Box, Button, MenuItem, Select, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';
import tabsJson from '@/pages-scripts/portal/admin/tabs.json';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';

const pluginsData = [
  {
    id: 1,
    name: 'Plugin 1',
    version: '1.0.0',
    description: 'This is the description for Plugin 1.',
    imageUrl: 'https://placekitten.com/200/200', // Replace with the actual image URL
  },
  {
    id: 2,
    name: 'Plugin 2',
    version: '2.1.0',
    description: 'This is the description for Plugin 2.',
    imageUrl: 'https://placekitten.com/200/201', // Replace with the actual image URL
  },
  // Add more plugins as needed
];

const PluginCard = ({ plugin }) => {
  const theme = useTheme();
  const [action, setAction] = useState(''); // Activate/Deactivate/Uninstall
  const [selectedVersion, setSelectedVersion] = useState(plugin.version);

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  const handleVersionChange = (event) => {
    setSelectedVersion(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        background: theme.palette.grey[100],
      }}
    >
      <img
        src={plugin.imageUrl}
        alt={plugin.name}
        style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', marginRight: '16px' }}
      />
      <Box>
        <h3>{plugin.name}</h3>
        <p>Version: {plugin.version}</p>
        <p>{plugin.description}</p>
        {/* Action row with two dropdowns */}
        <Select
          value={action}
          onChange={handleActionChange}
          style={{ marginRight: '8px' }}
        >
          <MenuItem value="">Select Action</MenuItem>
          <MenuItem value="activate">Activate</MenuItem>
          <MenuItem value="deactivate">Deactivate</MenuItem>
          <MenuItem value="uninstall">Uninstall</MenuItem>
        </Select>
        <Select
          value={selectedVersion}
          onChange={handleVersionChange}
        >
          <MenuItem value={plugin.version}>{plugin.version}</MenuItem>
          {/* Add other available versions here */}
        </Select>
        {/* <Button variant="contained" color="primary" style={{ marginLeft: '8px' }}>
          Perform Action
        </Button> */}
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
