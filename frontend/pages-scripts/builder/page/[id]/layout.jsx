'use client'

// Libraries
import * as React from 'react';


// MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';

// Icons
import PageBuilderLayout from './pageDesignerLayout';
import { PageDesignerLayoutProvider } from './pageDesignerLayout.context';
import { AdminLayoutProvider } from '../../../vc/layout/adminLayout.context';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


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

export default function BuilderLayout(props) {
  return (
    <ThemeProvider theme={theme}>
      <PageDesignerLayoutProvider>
        <AdminLayoutProvider>
          <PageBuilderLayout {...props} />
        </AdminLayoutProvider>
      </PageDesignerLayoutProvider>
      {/* <SiteDesignerProvider> */}
      {/* <AdminLayoutProvider > */}
      {/* {children} */}
      {/* <AdminLayoutPage {...props} /> */}
      {/* </AdminLayoutProvider> */}
      {/* </SiteDesignerProvider> */}
    </ThemeProvider>
  );
}

export const ___theme = theme
