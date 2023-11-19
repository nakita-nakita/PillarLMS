import React from 'react';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { List } from '@mui/material';

const DiamondModal = ({ modalHeader, isOpened, onClose, modalText, builtInSidemenuComponent, builtInDisplayComponent }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(isOpened);

  const handleClose = (event) => {
    if (onClose) {
      onClose(event);
    }
  };

  React.useEffect(() => {
    setOpen(isOpened);
  }, [isOpened]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100vw",
    height: "100vh",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    color: theme.palette.grey[700],

  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <div
        style={{
          ...style,
          background: theme.palette.grey[200],
          // padding: '20px',
          boxShadow: theme.shadows[5],
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Row 1: Modal Header and Close Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: "10px 5px 10px 12px" }}>
          <Typography variant="h6" style={{ color: theme.palette.grey[800] }}>
            {modalHeader}
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              // padding: 1,
              borderRadius: "5px",
              backgroundColor: theme.palette.error.dark,
              color: theme.palette.grey[100],
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        {/* Row 2: Tabs */}
        <Tabs
          value={0}

          onChange={() => { }}
          sx={{
            backgroundColor: theme.palette.grey[700],
            // color: theme.palette.grey[200],
            m: 0,
          }}
        >
          <Tab
            label="Built-in"
            sx={{
              color: theme.palette.grey[200],
              minWidth: 'auto',
              '&.Mui-selected': {
                color: theme.palette.common.white,
              },
            }}
          />
          <Tab
            label="Library"
            sx={{
              color: theme.palette.grey[200],
              minWidth: 'auto',
              '&.Mui-selected': {
                color: theme.palette.common.white,
              },
            }}
          />
          <Tab
            label="Favorites"
            sx={{
              color: theme.palette.grey[200],
              minWidth: 'auto',
              '&.Mui-selected': {
                color: theme.palette.common.white,
              },
            }}
          />
          <Tab
            label="New"
            sx={{
              color: theme.palette.grey[200],
              minWidth: 'auto',
              '&.Mui-selected': {
                color: theme.palette.common.white,
              },
            }}
          />
        </Tabs>

        {/* Row 3: Left and Right Columns */}
        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>



          <Grid container spacing={2}>
            {/* Left column for selection */}
            <Grid item xs={3} sx={{
              height: "calc(100vh - 96px)",
            }}>

              {/* Left Column */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  // backgroundColor: "blue"
                }}
              >
                <List
                  sx={{
                    p: 0,
                  }}
                >
                  {builtInSidemenuComponent}
                </List>
              </Box>
            </Grid>

            {/* Right column for the main display */}
            <Grid item xs={9} sx={{
              overflowY: 'auto',
              height: "calc(100vh - 96px)",
              borderLeft: `1px solid ${theme.palette.grey[400]}`,
              padding: "0 !important",
            }}>

              {/* Right Column */}
              {builtInDisplayComponent}

              {/* <div>
                <SelectionHeader />


                <iframe src="about:blank" width={"100%"} style={{border: 0}} />

                <div>
                  <br />
                  <Typography variant="body1">Description: Lorem ipsum dolor sit amet...</Typography>
                  <br />
                  <Typography variant="body1">Author: John Doe</Typography>
                  <Typography variant="body1">Author Link: website.com</Typography>
                  <br />
                  <Typography variant="body1">Name: Simple Buttons</Typography>
                  <Typography variant="body1">Category: Plain Headers</Typography>
                  <Typography variant="body1">Theme: Default</Typography>

                </div>
              </div> */}
            </Grid>
          </Grid>




        </Box>
      </div>
    </Modal>
  );
};

export default DiamondModal;
