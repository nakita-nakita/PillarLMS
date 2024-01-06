import React from 'react';
import AdminLayout from '@/layouts/admin/layout';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import { Avatar, Badge, Chip, Divider, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, useTheme } from '@mui/material';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import TimelineComponent from '@/pages-scripts/portal/dashboard/components/timeline';

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
  return (
    <Box sx={{
      flexGrow: 1,
      width: '100%',
      maxWidth: '900px',
      m: 'auto',
    }}>
      {/* Project Name */}
      <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5">Project Name</Typography>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Paper>

      {/* Row of Tiles */}
      <Box sx={{ display: 'flex', mt: 2 }}>
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
            <CircularProgressWithLabel variant="determinate" value={80} color="error" />
          </Box>
          <List sx={{ p: 0 }}>
            <Divider />
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
            <Divider />
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
            <Divider />



          </List>
        </Paper>

        {/* New Pages */}
        <Paper elevation={3} sx={{ flex: 1, m: 1 }}>
          <List sx={{ p: 0 }}>
            <HeaderRow label='New Pages' />
            <ListItem>
              <Box sx={{ width: "50%", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgressWithLabel variant="determinate" value={80} color="error" />

              </Box>

              <Box sx={{ width: "50%", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>


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
              </Box>


            </ListItem>

            <Divider />
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
            <Divider />
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
            <Divider />
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
            <Divider />

          </List>
        </Paper>

        {/* Published Pages */}
        <Paper elevation={3} sx={{ flex: 1, m: 1 }}>
          <List sx={{ p: 0 }}>
            <HeaderRow label='Published Pages' />
            <ListItem>
              <Box sx={{ width: "50%", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgressWithLabel variant="determinate" value={75} color="error" />

              </Box>

              <Box sx={{ width: "50%", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>


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
              </Box>


            </ListItem>

            <Divider />
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
            <Divider />
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
            <Divider />
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
          </Box>
          <List sx={{ p: 0 }}>

            <Divider />
            <ListItem >
              <ListItemIcon>
                <SmallAvatar variant="square">
                  1
                </SmallAvatar>
              </ListItemIcon>
              <ListItemText primary="New" />
            </ListItem>
            <Divider />
            <ListItem >
              <ListItemIcon>
                <SmallAvatar variant="square">
                  0
                </SmallAvatar>
              </ListItemIcon>
              <ListItemText primary="Deleted" />
            </ListItem>
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
