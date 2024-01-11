import React, { useContext } from 'react';
import AdminLayout from '@/layouts/admin/layout';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import { Avatar, Badge, Breadcrumbs, Chip, Divider, Grid, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, useTheme } from '@mui/material';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import TimelineComponent from '@/pages-scripts/portal/dashboard/index/components/timeline';
import DashboardProvider from '@/pages-scripts/portal/dashboard/index/context/Dashboard.context';

function CircularProgressWithLabel(props) {

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  mixWidth: 30,
  height: 30,
  border: `2px solid ${theme.palette.background.paper}`,
}));

function DashboardPage() {
  const theme = useTheme()

  const { navigate } = useContext(AdminLayoutContext)

  return (
    <Box sx={{
      flexGrow: 1,
      width: '100%',
      maxWidth: '900px',
      m: 'auto',
    }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          sx={{ lineHeight: "50px", cursor: "pointer" }}
          underline="hover"
          color="inherit"
          onClick={() => navigate("/portal/dashboard")}
        >
          Dashboard
        </Link>
        <Typography
          sx={{ lineHeight: "50px", cursor: "pointer" }}
          color="text.primary"
        >
          Project
        </Typography>
      </Breadcrumbs>


      {/* Project Name */}
      <Box sx={{ m: 1 }}>
        <List sx={{ p: 0 }}>
          <HeaderRow label='Project' />
        </List>
        <Paper elevation={3}
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: "0 0 5px 5px",
          }}>

          {/* Key-Value Pairs */}
          {/* Key-Value Pairs as a Table */}
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography variant="body1">
                <strong>Name</strong>
              </Typography>
              <Typography variant="body1">
                <strong>Color</strong>
              </Typography>
              <Typography variant="body1">
                <strong>Project Start</strong>
              </Typography>
              <Typography variant="body1">
                <strong>Project End</strong>
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body1">
                Rome
              </Typography>
              <Typography variant="body1">
                <Box
                  sx={{
                    width: '18px', // Adjust the width of the colored box
                    height: '18px',
                    border: "3px solid rgb(66, 66, 66)",
                    backgroundColor: "#f0a012", // Change the background color
                    borderRadius: '0', // Adjust the border radius
                    marginRight: '16px', // Adjust the spacing between the box and text
                    display: "inline-block",
                  }}
                />
              </Typography>
              <Typography variant="body1">
                Jan 01, 2024
              </Typography>
              <Typography variant="body1">
                Jan 10, 2024
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Row of Tiles */}
      <Box sx={{ display: 'flex', mt: 2 }}>

        {/* New Pages */}
        <Paper elevation={3} sx={{ flex: 1, m: 1 }}>
          <List sx={{ p: 0 }}>
            <HeaderRow label='New Pages' />
            <ListItemButton onClick={() => navigate("/portal/dashboard/project/42/new-pages/total")}>
              <ListItem >

                <ListItemIcon>
                  <SmallAvatar variant="square">
                    5
                  </SmallAvatar>
                </ListItemIcon>
                <ListItemText primary="Total" />
              </ListItem>
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={() => navigate("/portal/dashboard/project/42/new-pages/new")}>
              <ListItem >

                <ListItemIcon>
                  <SmallAvatar variant="square">
                    5
                  </SmallAvatar>
                </ListItemIcon>
                <ListItemText primary="New" />
              </ListItem>
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={() => navigate("/portal/dashboard/project/42/new-pages/deleted")}>
              <ListItem >
                <ListItemIcon>
                  <SmallAvatar variant="square">
                    3
                  </SmallAvatar>
                </ListItemIcon>
                <ListItemText primary="Deleted" />
              </ListItem>
            </ListItemButton>
            <Divider />

          </List>
        </Paper>

        {/* Published Pages */}
        <Paper elevation={3} sx={{ flex: 1, m: 1 }}>
          <List sx={{ p: 0 }}>
            <HeaderRow label='Published Pages' />

            <ListItemButton onClick={() => navigate("/portal/dashboard/project/42/published-pages/total")}>
              <ListItem >

                <ListItemIcon>
                  <SmallAvatar variant="square">
                    5
                  </SmallAvatar>
                </ListItemIcon>
                <ListItemText primary="Total" />
              </ListItem>
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={() => navigate("/portal/dashboard/project/42/published-pages/changed")}>
              <ListItem >

                <ListItemIcon>
                  <SmallAvatar variant="square">
                    4
                  </SmallAvatar>
                </ListItemIcon>
                <ListItemText primary="Changed" />
              </ListItem>
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={() => navigate("/portal/dashboard/project/42/published-pages/deleted")}>
              <ListItem >

                <ListItemIcon>
                  <SmallAvatar variant="square">
                    0
                  </SmallAvatar>
                </ListItemIcon>
                <ListItemText primary="Deleted" />

              </ListItem>
            </ListItemButton>
            <Divider />





          </List>
        </Paper>

        {/* Configuration Status */}
        <Paper elevation={3} sx={{ flex: 1, m: 1 }}>
          <List sx={{ p: 0 }}>
            <HeaderRow label='Configuration Status' />
          </List>
          <List sx={{ p: 0 }}>
            <Divider />
            <ListItemButton onClick={() => navigate("/portal/dashboard/project/42/configuration-status/changed")}>
              <ListItem >

                <ListItemIcon>
                  <SmallAvatar variant="square">
                    5
                  </SmallAvatar>
                </ListItemIcon>
                <ListItemText primary="Changed" />
              </ListItem>
            </ListItemButton>
            <Divider />



          </List>
        </Paper>

        {/* Drafted Pages */}
        <Paper elevation={3} sx={{ flex: 1, m: 1 }}>
          <List sx={{ p: 0 }}>
            <HeaderRow label='Drafted Pages' />
          </List>
          <List sx={{ p: 0 }}>

            <ListItemButton onClick={() => navigate("/portal/dashboard/project/42/drafted-pages/total")}>
              <ListItem >

                <ListItemIcon>
                  <SmallAvatar variant="square">
                    5
                  </SmallAvatar>
                </ListItemIcon>
                <ListItemText primary="Total" />
              </ListItem>
            </ListItemButton>
            <Divider />
            <Divider />
            <ListItemButton onClick={() => navigate("/portal/dashboard/project/42/drafted-pages/new")}>
              <ListItem >

                <ListItemIcon>
                  <SmallAvatar variant="square">
                    1
                  </SmallAvatar>
                </ListItemIcon>
                <ListItemText primary="New" />

              </ListItem>
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={() => navigate("/portal/dashboard/project/42/drafted-pages/deleted")}>
              <ListItem >

                <ListItemIcon>
                  <SmallAvatar variant="square">
                    0
                  </SmallAvatar>
                </ListItemIcon>
                <ListItemText primary="Deleted" />

              </ListItem>
            </ListItemButton>
            <Divider />
          </List>
        </Paper>

      </Box>
      <br />

      <Paper elevation={3} sx={{ flex: 1, m: 1 }}>
        <DashboardProvider>
          <TimelineComponent />
        </DashboardProvider>
      </Paper>
    </Box>
  );
}

DashboardPage.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      hasNoEntity
    >
      {page}
    </AdminLayout>
  );
}

export default DashboardPage;
