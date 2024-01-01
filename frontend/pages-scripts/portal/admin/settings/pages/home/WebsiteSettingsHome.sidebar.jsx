'use client'
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Badge from '@mui/material/Badge';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import WebsiteSettingLayoutContext from '@/layouts/websiteSettingsLayout/WebsiteSettingLayout.context';
import SettingsBackButton from '../../components/BackButton/BackButton.component';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { realtimeLink } from '@/utils/realtime/link';
import { Box } from '@mui/material';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';

function WebsiteSettingsHomeSidebar() {
  const websiteLayoutContext = React.useContext(WebsiteSettingLayoutContext)
  const theme = useTheme();
  const router = useRouter()

  const { navigate } = React.useContext(AdminLayoutContext)


  const circleStatus = {
    borderRadius: "50px",
    height: "15px",
    width: "15px",
  }

  const circleStatusDangerStyle = {
    ...circleStatus,
    backgroundColor: theme.palette.error.dark,
  }

  const circleStatusSuccessStyle = {
    ...circleStatus,
    backgroundColor: theme.palette.success.dark,
  }

  const MenuStyle = {
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
      <SettingsBackButton
        label={"Back to settings"}
        href={"/portal/admin/settings/website"}
        isPrimary
      />
      {/* <ListItemButton
          onClick={() => navigate("/portal/admin/settings/website")}
          sx={{
            // backgroundColor: theme.palette.grey[100],
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
  
          <ListItem
            sx={{
              py: 1,
              px: 2,
            }}
          >
            <ListItemText>
              <div style={{ display: "flex" }}>
                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}>
  
                  <div style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    color: theme.palette.grey[100],
                    height: "35px",
                  }}>
                    <ArrowBackIcon sx={{ mr: 1 }} />
                  </div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexDirection: "column",
                    color: theme.palette.grey[300]
                  }}>
  
                    <Typography color="inherit" variant="h6" component="h2"
                      style={{
                        lineHeight: 1.1,
                        textDecoration: "underline",
                      }}
                    >
                      Back to settings
                    </Typography>
                  </div>
                </div>
              </div>
  
  
  
            </ListItemText>
          </ListItem>
        </ListItemButton> */}


      {/* <br /> */}
      <HeaderRow
        label='Branding'
      />
      <ListItemButton onClick={() => navigate("/portal/admin/settings/website/settings/colors")} sx={MenuStyle}>

        <ListItem
          alignItems="flex-start"
          secondaryAction={(
            <div style={circleStatusDangerStyle}></div>
          )}>
          <ListItemAvatar>
            <Box width={35} height={35}>
              <img alt="browser icon" src="\admin\icons\icons8-colors-64.png" width="100%" height="100%" />
            </Box>
          </ListItemAvatar>
          <ListItemText
            primary="Colors"
            secondary={
              <React.Fragment>
                {/* <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                  </Typography> */}
                Pick your brand colors
              </React.Fragment>
            }
          />
        </ListItem>
      </ListItemButton>
      <Divider variant="inset" component="li" />
      <ListItemButton onClick={() => navigate("/portal/admin/settings/website/settings/background-color")} sx={MenuStyle}>

        <ListItem
          alignItems="flex-start"
          secondaryAction={(
            <div style={circleStatusDangerStyle}></div>
          )}>
          <ListItemAvatar>
            <Box width={35} height={35}>
              <img alt="browser icon" src="\admin\icons\icons8-sheet-of-paper-48.png" width="100%" height="100%" />
            </Box>
          </ListItemAvatar>
          <ListItemText
            primary="Background Color"
            secondary={
              <React.Fragment>
                {/* <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                  </Typography> */}
                Pick your background color
              </React.Fragment>
            }
          />
        </ListItem>
      </ListItemButton>
      <Divider variant="inset" component="li" />
      <ListItemButton onClick={() => navigate("/portal/admin/settings/website/settings/font")} sx={MenuStyle}>

        <ListItem
          alignItems="flex-start"
          secondaryAction={(
            <div style={circleStatusSuccessStyle}></div>
          )}
        >
          <ListItemAvatar>
            <Box width={35} height={35}>
              <img alt="column icon" src="\admin\icons\icons8-font-100.png" width="100%" height="100%" />
            </Box>
          </ListItemAvatar>
          <ListItemText
            primary="Font"
            secondary={
              <React.Fragment>
                {/* <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Status
                  </Typography> */}
                Website font selection
              </React.Fragment>
            }
          />
        </ListItem>
      </ListItemButton>

      <HeaderRow
        label='Website'
      />
      <ListItemButton onClick={() => navigate("/portal/admin/settings/website/settings/header")} sx={MenuStyle}>

        <ListItem
          alignItems="flex-start"
          secondaryAction={(
            <div style={circleStatusSuccessStyle}></div>
          )}
        >
          <ListItemAvatar>
            <ListItemAvatar>
              <Box width={35} height={35}>
                <img alt="header icon" src="\admin\icons\icons8-nav-96.png" width="100%" height="100%" />
              </Box>
            </ListItemAvatar>
          </ListItemAvatar>
          <ListItemText
            primary="Header"
            secondary={
              <React.Fragment>
                {/* <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Status
                  </Typography> */}
                The top of the website
              </React.Fragment>
            }
          />
        </ListItem>
      </ListItemButton>

      <Divider variant="inset" component="li" />
      <ListItemButton onClick={() => navigate("/portal/admin/settings/website/settings/footer")} sx={MenuStyle}>

        <ListItem
          alignItems="flex-start"
          secondaryAction={(
            <div style={circleStatusSuccessStyle}></div>
          )}
        >
          <ListItemAvatar>
            <Box width={35} height={35}>
              <img alt="footer icon" src="\admin\icons\icons8-footer-100.png" width="100%" height="100%" />
            </Box>
          </ListItemAvatar>
          <ListItemText
            primary="Footer"
            secondary={
              <React.Fragment>
                {/* <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Status
                  </Typography> */}
                The bottom of the website
              </React.Fragment>
            }
          />
        </ListItem>
      </ListItemButton>

      <Divider variant="inset" component="li" />
      <ListItemButton onClick={() => navigate("/portal/admin/settings/website/settings/column")} sx={MenuStyle}>

        <ListItem
          alignItems="flex-start"
          secondaryAction={(
            <div style={circleStatusSuccessStyle}></div>
          )}
        >
          <ListItemAvatar>
            <Box width={35} height={35}>
              <img alt="column icon" src="\admin\icons\icons8-column-48.png" width="100%" height="100%" />
            </Box>
          </ListItemAvatar>
          <ListItemText
            primary="Column"
            secondary={
              <React.Fragment>
                {/* <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Status
                  </Typography> */}
                The desktop monitor sizing
              </React.Fragment>
            }
          />
        </ListItem>
      </ListItemButton>




      <HeaderRow
        label='Meta Data'
      />
      <ListItemButton onClick={() => navigate("/portal/admin/settings/website/settings/browser-tabs")} sx={MenuStyle}>

        <ListItem
          alignItems="flex-start"
          secondaryAction={(
            <div style={circleStatusSuccessStyle}></div>
          )}
        >
          <ListItemAvatar>
            <Box width={35} height={35}>
              <img alt="browser tab icon" src="\admin\icons\icons8-apps-tab-48.png" width="100%" height="100%" />
            </Box>
          </ListItemAvatar>
          <ListItemText
            primary="Browser Tabs"
            secondary={
              <React.Fragment>
                {/* <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Status
                  </Typography> */}
                Extra website styles
              </React.Fragment>
            }
          />
        </ListItem>
      </ListItemButton>









      <Divider variant="inset" component="li" />
      <ListItemButton onClick={() => navigate("/portal/admin/settings/website/settings/link")} sx={MenuStyle}>

        <ListItem
          alignItems="flex-start"
          secondaryAction={(
            <div style={circleStatusSuccessStyle}></div>
          )}
        >
          <ListItemAvatar>
            <Box width={35} height={35}>
              <img alt="link icon" src="\admin\icons\icons8-link-48.png" width="100%" height="100%" />
            </Box>
          </ListItemAvatar>
          <ListItemText
            primary="Links"
            secondary={
              <React.Fragment>
                {/* <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Status
                  </Typography> */}
                When people send links between each other
              </React.Fragment>
            }
          />
        </ListItem>
      </ListItemButton>

      {/* <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Sandra Adams
                </Typography>
                {' — Do you have Paris recommendations? Have you ever…'}
              </React.Fragment>
            }
          />
        </ListItem> */}
    </List>
  );
}

export default WebsiteSettingsHomeSidebar