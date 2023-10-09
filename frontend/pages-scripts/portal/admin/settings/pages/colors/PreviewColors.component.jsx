import React from 'react';
import { Box, Grid, Paper, Button, Typography } from '@mui/material';
import chroma from 'chroma-js';

const boxStyles = {
  width: "120px",
  height: "120px",
  mr: "5px",
}

const PreviewColors = () => {
  const colors = ["#003049", "#d62828", "#f77f00", "#fcbf49", "#eae2b7"];

  // Generate 10 shades from light to dark for each color
  const generateShades = (baseColor) => {
    return chroma.scale([chroma(baseColor).brighten(3), baseColor, chroma(baseColor).darken(3)]).colors(10);
  }

  const grayShades = chroma.scale(["#f7f7f7", "#444444"]).colors(10);
  const blackShades = ["#000000", "#222222", "#444444"];
  const whiteShades = ["#ffffff", "#f7f7f7", "#efefef"];

  return (
    <Box sx={{ flexGrow: 1, width: "100%", maxWidth: "900px", m: "auto", p: 2, minHeight: "350px" }}>
      <br />
      <Paper elevation={3} sx={{ p: 2 }}>
        <br />
        <Grid container spacing={2}>
          {colors.map(color => (
            <Grid item xs={2} key={color} sx={{ ...boxStyles, backgroundColor: color }} />
          ))}
        </Grid>
      </Paper>

      {colors.map((color, idx) => (
        <Box key={idx} mt={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="body1">{`Color ${idx + 1} shaded.`}</Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              {generateShades(color).map(shade => (
                <Box key={shade} sx={{ width: "35px", height: "35px", backgroundColor: shade, border: "1px solid black" }} />
              ))}
            </Box>
          </Paper>
        </Box>
      ))}

      {/* Displaying gray shades */}
      <Box mt={3}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="body1">Gray Shades</Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            {grayShades.map(gray => (
              <Box key={gray} sx={{ width: "35px", height: "35px", backgroundColor: gray, border: "1px solid black" }} />
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Displaying black shades */}
      <Box mt={3}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="body1">Black Shades</Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            {blackShades.map(black => (
              <Box key={black} sx={{ width: "35px", height: "35px", backgroundColor: black, border: "1px solid black" }} />
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Displaying white shades */}
      <Box mt={3}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="body1">White Shades</Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            {whiteShades.map(white => (
              <Box key={white} sx={{ width: "35px", height: "35px", backgroundColor: white, border: "1px solid black" }} />
            ))}
          </Box>
        </Paper>
      </Box>

    </Box>
  )
}

export default PreviewColors;
