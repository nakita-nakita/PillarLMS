import React, { useContext } from 'react';
import AdminLayout from '@/layouts/admin/layout';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import { Avatar, Badge, Chip, Divider, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, useTheme } from '@mui/material';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import TimelineComponent from '@/pages-scripts/portal/dashboard/index/components/timeline';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';

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
      {/* Project Name */}
      <Box sx={{ m: 1 }}>
        <List sx={{ p: 0 }}>
          <HeaderRow label='Project Name' />
        </List>
        <Paper elevation={3}
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: "0 0 5px 5px",
          }}>
          <div>

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
            <Typography variant="h5" sx={{ display: "inline-block" }}>Rome</Typography>
          </div>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Paper>
      </Box>

      {/* Row of Tiles */}
      <Box sx={{ display: 'flex', mt: 2 }}>

        {/* New Pages */}
        <Paper elevation={3} sx={{ flex: 1, m: 1 }}>
          <List sx={{ p: 0 }}>
            <HeaderRow label='New Pages' />
            <ListItem>
              <Box sx={{ width: "50%", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={() => navigate("/portal/dashboard/new-pages/ready")}>

                  <CircularProgressWithLabel variant="determinate" value={80} color="error" />
                </IconButton>
              </Box>

              <Box sx={{ width: "50%", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                <IconButton onClick={() => navigate("/portal/dashboard/new-pages/total")}>

                  <Badge
                    badgeContent={"total"} sx={{
                      '& .MuiBadge-badge': {
                        right: "-50%",
                        top: 16,
                      }
                    }}>
                    <Avatar
                    // sx={{ bgcolor: deepOrange[500] }}

                    >
                      5
                    </Avatar>
                  </Badge>
                </IconButton>

              </Box>


            </ListItem>

            <Divider />
            <ListItemButton onClick={() => navigate("/portal/dashboard/new-pages/new")}>
              <ListItem >

                <ListItemIcon>
                  <SmallAvatar variant="square" sx={{
                    background: theme.palette.success.main,
                    color: theme.palette.success.contrastText,
                  }}>
                    5
                  </SmallAvatar>
                </ListItemIcon>
                <ListItemText primary="New" />
              </ListItem>
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={() => navigate("/portal/dashboard/new-pages/not-ready")}>
              <ListItem >

                <ListItemIcon>
                  <SmallAvatar variant="square" sx={{
                    background: theme.palette.error.main,
                    color: theme.palette.error.contrastText,
                  }}>
                    1
                  </SmallAvatar>
                </ListItemIcon>
                <ListItemText primary="Not Ready" />

              </ListItem>
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={() => navigate("/portal/dashboard/new-pages/deleted")}>
              <ListItem >
                <ListItemIcon>
                  <SmallAvatar variant="square" sx={{
                    background: theme.palette.info.main,
                    color: theme.palette.info.contrastText,
                  }}>
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
            <ListItem>
              <Box sx={{ width: "50%", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={() => navigate("/portal/dashboard/published-pages/ready")}>

                  <CircularProgressWithLabel variant="determinate" value={75} color="error" />
                </IconButton>
              </Box>

              <Box sx={{ width: "50%", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                <IconButton onClick={() => navigate("/portal/dashboard/published-pages/total")}>

                  <Badge
                    badgeContent={"total"} sx={{
                      '& .MuiBadge-badge': {
                        right: "-50%",
                        top: 16,
                      }
                    }}>
                    <Avatar
                    // sx={{ bgcolor: deepOrange[500] }}

                    >
                      11
                    </Avatar>
                  </Badge>
                </IconButton>

              </Box>


            </ListItem>

            <Divider />
            <ListItemButton onClick={() => navigate("/portal/dashboard/published-pages/changed")}>
              <ListItem >

                <ListItemIcon>
                  <SmallAvatar variant="square" sx={{
                    background: theme.palette.success.main,
                    color: theme.palette.success.contrastText,
                  }}>
                    4
                  </SmallAvatar>
                </ListItemIcon>
                <ListItemText primary="Changed" />
              </ListItem>
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={() => navigate("/portal/dashboard/published-pages/not-ready")}>
              <ListItem >

                <ListItemIcon>
                  <SmallAvatar variant="square" sx={{
                    background: theme.palette.error.main,
                    color: theme.palette.error.contrastText,
                  }}>
                    1
                  </SmallAvatar>
                </ListItemIcon>
                <ListItemText primary="Not Ready" />
              </ListItem>
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={() => navigate("/portal/dashboard/published-pages/deleted")}>
              <ListItem >

                <ListItemIcon>
                  <SmallAvatar variant="square" sx={{
                    background: theme.palette.info.main,
                    color: theme.palette.info.contrastText,
                  }}>
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
          <Box
            sx={{
              p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <IconButton onClick={() => navigate("/portal/dashboard/configuration-status/ready")}>
              <CircularProgressWithLabel variant="determinate" value={80} color="error" />
            </IconButton>
          </Box>
          <List sx={{ p: 0 }}>
            <Divider />
            <ListItemButton onClick={() => navigate("/portal/dashboard/configuration-status/changed")}>
              <ListItem >

                <ListItemIcon>
                  <SmallAvatar variant="square" sx={{
                    background: theme.palette.success.main,
                    color: theme.palette.success.contrastText,
                  }}>
                    5
                  </SmallAvatar>
                </ListItemIcon>
                <ListItemText primary="Changed" />
              </ListItem>
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={() => navigate("/portal/dashboard/configuration-status/not-ready")}>
              <ListItem >
                <ListItemIcon>
                  <SmallAvatar variant="square" sx={{
                    background: theme.palette.error.main,
                    color: theme.palette.error.contrastText,
                  }}>
                    1
                  </SmallAvatar>
                </ListItemIcon>
                <ListItemText primary="Not Ready" />
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
          <Box
            sx={{
              p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}
          >

            <IconButton
              sx={{ m: "4px 0" }}
              onClick={() => navigate("/portal/dashboard/drafted-pages/total")}>

              <Badge
                badgeContent={"total"} sx={{
                  '& .MuiBadge-badge': {
                    right: "-50%",
                    top: 16,
                  }
                }}>
                <Avatar
                // sx={{ bgcolor: deepOrange[500] }}

                >
                  4
                </Avatar>
              </Badge>
            </IconButton>
          </Box>
          <List sx={{ p: 0 }}>

            <Divider />
            <ListItemButton onClick={() => navigate("/portal/dashboard/drafted-pages/new")}>
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
            <ListItemButton onClick={() => navigate("/portal/dashboard/drafted-pages/deleted")}>
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
        <TimelineComponent />
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
