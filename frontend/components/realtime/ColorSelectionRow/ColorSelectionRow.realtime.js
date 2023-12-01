// 'use client'

import React, { useContext, useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import UserChip from '@/components/chip/user.chip';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import ColorPaletteComponent from '@/components/global/ColorPalette/ColorPalette.component';
import { getOneSettingColorsGraphQL } from './store/settingColors_getOne.store';
import { useTheme } from '@mui/material';
import { initSocket } from '@/utils/realtime/socket';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';

function RealTimeColorSelectionRow({ label, data, entity, containerLabel, onChange, onChangeByUser }) {
  const theme = useTheme()

  const { idChip } = useContext(AdminLayoutContext)

  const [selectedColor, setSelectedColor] = useState(data.color.color || '#000000');
  useEffect(() => {
    if (onChange) onChange(selectedColor.color);

  }, [selectedColor])
  const [anchorEl, setAnchorEl] = useState(null);


  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState(data.user)
  const [color1, setColor1] = useState("#fff")
  const [color1Dark1, setColor1Dark1] = useState("#fff")
  const [color1Dark2, setColor1Dark2] = useState("#fff")
  const [color1Dark3, setColor1Dark3] = useState("#fff")
  const [color1Dark4, setColor1Dark4] = useState("#fff")
  const [color1Light1, setColor1Light1] = useState("#fff")
  const [color1Light2, setColor1Light2] = useState("#fff")
  const [color1Light3, setColor1Light3] = useState("#fff")
  const [color1Light4, setColor1Light4] = useState("#fff")
  const [color2, setColor2] = useState("#fff")
  const [color2Dark1, setColor2Dark1] = useState("#fff")
  const [color2Dark2, setColor2Dark2] = useState("#fff")
  const [color2Dark3, setColor2Dark3] = useState("#fff")
  const [color2Dark4, setColor2Dark4] = useState("#fff")
  const [color2Light1, setColor2Light1] = useState("#fff")
  const [color2Light2, setColor2Light2] = useState("#fff")
  const [color2Light3, setColor2Light3] = useState("#fff")
  const [color2Light4, setColor2Light4] = useState("#fff")
  const [color3, setColor3] = useState("#fff")
  const [color3Dark1, setColor3Dark1] = useState("#fff")
  const [color3Dark2, setColor3Dark2] = useState("#fff")
  const [color3Dark3, setColor3Dark3] = useState("#fff")
  const [color3Dark4, setColor3Dark4] = useState("#fff")
  const [color3Light1, setColor3Light1] = useState("#fff")
  const [color3Light2, setColor3Light2] = useState("#fff")
  const [color3Light3, setColor3Light3] = useState("#fff")
  const [color3Light4, setColor3Light4] = useState("#fff")
  const [color4, setColor4] = useState("#fff")
  const [color4Dark1, setColor4Dark1] = useState("#fff")
  const [color4Dark2, setColor4Dark2] = useState("#fff")
  const [color4Dark3, setColor4Dark3] = useState("#fff")
  const [color4Dark4, setColor4Dark4] = useState("#fff")
  const [color4Light1, setColor4Light1] = useState("#fff")
  const [color4Light2, setColor4Light2] = useState("#fff")
  const [color4Light3, setColor4Light3] = useState("#fff")
  const [color4Light4, setColor4Light4] = useState("#fff")
  const [color5, setColor5] = useState("#fff")
  const [color5Dark1, setColor5Dark1] = useState("#fff")
  const [color5Dark2, setColor5Dark2] = useState("#fff")
  const [color5Dark3, setColor5Dark3] = useState("#fff")
  const [color5Dark4, setColor5Dark4] = useState("#fff")
  const [color5Light1, setColor5Light1] = useState("#fff")
  const [color5Light2, setColor5Light2] = useState("#fff")
  const [color5Light3, setColor5Light3] = useState("#fff")
  const [color5Light4, setColor5Light4] = useState("#fff")
  const [color6, setColor6] = useState("#fff")
  const [color6Dark1, setColor6Dark1] = useState("#fff")
  const [color6Dark2, setColor6Dark2] = useState("#fff")
  const [color6Dark3, setColor6Dark3] = useState("#fff")
  const [color6Dark4, setColor6Dark4] = useState("#fff")
  const [color6Light1, setColor6Light1] = useState("#fff")
  const [color6Light2, setColor6Light2] = useState("#fff")
  const [color6Light3, setColor6Light3] = useState("#fff")
  const [color6Light4, setColor6Light4] = useState("#fff")
  const [color7, setColor7] = useState("#fff")
  const [color7Dark1, setColor7Dark1] = useState("#fff")
  const [color7Dark2, setColor7Dark2] = useState("#fff")
  const [color7Dark3, setColor7Dark3] = useState("#fff")
  const [color7Dark4, setColor7Dark4] = useState("#fff")
  const [color7Light1, setColor7Light1] = useState("#fff")
  const [color7Light2, setColor7Light2] = useState("#fff")
  const [color7Light3, setColor7Light3] = useState("#fff")
  const [color7Light4, setColor7Light4] = useState("#fff")


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;



  useEffect(() => {
    getOneSettingColorsGraphQL().then(response => {
      const initData = response.data.backendSettingColors_getOne

      setColor1(initData.color1)
      setColor1Dark1(initData.color1Dark1)
      setColor1Dark2(initData.color1Dark2)
      setColor1Dark3(initData.color1Dark3)
      setColor1Dark4(initData.color1Dark4)
      setColor1Light1(initData.color1Light1)
      setColor1Light2(initData.color1Light2)
      setColor1Light3(initData.color1Light3)
      setColor1Light4(initData.color1Light4)
      setColor2(initData.color2)
      setColor2Dark1(initData.color2Dark1)
      setColor2Dark2(initData.color2Dark2)
      setColor2Dark3(initData.color2Dark3)
      setColor2Dark4(initData.color2Dark4)
      setColor2Light1(initData.color2Light1)
      setColor2Light2(initData.color2Light2)
      setColor2Light3(initData.color2Light3)
      setColor2Light4(initData.color2Light4)
      setColor3(initData.color3)
      setColor3Dark1(initData.color3Dark1)
      setColor3Dark2(initData.color3Dark2)
      setColor3Dark3(initData.color3Dark3)
      setColor3Dark4(initData.color3Dark4)
      setColor3Light1(initData.color3Light1)
      setColor3Light2(initData.color3Light2)
      setColor3Light3(initData.color3Light3)
      setColor3Light4(initData.color3Light4)
      setColor4(initData.color4)
      setColor4Dark1(initData.color4Dark1)
      setColor4Dark2(initData.color4Dark2)
      setColor4Dark3(initData.color4Dark3)
      setColor4Dark4(initData.color4Dark4)
      setColor4Light1(initData.color4Light1)
      setColor4Light2(initData.color4Light2)
      setColor4Light3(initData.color4Light3)
      setColor4Light4(initData.color4Light4)
      setColor5(initData.color5)
      setColor5Dark1(initData.color5Dark1)
      setColor5Dark2(initData.color5Dark2)
      setColor5Dark3(initData.color5Dark3)
      setColor5Dark4(initData.color5Dark4)
      setColor5Light1(initData.color5Light1)
      setColor5Light2(initData.color5Light2)
      setColor5Light3(initData.color5Light3)
      setColor5Light4(initData.color5Light4)
      setColor6(initData.color6)
      setColor6Dark1(initData.color6Dark1)
      setColor6Dark2(initData.color6Dark2)
      setColor6Dark3(initData.color6Dark3)
      setColor6Dark4(initData.color6Dark4)
      setColor6Light1(initData.color6Light1)
      setColor6Light2(initData.color6Light2)
      setColor6Light3(initData.color6Light3)
      setColor6Light4(initData.color6Light4)
      setColor7(initData.color7)
      setColor7Dark1(initData.color7Dark1)
      setColor7Dark2(initData.color7Dark2)
      setColor7Dark3(initData.color7Dark3)
      setColor7Dark4(initData.color7Dark4)
      setColor7Light1(initData.color7Light1)
      setColor7Light2(initData.color7Light2)
      setColor7Light3(initData.color7Light3)
      setColor7Light4(initData.color7Light4)

      setIsLoaded(true)
    })
  }, [])


  const handleSelect = (update) => {
    const socket = initSocket()
    const newColor = {
      color: update,
      suggestedTextColor: theme.palette.getContrastText(update) === "#fff" ? "LIGHT" : "DARK",
    }

    setSelectedColor(update)

    socket.emit('server-samedoc-color-selection-change', {
      entity,
      name: data.name,
      color: newColor,
    })

    setUser(idChip)
    
    if (onChangeByUser) {
      onChangeByUser(newColor)
    }
  }

  useEffect(() => {
    const socket = initSocket()

    socket.on('samedoc-color-selection-change', update => {
      if (update.entity === entity && update.name === data.name) {

        setSelectedColor(update.color.color)
        setUser(update.user)

        // if (onChange) {
        //   onChange(update.color)
        // }
      }
    })

    return () => {
      socket.off('samedoc-color-selection-change')
    }
  }, [])

  return (
    <>
      <ListItem sx={{ pb: 0 }}>
        <p>{label}</p>
      </ListItem>
      <ListItem>
        <Box display="flex" alignItems="center" width="100%">

          {/* Color Box with Shadow */}
          <Box
            bgcolor={selectedColor}
            boxShadow="0px 0px 5px rgba(0, 0, 0, 0.2)"
            borderRadius="4px"
            width="30px"
            height="30px"
            marginRight="10px"
            sx={{ cursor: "pointer" }}
            onClick={handleClick}
          />


          {/* Middle Text Box: It will grow and shrink as required */}
          <Box
            display="flex"
            alignItems="center"
            flexGrow={1}
            overflow="hidden"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 5,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {selectedColor}
          </Box>

          {/* Chip Component */}
          {user && (
            <UserChip
              callByType={user.callByType}
              circleColor={user.circleColor}
              displayName={user.displayName}
              email={user.email}
              firstName={user.firstName}
              labelColor={user.labelColor}
              lastName={user.lastName}
              picturePreview={user.picture}
              username={user.username}
            />
          )}

        </Box>
      </ListItem>

      {/* Popover Content */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            width: '300px',
            border: `3px solid ${theme.palette.grey[900]}`,
          },
        }}
      >
        {isLoaded && (
          <>
            <h6 style={{
              padding: "10px 15px",
              background: theme.palette.primary.main,
              color: theme.palette.getContrastText(theme.palette.primary.main)
            }}>
              {`${containerLabel} ${label}`}
            </h6>
            <ColorPaletteComponent
              onSelect={handleSelect}
              isSelectable
              color={data.color.color}
              color1={color1}
              color1Dark1={color1Dark1}
              color1Dark2={color1Dark2}
              color1Dark3={color1Dark3}
              color1Dark4={color1Dark4}
              color1Light1={color1Light1}
              color1Light2={color1Light2}
              color1Light3={color1Light3}
              color1Light4={color1Light4}
              color2={color2}
              color2Dark1={color2Dark1}
              color2Dark2={color2Dark2}
              color2Dark3={color2Dark3}
              color2Dark4={color2Dark4}
              color2Light1={color2Light1}
              color2Light2={color2Light2}
              color2Light3={color2Light3}
              color2Light4={color2Light4}
              color3={color3}
              color3Dark1={color3Dark1}
              color3Dark2={color3Dark2}
              color3Dark3={color3Dark3}
              color3Dark4={color3Dark4}
              color3Light1={color3Light1}
              color3Light2={color3Light2}
              color3Light3={color3Light3}
              color3Light4={color3Light4}
              color4={color4}
              color4Dark1={color4Dark1}
              color4Dark2={color4Dark2}
              color4Dark3={color4Dark3}
              color4Dark4={color4Dark4}
              color4Light1={color4Light1}
              color4Light2={color4Light2}
              color4Light3={color4Light3}
              color4Light4={color4Light4}
              color5={color5}
              color5Dark1={color5Dark1}
              color5Dark2={color5Dark2}
              color5Dark3={color5Dark3}
              color5Dark4={color5Dark4}
              color5Light1={color5Light1}
              color5Light2={color5Light2}
              color5Light3={color5Light3}
              color5Light4={color5Light4}
              color6={color6}
              color6Dark1={color6Dark1}
              color6Dark2={color6Dark2}
              color6Dark3={color6Dark3}
              color6Dark4={color6Dark4}
              color6Light1={color6Light1}
              color6Light2={color6Light2}
              color6Light3={color6Light3}
              color6Light4={color6Light4}
              color7={color7}
              color7Dark1={color7Dark1}
              color7Dark2={color7Dark2}
              color7Dark3={color7Dark3}
              color7Dark4={color7Dark4}
              color7Light1={color7Light1}
              color7Light2={color7Light2}
              color7Light3={color7Light3}
              color7Light4={color7Light4}
            />
          </>
        )}
      </Popover>
    </>
  );
}

export default RealTimeColorSelectionRow;
