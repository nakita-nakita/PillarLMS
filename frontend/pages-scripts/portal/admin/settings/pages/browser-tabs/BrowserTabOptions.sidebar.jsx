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
import { useTheme, styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import WebsiteSettingLayoutContext from '@/layouts/websiteSettingsLayout/WebsiteSettingLayout.context';
import SettingsBackButton from '../../components/BackButton/BackButton.component';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { realtimeLink } from '@/utils/realtime/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import RealTimeSwitchRow from '@/components/realtime/SwitchRow/SwitchRow.realtime';
// import RealTimeTextFieldRow from '@/components/realtime/TextFieldRow/TextField.realtime';
import StarIcon from '@mui/icons-material/Star';
import { SettingSiteContext } from './context/SettingSite.context';
import dynamic from 'next/dynamic';
import RealTimeFaviconSelectionRow from '@/components/realtime/FaviconSelectRow/faviconSelection.realtime';
import postSettingSitePreviewApi from './store/settingSite_previewFavicon.api';
import { getSocketId } from '@/utils/realtime/socket';
import { postSettingSiteGraphQL } from './store/settingSite_upsertOne.store';
const DynamicRealTimeTextField = dynamic(() => import('@/components/realtime/TextFieldRow/TextField.realtime'), {
  ssr: false
});


const TabBox = styled(Paper)(({ theme }) => ({
  position: "relative",
  width: "270px",
  padding: "10px",
  height: "50px",
  // margin: "1em auto 50px",
  // textAlign: "center",
  color: "black",
  background: "#e5e5ea",
  borderRadius: "10px",
  // "& :before": {
  //   content: "",
  //   position: "absolute",
  //   zIndex: 2,
  //   top: "7px",
  //   left: "-8px",
  //   height: "20px",
  //   borderLeft: "20px solid #e5e5ea",
  //   borderBottomRightRadius: "16px 14px",
  // },
  // "& :after": {
  //   content: "",
  //   position: "absolute",
  //   zIndex: 3,
  //   top: "7px",
  //   left: "4px",
  //   width: "26px",
  //   height: "20px",
  //   background: "white",
  //   borderTopRightRadius: "14px",
  // },


  // display: 'flex',
  // alignItems: 'center',
  // padding: theme.spacing(0, 1),
  // // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
  // justifyContent: 'flex-end',
}));


function WebsiteSettingsBrowserTabSidebar() {
  const websiteLayoutContext = React.useContext(WebsiteSettingLayoutContext)
  const theme = useTheme();
  const router = useRouter()

  const { setLeftDrawer, idChip, panelMeetingDoc, setPanelMeetingDoc } = React.useContext(AdminLayoutContext)

  const {
    isLoaded, setLoaded,
    id, setId,
    entity, setEntity,
    favicon, setFavicon,
    faviconValue, setFaviconValue,
    tab, setTab,
    tabValue, setTabValue,
    isReady, setIsReady,
    isReadyValue, setIsReadyValue,
    modals, setModals,
  } = React.useContext(SettingSiteContext)

  const changeUrl = (href) => {
    // router.push(href)
    realtimeLink({
      to: href,
      leaderUserId: panelMeetingDoc.leader?.id,
      meetingId: panelMeetingDoc.id,
      router,
      userId: idChip.id,
      setPanelMeetingDoc,

    })
  }

  const circleStatus = {
    borderRadius: "50px",
    height: "15px",
    width: "15px",
    display: "inline-block"
  }

  const circleStatusDangerStyle = {
    ...circleStatus,
    backgroundColor: theme.palette.error.dark,
  }

  const circleStatusSuccessStyle = {
    ...circleStatus,
    backgroundColor: theme.palette.success.dark,
  }

  const handleSaved = () => {
    postSettingSiteGraphQL({
      id,
      favicon: faviconValue,
      tab: tabValue,
      isReady: isReadyValue,
    })
  }

  return (
    <>
      {isLoaded && (
        <>
          <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
            <SettingsBackButton
              label={"Main Menu"}
              href={"/portal/admin/settings/website/settings"}
            />


            <Divider component="li" style={{ borderTopWidth: "5px" }} />
            <HeaderRow label={"Browser Tab Options"} />
            <br />
            <DynamicRealTimeTextField
              label={"Enter a brief identifier for your organization."}
              entity={entity}
              data={tab}
              onTextUpdate={(text) => {
                setTabValue(text)
              }}
            />
            <ListItem>
              <div>
                <br />
                <p>Favicon</p>
              </div>
            </ListItem>

            <RealTimeFaviconSelectionRow
              entity={entity}
              data={favicon}
              onFileSubmit={event => {
                return postSettingSitePreviewApi({
                  event,
                  entity,
                  name: favicon?.name,
                  socketId: getSocketId(),
                })
              }}
              onChange={faviconUpdate => {
                if (faviconUpdate === undefined) {
                  faviconUpdate = favicon.currentSelection.favicon
                }

                setFaviconValue(faviconUpdate)
              }}
            />
            {/* <ListItem alignItems="flex-start">
              <div>

                <br />
                <p>Favicon</p>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" component="label" color="primary">
                    Select
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                  <Button variant="contained" component="label" color="secondary">
                    Upload
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                </Stack>
                <br />
                <StarIcon />

              </div>
            </ListItem> */}

            <Divider component="li" style={{ borderTopWidth: "5px" }} />
            <HeaderRow label={"Status"} />
            <RealTimeSwitchRow id="status" label={(
              <>
                <div style={isReadyValue ? circleStatusSuccessStyle : circleStatusDangerStyle}></div>
                &nbsp;
                <span>Ready?</span>
              </>
            )}
              data={isReady}
              entity={entity}
              onChange={(value) => {
                setIsReadyValue(value)
              }}
            />


            <Divider component="li" style={{ borderTopWidth: "5px" }} />

            <ListItem alignItems="flex-start">
              <ListItemText
                // primary="Advance Settings"
                secondary={
                  <React.Fragment>
                    <br />
                    <Button 
                    variant="contained"
                    onClick={handleSaved}
                    >
                      Save
                      </Button>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </>
      )}
    </>
  );
}

export default WebsiteSettingsBrowserTabSidebar