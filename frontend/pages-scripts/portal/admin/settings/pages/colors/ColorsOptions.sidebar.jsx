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

import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import RealTimeSwitchRow from '@/components/realtime/SwitchRow/SwitchRow.realtime';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import RealTimeColorPickerRow from '@/components/realtime/ColorPickerRow/ColorPickerRow.realtime';
import ColorPaletteModal from './modal/ColorPaletteModal';
import { SettingColorsContext } from './context/SettingColors.context';
import { postSettingColorsGraphQL } from './store/settingColors_upsertOne.store';


function WebsiteSettingsColorsSidebar() {
  const theme = useTheme();
  const router = useRouter()

  const { setLeftDrawer, idChip, panelMeetingDoc, setPanelMeetingDoc } = React.useContext(AdminLayoutContext)
  const {
    isLoaded,
    id,
    entity,
    modals,
    setModals,
    color1,
    color2,
    color3,
    color4,
    color5,
    color6,
    color7,
    updateColor1,
    updateColor2,
    updateColor3,
    updateColor4,
    updateColor5,
    updateColor6,
    updateColor7,
    color1User,
    color2User,
    color3User,
    color4User,
    color5User,
    color6User,
    color7User,
    color1Light1,
    color1Light2,
    color1Light3,
    color1Light4,
    color1Dark1,
    color1Dark2,
    color1Dark3,
    color1Dark4,
    color2Light1,
    color2Light2,
    color2Light3,
    color2Light4,
    color2Dark1,
    color2Dark2,
    color2Dark3,
    color2Dark4,
    color3Light1,
    color3Light2,
    color3Light3,
    color3Light4,
    color3Dark1,
    color3Dark2,
    color3Dark3,
    color3Dark4,
    color4Light1,
    color4Light2,
    color4Light3,
    color4Light4,
    color4Dark1,
    color4Dark2,
    color4Dark3,
    color4Dark4,
    color5Light1,
    color5Light2,
    color5Light3,
    color5Light4,
    color5Dark1,
    color5Dark2,
    color5Dark3,
    color5Dark4,
    color6Light1,
    color6Light2,
    color6Light3,
    color6Light4,
    color6Dark1,
    color6Dark2,
    color6Dark3,
    color6Dark4,
    color7Light1,
    color7Light2,
    color7Light3,
    color7Light4,
    color7Dark1,
    color7Dark2,
    color7Dark3,
    color7Dark4,
    isReady,
    isReadyValue,
    setIsReadyValue,
  } = React.useContext(SettingColorsContext)


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

  const MenuStyle = {
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  }

  const handleColorPaletteOpen = () => {
    setModals(prevState => ({
      ...prevState,
      isColorPaletteModalOpened: true,
    }))

  }

  const handleSave = (event) => {
    postSettingColorsGraphQL({
      id,
      isReady: isReadyValue,

      color1,
      color2,
      color3,
      color4,
      color5,
      color6,
      color7,
      color1Light1,
      color1Light2,
      color1Light3,
      color1Light4,
      color1Dark1,
      color1Dark2,
      color1Dark3,
      color1Dark4,
      color2Light1,
      color2Light2,
      color2Light3,
      color2Light4,
      color2Dark1,
      color2Dark2,
      color2Dark3,
      color2Dark4,
      color3Light1,
      color3Light2,
      color3Light3,
      color3Light4,
      color3Dark1,
      color3Dark2,
      color3Dark3,
      color3Dark4,
      color4Light1,
      color4Light2,
      color4Light3,
      color4Light4,
      color4Dark1,
      color4Dark2,
      color4Dark3,
      color4Dark4,
      color5Light1,
      color5Light2,
      color5Light3,
      color5Light4,
      color5Dark1,
      color5Dark2,
      color5Dark3,
      color5Dark4,
      color6Light1,
      color6Light2,
      color6Light3,
      color6Light4,
      color6Dark1,
      color6Dark2,
      color6Dark3,
      color6Dark4,
      color7Light1,
      color7Light2,
      color7Light3,
      color7Light4,
      color7Dark1,
      color7Dark2,
      color7Dark3,
      color7Dark4,
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
            <HeaderRow label='Color selection' />
            <ListItem>
              <div>
                <br />

                <Button onClick={handleColorPaletteOpen} variant="contained" color="secondary">
                  Choose color palette
                </Button>
                <br />

              </div>
            </ListItem>
            
            <RealTimeColorPickerRow
              color={color1}
              setColor={updateColor1}
              user={color1User}
            />
            <RealTimeColorPickerRow
              color={color2}
              setColor={updateColor2}
              user={color2User}
            />
            <RealTimeColorPickerRow
              color={color3}
              setColor={updateColor3}
              user={color3User}
            />
            <RealTimeColorPickerRow
              color={color4}
              setColor={updateColor4}
              user={color4User}
            />
            <RealTimeColorPickerRow
              color={color5}
              setColor={updateColor5}
              user={color5User}
            />
            <RealTimeColorPickerRow
              color={color6}
              setColor={updateColor6}
              user={color6User}
            />
            <RealTimeColorPickerRow
              color={color7}
              setColor={updateColor7}
              user={color7User}
            />

            <br />


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

            <ColorPaletteModal
              open={modals.isColorPaletteModalOpened}
              onClose={() => setModals(prevState => ({
                ...prevState,
                isColorPaletteModalOpened: false,
              }))}
              onSelectPalette={(palette) => {
                if (palette?.colors?.length > 0) {
                  const color1 = palette.colors[0]
                  const color2 = palette.colors[1]
                  const color3 = palette.colors[2]
                  const color4 = palette.colors[3]
                  const color5 = palette.colors[4]
                  const color6 = palette.colors[5]
                  const color7 = palette.colors[6]

                  updateColor1(color1)
                  updateColor2(color2)
                  updateColor3(color3)
                  updateColor4(color4)
                  updateColor5(color5)
                  updateColor6(color6)
                  updateColor7(color7)
                }
              }}
            />













          </List>

        </>
      )}
    </>
  );
}

export default WebsiteSettingsColorsSidebar