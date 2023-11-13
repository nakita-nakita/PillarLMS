import React, { useContext, useEffect, useRef } from 'react';
import SelectionHeader from '@/components/modals/diamondComponents/SelectionHeader';
import Typography from '@mui/material/Typography';
import { SettingHeaderContext } from '../context/SettingHeader.context';
import DeviceEmulator from '@/components/previews/DeviceEmulators/DeviceEmulators.component';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const BuiltInHeaderDisplay = () => {
  const { builtInDataSelected, selectComponent, getNextComponent, getPreviousComponent } = useContext(SettingHeaderContext);

  const handleLeftClick = () => {
    const component = getPreviousComponent();

    selectComponent({
      id: component.id,
    })

  }

  const handleRightClick = () => {
    const component = getNextComponent();

    selectComponent({
      id: component.id,
    })
  }
  // const iframeRef = useRef(null);

  // useEffect(() => {
  //   const adjustIframeHeight = (event) => {
  //     console.log('hit')
  //     if (iframeRef.current && event.data && event.data.height) {
  //       iframeRef.current.style.height = event.data.height + 'px';
  //     }
  //   };

  //   window.addEventListener('message', adjustIframeHeight);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener('message', adjustIframeHeight);
  //   };
  // }, [builtInDataSelected]);

  return (
    <div>
      <SelectionHeader header={builtInDataSelected.name} subheader={builtInDataSelected.author} 
      onLeftButtonClick={handleLeftClick}
      onRightButtonClick={handleRightClick}
      />

      {/* Show a Component (Background Color Div) */}
      {/* <Box sx={{ padding: '20px', bgcolor: 'lightgray' }}>
        <Typography>Show a Component</Typography>
      </Box> */}

      <DeviceEmulator
        src={`/portal/previewer/component?webAssetImport=${builtInDataSelected.webAssetImport}`}
      />
      {/* <iframe
        ref={iframeRef}
        src={`/portal/previewer/component?webAssetImport=${builtInDataSelected.webAssetImport}`}
        width="100%"
        height="350px"
        style={{ border: 0 }}
        onLoad={() => {
          const iframeWindow = iframeRef.current.contentWindow;
          const contentHeight = iframeWindow.document.body.scrollHeight;
          iframeWindow.postMessage({ height: contentHeight }, '*');
        }}
      /> */}

      {/* Details */}
      <br />
      <div style={{padding: "20px"}}>
        <Stack spacing={2} direction="row">
          {/* <Button variant="contained" color="secondary">
            Select
          </Button> */}
          <Button variant="contained" color="primary">
            Select and Close
          </Button>
        </Stack>
        <br />
        <Typography variant="body1">
          <strong>Description:</strong>
          <br />
          {builtInDataSelected?.description}
        </Typography>
        <br />
        <Typography variant="body1">
          <strong>Author:</strong> {builtInDataSelected?.author}
        </Typography>
        {builtInDataSelected?.authorLink && (
          <Typography variant="body1">
            <strong>Author Link:</strong> {builtInDataSelected.authorLink}
          </Typography>
        )}
        <br />
        <Typography variant="body1">
          <strong>Name:</strong> {builtInDataSelected?.name}
        </Typography>
        <Typography variant="body1">
          <strong>Category:</strong> {builtInDataSelected?.category}
        </Typography>
        <Typography variant="body1">
          <strong>Theme:</strong> {builtInDataSelected?.theme}
        </Typography>
        <br />
        <br />
        <br />

      </div>
    </div>
  );
};

export default BuiltInHeaderDisplay;
