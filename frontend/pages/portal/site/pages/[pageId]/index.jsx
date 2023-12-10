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
// import AddCircleIcon from '@mui/icons-material/AddCircleIcon';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AdminLayout from '@/layouts/admin/layout';
import { Box, Button, FormControl, FormControlLabel, FormGroup, IconButton, MenuItem, Select, Switch } from '@mui/material';
import PagePanelsDnd from '@/layouts/pageBuilderLayout/components/components/PagePanelsDnD';
import SettingsBackButton from '@/pages-scripts/portal/admin/settings/components/BackButton/BackButton.component';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import RealTimeSwitchRow from '@/components/realtime/SwitchRow/SwitchRow.realtime';
import PageList from '@/layouts/pageBuilderLayout/components/components/PageList/PageList';
import RealTimeResortLockedRow from '@/components/realtime/LockResortRow/LockResort.realtime';
import { realtimeLink } from '@/utils/realtime/link';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import DeletePageListItem from '@/pages-scripts/portal/site/pages/page/delete/components/DeletePageListItem';
import { useRouter } from 'next/router';
// import PageDeignerLayoutContext from '../../pageDesignerLayout.context';

const PageBuilderPage = () => {
  // const pageDesignerLayoutContext = React.useContext(PageDesignerLayoutContext)
  const { setTabs, idChip, panelMeetingDoc, setPanelMeetingDoc } = React.useContext(AdminLayoutContext)

  const theme = useTheme();
  const router = useRouter()

  const changeUrl = (to) => {

    realtimeLink({
      to,
      meetingId: panelMeetingDoc.id,
      leaderUserId: panelMeetingDoc.leader?.id,
      router,
      setPanelMeetingDoc,
      userId: idChip.id,
    })


  }

  const changeSlide = (slide, main) => {
    // pageDesignerLayoutContext.setLeftDrawer(prevState => ({
    //   ...prevState,
    //   slide,
    //   main,
    // }))
  }

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
    display: "inline-block",
  }

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', p: 0 }}>
      <SettingsBackButton
        label={"Main Menu"}
        href={"/portal/site/pages/"}
      />


      <Divider component="li" style={{ borderTopWidth: "12px" }} />
      <HeaderRow label={"Page Selections"} />


      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete" color="primary" sx={{ pr: "12px" }}>
            <AddCircleIcon />
          </IconButton>
        }
        sx={{
          background: theme.palette.grey[200]
        }}
      >
        <ListItemText
          primary="Panels"
        // secondary={secondary ? 'Secondary text' : null}
        />
      </ListItem>
      <Divider component="li" />
      {/* <PagePanelsDnd /> */}
      {/* <ListItem>
                <ListItemText
                  primary={(<em>Nothing here</em>)}
                // secondary={secondary ? 'Secondary text' : null}
                />
              </ListItem> */}
      <PageList />
      <RealTimeResortLockedRow />

      <Divider component="li" style={{ borderTopWidth: "12px" }} />
      <HeaderRow label={"Meta Data"} />

      <ListItem
        button
        alignItems="flex-start"
        onClick={() => changeUrl(`/portal/site/pages/${router.query.pageId}/browser-tabs/`)}
      >
        <ListItemAvatar>
          <Box width={35} height={35}>
            <img alt="browser icon" src="\admin\icons\icons8-header-100.png" width="100%" height="100%" />
          </Box>
        </ListItemAvatar>
        <ListItemText
          primary="Browser Tabs"
          secondary="Extra website styles"
        />
      </ListItem>
      <Divider component="li" style={{ borderTopWidth: "1px" }} />

      <ListItem
        button
        alignItems="flex-start"
        onClick={() => changeUrl(`/portal/site/pages/${router.query.pageId}/link/`)}
      >
        <ListItemAvatar>

          <Box width={35} height={35}>
            <img alt="page link" src="\admin\icons\icons8-links-64.png" width="100%" height="100%" />
          </Box> </ListItemAvatar>
        <ListItemText
          primary="Links"
          secondary="When people send links between each other"
        />
      </ListItem>
      <Divider component="li" style={{ borderTopWidth: "12px" }} />

      <HeaderRow label={"Danger Zone"} />
      <DeletePageListItem onClick={() => changeUrl(`/portal/site/pages/${router.query.pageId}/delete`)} />
      <Divider component="li" style={{ borderTopWidth: "12px" }} />

      <HeaderRow label={"Advance Settings"} />
      <RealTimeSwitchRow id="status" label={(
        <>
          <div style={circleStatusSuccessStyle}></div>
          &nbsp;
          <span>Status</span>
        </>
      )} />

      <Divider component="li" style={{ borderTopWidth: "12px" }} />
      <ListItem alignItems="flex-start">
        {/* <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar> */}
        <ListItemText
          // primary="Advance Settings"
          secondary={
            <React.Fragment>
              <br />
              <Button variant="contained">Save</Button>
            </React.Fragment>
          }
        />
      </ListItem>

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


PageBuilderPage.getLayout = function getLayout(page) {
  return (
    <AdminLayout isPageBuilder>
      {page}
    </AdminLayout>
  )
}
export default PageBuilderPage