import React, { useContext } from 'react';
import AdminLayout from '@/layouts/admin/layout';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Breadcrumbs, Button, Divider, Link, List, ListItem, ListItemText, styled, useTheme } from '@mui/material';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import DiamondDeviceEmulator from '@/components/previews/DeviceEmulators/DiamondDeviceEmulators';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';


function Page() {
  const { navigate } = useContext(AdminLayoutContext)

  return (
    <Box sx={{ flexGrow: 1, width: '100%', maxWidth: '900px', m: 'auto', mt: 2 }}>
      {/* Breadcrumb */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          sx={{ lineHeight: "50px", cursor: "pointer" }}
          underline="hover"
          color="inherit"
          onClick={() => navigate("/portal/dashboard")}
        >
          Dashboard
        </Link>
        <Link
          sx={{ lineHeight: "50px", cursor: "pointer" }}
          underline="hover"
          color="inherit"
          onClick={() => navigate("/portal/dashboard")}
        >
          Published Pages
        </Link>
        <Link
          sx={{ lineHeight: "50px", cursor: "pointer" }}
          underline="hover"
          color="inherit"
          onClick={() => navigate("/portal/dashboard/published-pages/deleted")}
        >
          Deleted
        </Link>
        <Typography
          sx={{ lineHeight: "50px", cursor: "pointer" }}
          color="text.primary"
        >
          View
        </Typography>
      </Breadcrumbs>

      <Paper elevation={3} sx={{ p: 0 }}>
        <List sx={{ p: 0 }}>
          <HeaderRow
            label='/p/awesome-page'
            secondaryAction={(
              <>
                <Button variant='contained' color='primary'>Restore</Button>

              </>
            )}
          />
        </List>
      </Paper>

      <DiamondDeviceEmulator src={"about:blank"} />
    </Box>
  );
}

Page.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      hasNoEntity
    >
      {page}
    </AdminLayout>
  );
}

export default Page;
