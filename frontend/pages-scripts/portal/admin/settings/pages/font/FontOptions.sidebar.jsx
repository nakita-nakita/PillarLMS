'use client'

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { useTheme, styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import SettingsBackButton from '../../components/BackButton/BackButton.component';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import RealTimeSwitchRow from '@/components/realtime/SwitchRow/SwitchRow.realtime';
import { SettingFontContext } from './context/SettingFont.context';


function GoogleFontSelector({ fonts, selectedFont, onChange }) {
  return (
    <>
      <HeaderRow label={"Select Google Font"} />
      <FormControl fullWidth>
        <InputLabel id="font-selector-label">Font</InputLabel>
        <Select
          labelId="font-selector-label"
          id="font-selector"
          value={selectedFont}
          onChange={onChange}
          variant="outlined"
        >
          {fonts.map((font) => {
            const fontInfo = fonts.find((f) => f.family === font.family);
            const variants = fontInfo?.variants || [];

            console.log('variants', variants)
            return (
              <div key={font.family}>
                <MenuItem value={font}>
                  {font.family} {variants.join(', ')}
                </MenuItem>
                {variants.map((variant) => (
                  <MenuItem key={`${font.family}-${variant}`} value={`${font.family}-${variant}`}>
                    &nbsp;&nbsp;&nbsp;&nbsp;{variant}
                  </MenuItem>
                ))}
              </div>
            );
          })}
        </Select>
      </FormControl>
      <Divider component="li" style={{ borderTopWidth: "5px" }} />
    </>
  );
}

function CircleStatus({ isReadyValue, theme }) {
  const circleStatusStyle = {
    borderRadius: "50px",
    height: "15px",
    width: "15px",
    display: "inline-block",
    backgroundColor: isReadyValue ? theme.palette.success.dark : theme.palette.error.dark,
  };

  return (
    <>
      <div style={circleStatusStyle}></div>
      &nbsp;
      <span>Ready?</span>
    </>
  );
}

function WebsiteSettingsFontSidebar() {
  const theme = useTheme();
  const {
    isLoaded, setLoaded,
    entity,
    isReady,
    isReadyValue, setIsReadyValue,
    modals,
  } = React.useContext(SettingFontContext);

  const [fonts, setFonts] = React.useState([]);
  const [selectedFont, setSelectedFont] = React.useState('');

  // Fetch Google Fonts data from API
  React.useEffect(() => {
    const fetchGoogleFonts = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_FONT_API_KEY;
      try {
        const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`);
        const data = await response.json();
        const fontItems = data.items || [];
        setFonts(fontItems);
      } catch (error) {
        console.error('Error fetching Google Fonts:', error);
      }
    };

    fetchGoogleFonts();
  }, []);

  const handleFontChange = (event) => {
    setSelectedFont(event.target.value);
  };

  const handleSaved = () => {
    // postSettingSiteGraphQL({
    //   id,
    //   favicon: faviconValue,
    //   tab: tabValue,
    //   isReady: isReadyValue,
    // })
  };

  return (
    <>
      {isLoaded && (
        <>
          <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
            <SettingsBackButton
              label={"Main Menu"}
              href={"/portal/admin/settings/website/settings"}
            />

            <Divider component="li" style={{ borderTopWidth: "12px" }} />

            {/* Google Font UI */}
            <GoogleFontSelector
              fonts={fonts}
              selectedFont={selectedFont}
              onChange={handleFontChange}
            />

            {/* Status */}
            <HeaderRow label={"Status"} />
            <RealTimeSwitchRow
              id="status"
              label={<CircleStatus isReadyValue={isReadyValue} theme={theme} />}
              data={isReady}
              entity={entity}
              onChange={(value) => {
                setIsReadyValue(value);
              }}
            />

            <Divider component="li" style={{ borderTopWidth: "5px" }} />

            <ListItem alignItems="flex-start">
              <ListItemText
                secondary={
                  <React.Fragment>
                    <br />
                    <Button
                      variant="contained"
                      onClick={handleSaved}
                      color="primary"
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

export default WebsiteSettingsFontSidebar;
