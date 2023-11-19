'use client'
// Libraries
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Mine
// import { getSavedUser, user } from '../../components/admin/utils/user';
import AdminLayoutPage from './layout/AdminLayoutPage';
import { AdminLayoutProvider } from './layout/adminLayout.context';
import { initSocket, setSocketId } from '@/utils/realtime/socket';
import WebsiteSettingLayout from '../websiteSettingsLayout/layout';
import PageBuilderLayout from '../pageBuilderLayout/layout';

// MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';
import WhoIsOnPageSockets from './sockets/WhoIsOnPageSockets';
import NotificationSockets from './sockets/NotificationsSockets';
import MeetingSockets from './sockets/MeetingSockets';
import SameDocBuffer from '@/components/realtime/_buffer/SameDocBuffer.context';
import SameDocEntity from '@/components/realtime/_buffer/SameDocEntity.context';

// Icons

let theme = createTheme({
  palette: {
    primary: {

      light: '#629AB8',
      main: '#6d9891',
      // light: '#63ccff',
      // main: '#009be5',
      dark: '#154D6C',
    },
    secondary: {

      light: '#DDDACA',
      main: '#dd826f',
      // light: '#63ccff',
      // main: '#009be5',
      dark: '#908D7D',
    },
    night: {
      light: '#E6E6E6',  // Light gray
      main: '#333333',   // Dark gray
      dark: '#000000',   // Black
    },
    day: {
      light: '#FFFFFF',  // White
      main: '#FFFFFF',   // White
      dark: '#FFFFFF',   // White
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#eaeff1',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const drawerWidth = 350;

export default function AdminLayout({
  isCourseBuilder,
  isWebsiteSetting,
  isPageBuilder,
  SideMenu,
  hasNoEntity,
  PageContext,
  ...props
}) {

  const [connected, setConnected] = useState(false)
  const router = useRouter();

  useEffect(() => {

    let socket = initSocket()

    socket.on('server-socket-id', ({ id }) => {
      setSocketId(id)
      setConnected(true)
    })

    return () => {
      socket.off('server-socket-id')
    }
  }, [])

  const RenderLayouts = () => {
    return (
      <>
        {isPageBuilder && (<PageBuilderLayout {...props} />)}
        {isWebsiteSetting && (<WebsiteSettingLayout SideMenu={SideMenu} {...props} />)}
        {!isWebsiteSetting && !isPageBuilder && (<AdminLayoutPage {...props} />)}
      </>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      {connected && (

        <SameDocBuffer>
          <SameDocEntity>
            <AdminLayoutProvider hasNoEntity={hasNoEntity}>
              <WhoIsOnPageSockets>
                <NotificationSockets>
                  <MeetingSockets>
                    {/* {isCourseBuilder && ()} */}
                    {!PageContext && <RenderLayouts />}
                    {PageContext && <PageContext><RenderLayouts /></PageContext>}
                  </MeetingSockets>
                </NotificationSockets>
              </WhoIsOnPageSockets>
            </AdminLayoutProvider>
          </SameDocEntity>
        </SameDocBuffer>
      )}
    </ThemeProvider>
  );
}

export const ___theme = theme
