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
import RealTimeSwitchRow from '@/components/realtime/SwitchRow/SwitchRow.realtime';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
// import RealTimeTextFieldRow from '@/components/realtime/TextFieldRow/TextField.realtime';
import { SettingLinkContext } from './context/SettingLink.context';
import dynamic from 'next/dynamic';
import { getSocketId } from '@/utils/realtime/socket';
import RealTimePictureSelectionRow from '@/components/realtime/PictureSelectRow/pictureSelection.realtime';
import postSettingLinkPreviewApi from './store/settingLink_previewImage.api';
import postSettingLinkApi from './store/settingLink_saveImage.api';
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


function WebsiteSettingsLinkSidebar() {
  const {
    isLoaded,
    entity,
    id,
    title,
    titleValue,
    setTitleValue,
    description,
    descriptionValue,
    setDescriptionValue,
    image,
    imageValue,
    setImageValue,
    currentImage,
    isReady,
    isReadyValue,
    setIsReadyValue,
  } = React.useContext(SettingLinkContext)

  const theme = useTheme();
  const router = useRouter()

  const { setLeftDrawer, idChip, panelMeetingDoc, setPanelMeetingDoc } = React.useContext(AdminLayoutContext)

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
    display: "inline-block",
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

  const handleSave = (event) => {
    postSettingLinkApi({
      id,
      descriptionValue,
      imageValue,
      isReadyValue,
      titleValue
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
            <HeaderRow label={"Social Link Data"} />
            <DynamicRealTimeTextField
              label={"Title"}
              data={title}
              entity={entity}

              onTextUpdate={(text) => {
                setTitleValue(text)
              }}

            />
            <DynamicRealTimeTextField
              label={"Description"}
              data={description}
              entity={entity}
              onTextUpdate={(text) => {
                setDescriptionValue(text)
              }}
            />

            <br />
            <ListItem>
              <div>
                <p>
                  Image
                </p>
              </div>
            </ListItem>



            <RealTimePictureSelectionRow
              entity={entity}
              data={image}
              onFileSubmit={event => {
                return postSettingLinkPreviewApi({
                  event,
                  entity,
                  name: image.name,
                  socketId: getSocketId(),
                })
              }}

              onChange={picture => {
                if (picture === undefined) {
                  picture = currentImage
                }

                setImageValue(picture)
              }}
            />
            {/* <ListItem alignItems="flex-start">
              <div>

                <br />
                <p>Picture</p>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" component="label" color="secondary">
                    Upload
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                  <Button>
                    Clear
                  </Button>
                </Stack>
                <br />
              </div>
            </ListItem> */}


            <Divider component="li" style={{ borderTopWidth: "5px" }} />
            <HeaderRow label={"Status"} />
            <RealTimeSwitchRow
              label={(
                <>
                  <div style={isReadyValue ? circleStatusSuccessStyle : circleStatusDangerStyle}></div>
                  &nbsp;
                  <span>Ready?</span>
                </>
              )}
              // label, data, entity, onChange
              data={isReady}
              entity={entity}
              onChange={(value) => {
                setIsReadyValue(value)
                console.log('contents to be saved', value)
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
                      onClick={handleSave}
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

export default WebsiteSettingsLinkSidebar