'use client'
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'

//mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

export default function ClientLayout({ children }) {
  const router = useRouter();

  const handleSignOut = () => {
    document.cookie = 'authToken=; Max-Age=-99999999;path=/;'; 

    router.push('/auth/signin')
  }

  React.useEffect(() => {
console.log('router', router)
  }, [])

  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar position="static" color='default'>
        <Box sx={{
          flexGrow: 1,
          width: "100%",
          maxWidth: "900px",
          m: "auto"
        }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Church First
            </Typography>
            <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
          </Toolbar>
        </Box>
      </AppBar>

      <Box sx={{
        flexGrow: 1,
        width: "100%",
        maxWidth: "900px",
        m: "auto",
        mt: "10px",
      }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            {/* <Item>xs=4</Item> */}
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <nav aria-label="main mailbox folders">
                <List>
                  <ListItem>
                    <Link href="/client/vcs/">
                      <ListItemButton selected={router.asPath === "/client/vcs"}>
                        <ListItemText primary="Virtual Churches" />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="/client/profile/">
                      <ListItemButton selected={router.asPath === "/client/profile"}>
                        <ListItemText primary="Profile" />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="/client/billing/">
                      <ListItemButton selected={router.asPath === "/client/billing"}>
                        <ListItemText primary="Billing" />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                </List>
              </nav>
            </Box>
          </Grid>
          <Grid item xs={9}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}