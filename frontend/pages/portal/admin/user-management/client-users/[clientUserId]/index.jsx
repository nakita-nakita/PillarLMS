'use client'

//library
import React, { useContext, useEffect, useState } from 'react'

// Mine
import tabsJson from '@/pages-scripts/portal/admin/tabs.json';
import UserManagementTabsContext from '@/pages-scripts/portal/admin/user-management/tabs/UserManagementTabs.context';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';
import userManagementTabsJson from '@/pages-scripts/portal/admin/user-management/tabs/tabs.json';
import UserManagementTabs from '@/pages-scripts/portal/admin/user-management/tabs/tabs';
// ... (previous imports)

// MUI
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Switch from '@mui/material/Switch';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

const Page = () => {
  const { setTabs } = useContext(AdminLayoutContext);
  const settingsTabsContext = useContext(UserManagementTabsContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const { navigate } = useContext(AdminLayoutContext);

  useEffect(() => {
    setTabs((prevState) => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 0,
    }));

    settingsTabsContext.setTabs((prevState) => ({
      ...prevState,
      tabs: userManagementTabsJson.tabs,
      selectedValue: 1,
    }));

    setIsLoaded(true);
  }, []);

  const handleBlockToggle = () => {
    setIsBlocked((prevIsBlocked) => !prevIsBlocked);
  };

  const handleBack = (event) => {
    event.preventDefault();
    event.stopPropagation();

    navigate("/portal/admin/user-management/client-users/")
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        maxWidth: '900px',
        m: 'auto',
      }}
      component="form"
      noValidate
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <UserManagementTabs />
      </Box>

      {isLoaded && (
        <>
          <br />

          {/* Breadcrumb */}
          <Breadcrumbs aria-label="breadcrumb">
            <span style={{
              textDecoration: "underline",
              cursor: "pointer",
            }} onClick={handleBack}>
              Client Users
            </span>
            <Typography color="textPrimary">Email</Typography>
          </Breadcrumbs>
          <br />

          <Paper elevation={3}>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>Example@email.com</TableCell>
                  </TableRow>
                  {/* future update */}
                  {/* <TableRow>
                    <TableCell>Account</TableCell>
                    <TableCell>
                      <span
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >User Account Link</span>
                    </TableCell>
                  </TableRow> */}
                  <TableRow>
                    <TableCell>Block</TableCell>
                    <TableCell>
                      <Switch
                        checked={isBlocked}
                        onChange={handleBlockToggle}
                        color="primary"
                      />

                      <Chip
                        label={`User`}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          
          <br />
          <Button
            variant="contained"
          >
            Save
          </Button>
          <br />
          <br />
          <br />
        </>
      )}
    </Box>
  );
};


// ... (remaining code)
Page.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      // remove later
      hasNoEntity
    >
      {page}
    </AdminLayout>
  )
}

export default Page
