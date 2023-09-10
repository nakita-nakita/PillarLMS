import * as React from 'react';

// MUI
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "400px",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

export default function SelectionModal({ modalTitle, isOpened, onClose, children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  React.useEffect(() => {
    setOpen(isOpened)
  }, [isOpened])


  return (
    <div>
      <Modal
        open={open}

        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ width: "100%", background: theme.palette.primary.main, color: theme.palette.primary.contrastText, p: 2 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {modalTitle}
            </Typography>

          </Box>
          <Box sx={{ width: "100%", p: 2 }}>
            {children}
            <div>
              <br />
              <Button
                sx={{ float: "right" }}
                onClick={handleClose}
              // variant="contained"
              // sx={{ background: theme.palette.primary.main, color: theme.palette.primary.contrastText, borderColor: theme.palette.error.contrastText }}
              >
                Cancel
              </Button>

            </div>
          </Box>

          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            We cannot find a creator account, but we found a student account. If this is a problem, please contact your tech support!
          </Typography>
          <br />
          <GatsbyLink to="/app/dashboard">
            Go to student portal
          </GatsbyLink> */}
        </Box>
      </Modal >
    </div >
  );
}