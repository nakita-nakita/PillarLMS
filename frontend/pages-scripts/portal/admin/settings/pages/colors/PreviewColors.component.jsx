import React, { useContext } from 'react';
import { Box, Grid, Paper, Button, Typography } from '@mui/material';
import ColorPaletteComponent from '@/components/global/ColorPalette/ColorPalette.component';
import { SettingColorsContext } from './context/SettingColors.context';


const PreviewColors = () => {
  const {
    isLoaded,
    color1,
    color1Dark1,
    color1Dark2,
    color1Dark3,
    color1Dark4,
    color1Light1,
    color1Light2,
    color1Light3,
    color1Light4,
    color2,
    color2Dark1,
    color2Dark2,
    color2Dark3,
    color2Dark4,
    color2Light1,
    color2Light2,
    color2Light3,
    color2Light4,
    color3,
    color3Dark1,
    color3Dark2,
    color3Dark3,
    color3Dark4,
    color3Light1,
    color3Light2,
    color3Light3,
    color3Light4,
    color4,
    color4Dark1,
    color4Dark2,
    color4Dark3,
    color4Dark4,
    color4Light1,
    color4Light2,
    color4Light3,
    color4Light4,
    color5,
    color5Dark1,
    color5Dark2,
    color5Dark3,
    color5Dark4,
    color5Light1,
    color5Light2,
    color5Light3,
    color5Light4,
    color6,
    color6Dark1,
    color6Dark2,
    color6Dark3,
    color6Dark4,
    color6Light1,
    color6Light2,
    color6Light3,
    color6Light4,
    color7,
    color7Dark1,
    color7Dark2,
    color7Dark3,
    color7Dark4,
    color7Light1,
    color7Light2,
    color7Light3,
    color7Light4,

  } = useContext(SettingColorsContext)

  return (
    <>
      {isLoaded && (
        <>
          <Box sx={{ flexGrow: 1, width: "100%", maxWidth: "900px", m: "auto", p: 2, minHeight: "350px" }}>
            <ColorPaletteComponent
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
          </Box>
        </>
      )}
    </>
  )
}

export default PreviewColors;
