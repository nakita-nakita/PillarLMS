import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const greys = [
  "#f1f1f1", "#e0e0e0", "#cfcfcf",
  "#b0b0b0", "#9e9e9e", "#7d7d7d",
  "#616161", "#424242", "#212121", "#000000"
];

const whites = ["#FFFFFF", "#F5F5F5", "#EBEBEB"];
const blacks = ["#212121", "#121212", "#000000"];

const ColorPaletteComponent = ({
  isSelectable,
  onSelect,
  color,
  color1,
  color1Light1,
  color1Light2,
  color1Light3,
  color1Light4,
  color1Dark1,
  color1Dark2,
  color1Dark3,
  color1Dark4,
  color2,
  color2Light1,
  color2Light2,
  color2Light3,
  color2Light4,
  color2Dark1,
  color2Dark2,
  color2Dark3,
  color2Dark4,
  color3,
  color3Light1,
  color3Light2,
  color3Light3,
  color3Light4,
  color3Dark1,
  color3Dark2,
  color3Dark3,
  color3Dark4,
  color4,
  color4Light1,
  color4Light2,
  color4Light3,
  color4Light4,
  color4Dark1,
  color4Dark2,
  color4Dark3,
  color4Dark4,
  color5,
  color5Light1,
  color5Light2,
  color5Light3,
  color5Light4,
  color5Dark1,
  color5Dark2,
  color5Dark3,
  color5Dark4,
  color6,
  color6Light1,
  color6Light2,
  color6Light3,
  color6Light4,
  color6Dark1,
  color6Dark2,
  color6Dark3,
  color6Dark4,
  color7,
  color7Light1,
  color7Light2,
  color7Light3,
  color7Light4,
  color7Dark1,
  color7Dark2,
  color7Dark3,
  color7Dark4,
}) => {

  const [selectedColor, setSelectedColor] = useState(color)

  const [colors, setColors] = useState([
    "#FF5733", "#33FF57", "#5733FF",
    "#FF33F6", "#FF8333", "#33FF83",
    "#8333FF"
  ])

  const createLight1Row = () => {
    return (color1Light1 ? [
      color1Light1,
      color2Light1,
      color3Light1,
      color4Light1,
      color5Light1,
      color6Light1,
      color7Light1,
    ] : [...colors])
  }

  const createLight2Row = () => {
    return (color1Light2 ? [
      color1Light2,
      color2Light2,
      color3Light2,
      color4Light2,
      color5Light2,
      color6Light2,
      color7Light2,
    ] : [...colors])
  }

  const createLight3Row = () => {
    return (color1Light3 ? [
      color1Light3,
      color2Light3,
      color3Light3,
      color4Light3,
      color5Light3,
      color6Light3,
      color7Light3,
    ] : [...colors])
  }

  const createLight4Row = () => {
    return (color1Light4 ? [
      color1Light4,
      color2Light4,
      color3Light4,
      color4Light4,
      color5Light4,
      color6Light4,
      color7Light4,
    ] : [...colors])
  }

  const createDark1Row = () => {
    return (color1Dark1 ? [
      color1Dark1,
      color2Dark1,
      color3Dark1,
      color4Dark1,
      color5Dark1,
      color6Dark1,
      color7Dark1,
    ] : [...colors])
  }

  const createDark2Row = () => {
    return (color1Dark2 ? [
      color1Dark2,
      color2Dark2,
      color3Dark2,
      color4Dark2,
      color5Dark2,
      color6Dark2,
      color7Dark2,
    ] : [...colors])
  }

  const createDark3Row = () => {
    return (color1Dark3 ? [
      color1Dark3,
      color2Dark3,
      color3Dark3,
      color4Dark3,
      color5Dark3,
      color6Dark3,
      color7Dark3,
    ] : [...colors])
  }

  const createDark4Row = () => {
    return (color1Dark4 ? [
      color1Dark4,
      color2Dark4,
      color3Dark4,
      color4Dark4,
      color5Dark4,
      color6Dark4,
      color7Dark4,
    ] : [...colors])
  }

  const [light1Row, setLight1Row] = useState(createLight1Row())
  const [light2Row, setLight2Row] = useState(createLight2Row())
  const [light3Row, setLight3Row] = useState(createLight3Row())
  const [light4Row, setLight4Row] = useState(createLight4Row())
  const [dark1Row, setDark1Row] = useState(createDark1Row())
  const [dark2Row, setDark2Row] = useState(createDark2Row())
  const [dark3Row, setDark3Row] = useState(createDark3Row())
  const [dark4Row, setDark4Row] = useState(createDark4Row())

  useEffect(() => {
    if (color1 || color2 || color3 || color4 || color5 || color6 || color7) {
      setColors([
        color1,
        color2,
        color3,
        color4,
        color5,
        color6,
        color7,
      ])
      setLight1Row(createLight1Row())
      setLight2Row(createLight2Row())
      setLight3Row(createLight3Row())
      setLight4Row(createLight4Row())
      setDark1Row(createDark1Row())
      setDark2Row(createDark2Row())
      setDark3Row(createDark3Row())
      setDark4Row(createDark4Row())
    }
  }, [color1, color2, color3, color4, color5, color6, color7])

  const handleSelection = (color) => {
    setSelectedColor(color)

    if (onSelect) {
      onSelect(color)
    }
  }

  return (
    <Paper elevation={3}>
      <Box p={2}>

        {/* First Row - Color Palette */}
        <Typography variant="h6">Color Palette</Typography>
        <Box mt={1} display="flex" justifyContent="space-between">
          {colors.map((color, index) => (
            <Box
              key={index}
              bgcolor={color}
              width={1 / colors.length}
              height={50}
              onClick={() => handleSelection(color)}
              sx={{ cursor: isSelectable ? 'pointer' : "default", border: selectedColor === color ? "2px solid #212121" : "2px solid #f1f4f5", transition: 'opacity 0.3s' }}
            ></Box>
          ))}
        </Box>

        {/* Second Row - Shades */}
        <Typography variant="h6" mt={2}>Shades</Typography>

        <Box display="flex" flexDirection="row" justifyContent="space-between">
          {light1Row.map((color, index) => (
            <Box
              key={index}
              bgcolor={color}
              width={1 / colors.length}
              height={25}
              onClick={() => handleSelection(color)}
              sx={{ cursor: isSelectable ? 'pointer' : "default", border: selectedColor === color ? "2px solid #212121" : "2px solid #f1f4f5", transition: 'opacity 0.3s' }}
            ></Box>
          ))}
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          {light2Row.map((color, index) => (
            <Box
              key={index}
              bgcolor={color}
              width={1 / colors.length}
              height={25}
              onClick={() => handleSelection(color)}
              sx={{ cursor: isSelectable ? 'pointer' : "default", border: selectedColor === color ? "2px solid #212121" : "2px solid #f1f4f5", transition: 'opacity 0.3s' }}
            ></Box>
          ))}
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          {light3Row.map((color, index) => (
            <Box
              key={index}
              bgcolor={color}
              width={1 / colors.length}
              height={25}
              onClick={() => handleSelection(color)}
              sx={{ cursor: isSelectable ? 'pointer' : "default", border: selectedColor === color ? "2px solid #212121" : "2px solid #f1f4f5", transition: 'opacity 0.3s' }}
            ></Box>
          ))}
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          {light4Row.map((color, index) => (
            <Box
              key={index}
              bgcolor={color}
              width={1 / colors.length}
              height={25}
              onClick={() => handleSelection(color)}
              sx={{ cursor: isSelectable ? 'pointer' : "default", border: selectedColor === color ? "2px solid #212121" : "2px solid #f1f4f5", transition: 'opacity 0.3s' }}
            ></Box>
          ))}
        </Box>


        <Box display="flex" flexDirection="row" justifyContent="space-between">
          {colors.map((color, index) => (
            <Box
              key={index}
              bgcolor={color}
              width={1 / colors.length}
              height={25}
              onClick={() => handleSelection(color)}
              sx={{ cursor: isSelectable ? 'pointer' : "default", border: selectedColor === color ? "2px solid #212121" : "2px solid #f1f4f5", transition: 'opacity 0.3s' }}
            ></Box>
          ))}
        </Box>


        <Box display="flex" flexDirection="row" justifyContent="space-between">
          {dark1Row.map((color, index) => (
            <Box
              key={index}
              bgcolor={color}
              width={1 / colors.length}
              height={25}
              onClick={() => handleSelection(color)}
              sx={{ cursor: isSelectable ? 'pointer' : "default", border: selectedColor === color ? "2px solid #212121" : "2px solid #f1f4f5", transition: 'opacity 0.3s' }}
            ></Box>
          ))}
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          {dark2Row.map((color, index) => (
            <Box
              key={index}
              bgcolor={color} width={1 / colors.length}
              height={25}
              onClick={() => handleSelection(color)}
              sx={{ cursor: isSelectable ? 'pointer' : "default", border: selectedColor === color ? "2px solid #212121" : "2px solid #f1f4f5", transition: 'opacity 0.3s' }}
            ></Box>
          ))}
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          {dark3Row.map((color, index) => (
            <Box
              key={index}
              bgcolor={color}
              width={1 / colors.length}
              height={25}
              onClick={() => handleSelection(color)}
              sx={{ cursor: isSelectable ? 'pointer' : "default", border: selectedColor === color ? "2px solid #212121" : "2px solid #f1f4f5", transition: 'opacity 0.3s' }}
            ></Box>
          ))}
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          {dark4Row.map((color, index) => (
            <Box
              key={index}
              bgcolor={color}
              width={1 / colors.length}
              height={25}
              onClick={() => handleSelection(color)}
              sx={{ cursor: isSelectable ? 'pointer' : "default", border: selectedColor === color ? "2px solid #212121" : "2px solid #f1f4f5", transition: 'opacity 0.3s' }}
            ></Box>
          ))}
        </Box>

        {/* Third Row - Greys */}
        <Typography variant="h6" mt={2}>Grays</Typography>
        <Box mt={1} display="flex" justifyContent="space-between">
          {greys.map((grey, index) => (
            <Box
              key={index}
              bgcolor={grey}
              width={1 / 10}
              height={50}
              onClick={() => handleSelection(grey)}
              sx={{ cursor: isSelectable ? 'pointer' : "default", border: selectedColor === grey ? "2px solid #212121" : "2px solid #f1f4f5", transition: 'opacity 0.3s' }}
            ></Box>
          ))}
        </Box>

        <Box mt={2} display="flex" justifyContent="space-between">
          {whites.map((color, index) => (
            <Box
              key={index}
              bgcolor={color}
              width={1 / 10}
              height={50}
              onClick={() => handleSelection(color)}
              sx={{ cursor: isSelectable ? 'pointer' : "default", border: selectedColor === color ? "2px solid #212121" : "2px solid #f1f4f5", transition: 'opacity 0.3s' }}
            ></Box>
          ))}

          <Box width={4 / 10} height={50}></Box>

          {blacks.map((color, index) => (
            <Box
              key={index}
              bgcolor={color} width={1 / 10}
              height={50} onClick={() => handleSelection(color)}
              sx={{ cursor: isSelectable ? 'pointer' : "default", border: selectedColor === color ? "2px solid #212121" : "2px solid #f1f4f5", transition: 'opacity 0.3s' }}
            ></Box>
          ))}

        </Box>
      </Box>
    </Paper>
  );
};

export default ColorPaletteComponent;
