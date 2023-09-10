import * as React from 'react';
// import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/material/FormLabel';
// import FormHelperText from '@mui/joy/FormHelperText';
// import Select from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function MetaUpload() {
  return (
    <>
      {/* <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button">
        Picture
      </FormLabel> */}

      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          component="label"
        >
          Upload File
          <input
            type="file"
            hidden
          />
        </Button>
        <Button>Clear</Button>
      </Stack>
      <div style={{ display: "table", border: "5px solid black", padding: "3px", marginTop: "5px", marginBottom: "5px" }}>
        <img style={{ height: "150px", width: "150px" }} />
      </div>
    </>
  );
}