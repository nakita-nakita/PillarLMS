'use client'

import React, { useContext, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import Badge from '@mui/material/Badge';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import SettingsBackButton from '../../components/BackButton/BackButton.component';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { realtimeLink } from '@/utils/realtime/link';

import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
// import NavLinks from '../../components/NavLinks/NavLinks.component';
// import NavLinksWrapper from '../../components/NavLinks/NavLinksWrapper.component';
import TopBar from '../../components/NavLinks/TopBar.component';
import dynamic from 'next/dynamic';
import { ListItemSecondaryAction } from '@mui/material';
import NavLinksWrapper from '../../components/NavLinks/NavLinksWrapper.component';
// import RealTimeSwitchRow from '@/components/realtime/SwitchRow/SwitchRow.realtime';
// import RealTimeRadioRow from '@/components/realtime/RadioRow/RadioRow.realtime';
// import RealTimeTextFieldRow from '@/components/realtime/TextFieldRow/TextField.realtime';
// import RealTimeResortLockedRow from '@/components/realtime/LockResortRow/LockResort.realtime';
// import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
// import RealTimeColorPickerRow from '@/components/realtime/ColorPickerRow/ColorPickerRow.realtime';
import { SettingFooterContext } from './context/SettingFooter.context';
import SelectFooterModal from './modals/SelectFooter.modal';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import RealTimeMenu from '@/components/realtime/RealTimeMenu/RealTimeMenu';
import RealTimeSwitchRow from '@/components/realtime/SwitchRow/SwitchRow.realtime';
import { getSocketId, initSocket } from '@/utils/realtime/socket';

// const DynamicNavLinksWrapper = dynamic(() => import('../../components/NavLinks/NavLinksWrapper.component'), {
//   ssr: false,
// });

function WebsiteSettingsFooterSidebar() {
  const theme = useTheme();
  const router = useRouter()

  const { setLeftDrawer, idChip, panelMeetingDoc, setPanelMeetingDoc } = useContext(AdminLayoutContext)
  const {
    isLoaded,
    isDarkMode,
    setIsDarkMode,
    entity,
    menu,
    isReady,
    isReadyValue, setIsReadyValue,
    isSelectionModalOpened,
    setIsSelectionModalOpened,
    changeFooter,
    saveFooter,
    setAnswer,
  } = useContext(SettingFooterContext)

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

  const handleFooterSelectionModal = () => {
    setIsSelectionModalOpened(true)
  }

  const handleFooterSelect = (info) => {
    changeFooter(info)
  }

  const handleSave = () => {
    saveFooter()
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0, mb: "50px" }}>
      <SettingsBackButton
        label={"Main Menu"}
        href={"/portal/admin/settings/website/settings"}
      />
      <Divider component="li" style={{ borderTopWidth: "12px" }} />

      {isLoaded && (
        <>

          {/* <NavLinksWrapper /> */}


          <HeaderRow label={"Select Footer"} />
          <ListItem>
            <div>

              <p>Explore the marketplace to find your desired footer. Please note that available options might vary based on your footer choice.</p>
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={handleFooterSelectionModal}
              >
                Choose Footer
              </Button>
              <br />

            </div>
          </ListItem>
          <Divider component="li" style={{ borderTopWidth: "12px" }} />


          <RealTimeMenu
            entity={entity}
            menu={menu?.menu}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            onChangeByUser={(propInfo) => {
              const socket = initSocket()

              socket.emit('server-setting-footer-change-prop', propInfo)
            }}
            setAnswer={setAnswer}
          />





          {/* <Divider component="li" style={{ borderTopWidth: "5px" }} /> */}
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
        </>
      )}

      {/* 
      <Divider component="li" style={{ borderTopWidth: "12px" }} />
      <HeaderRow label={"Select colors"} />
      <RealTimeColorPickerRow label={"Main color"} />
      <RealTimeColorPickerRow label={"Main text color"} />
      <RealTimeColorPickerRow label={"Menu color"} />
      <RealTimeColorPickerRow label={"Menu text color"} />
      <RealTimeColorPickerRow label={"Hover menu color"} />
      <RealTimeColorPickerRow label={"Hover menu text color"} />
      <RealTimeColorPickerRow label={"Social media icons color"} />
      <RealTimeColorPickerRow label={"Sign In button color"} />
      <RealTimeColorPickerRow label={"Sign In hover button color"} />


      <Divider component="li" style={{ borderTopWidth: "12px" }} />
      <HeaderRow label={"Branding"} />
      <RealTimeRadioRow id="radio" label="Text" />
      <RealTimeRadioRow id="radio" label="Image" />
      <RealTimeTextFieldRow label={"Brand Text"} />


      <Divider component="li" style={{ borderTopWidth: "12px" }} />
      <TopBar />
      <RealTimeResortLockedRow />


      <Divider component="li" style={{ borderTopWidth: "12px" }} />
      <HeaderRow label={"Social Media Buttons"} />
      <RealTimeSwitchRow id="status" label={(
        <>
          Twitter
        </>
      )} />
      <RealTimeSwitchRow id="status" label={(
        <>
          Facebook
        </>
      )} />
      <RealTimeSwitchRow id="status" label={(
        <>
          Instagram
        </>
      )} />
      <RealTimeSwitchRow id="status" label={(
        <>
          Whatsapp
        </>
      )} />
      <RealTimeSwitchRow id="status" label={(
        <>
          Telegram
        </>
      )} />




      <Divider component="li" style={{ borderTopWidth: "12px" }} />
      <HeaderRow label={"Advance Settings"} />
      <RealTimeSwitchRow id="status" label={(
        <>
          <div style={circleStatusSuccessStyle}></div>
          &nbsp;
          <span>Status</span>
        </>
      )} />
      <RealTimeSwitchRow id="status" label={(
        <>
          Show client sign in button
        </>
      )} />
      <Divider component="li" style={{ borderTopWidth: "12px" }} />








      <ListItem alignItems="flex-start">
        <ListItemText
          // primary="Advance Settings"
          secondary={
            <React.Fragment>
              <br />
              <Button variant="contained">Save</Button>
            </React.Fragment>
          }
        />
      </ListItem> */}








      <SelectFooterModal
        modalFooter={"Select Footer"}
        isOpened={isSelectionModalOpened}
        onClose={() => setIsSelectionModalOpened(false)}
        onSelect={handleFooterSelect}
      />



    </List >
  );
}

export default WebsiteSettingsFooterSidebar