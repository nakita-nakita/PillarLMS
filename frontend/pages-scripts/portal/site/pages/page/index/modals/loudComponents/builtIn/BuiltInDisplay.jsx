import React, { useContext, } from 'react';
import SelectionHeader from '@/components/modals/diamondComponents/SelectionHeader';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DiamondDeviceEmulator from '@/components/previews/DeviceEmulators/DiamondDeviceEmulators';
import { SiteDesignerPageContext } from '../../../context/SiteDesignerPage.context';

const BuiltInDisplay = ({ onSelect }) => {

  const {
    loudSectionBuiltInSelected,
    selectLoudSectionComponent,
    getNextLoudSectionComponent,
    getPreviousLoudSectionComponent,
  } = useContext(SiteDesignerPageContext);

  const handleLeftClick = () => {
    const component = getPreviousLoudSectionComponent();

    selectLoudSectionComponent({
      id: component.id,
    })
  }

  const handleRightClick = () => {
    const component = getNextLoudSectionComponent();

    selectLoudSectionComponent({
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
  // }, [loudSectionBuiltInSelected]);

  const handleSelect = (event) => {
    if (onSelect) {

      onSelect({
        type: "BUILT_IN",
        id: loudSectionBuiltInSelected.id,
      })
    }
  }

  return (
    <div>
      <SelectionHeader header={loudSectionBuiltInSelected.name} subheader={loudSectionBuiltInSelected.author}
        onLeftButtonClick={handleLeftClick}
        onRightButtonClick={handleRightClick}
      />

      {/* Show a Component (Background Color Div) */}
      {/* <Box sx={{ padding: '20px', bgcolor: 'lightgray' }}>
        <Typography>Show a Component</Typography>
      </Box> */}

      <div className='p-4'>

        <DiamondDeviceEmulator
          src={`/portal/previewer/component?webAssetImport=${loudSectionBuiltInSelected.webAssetImport}`}
        />
        {/* <iframe
        ref={iframeRef}
        src={`/portal/previewer/component?webAssetImport=${loudSectionBuiltInSelected.webAssetImport}`}
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
        <div style={{ padding: "20px" }}>
          <Stack spacing={2} direction="row">
            {/* <Button variant="contained" color="secondary">
            Select
          </Button> */}
            <Button variant="contained" color="primary" onClick={event => handleSelect(event)}>
              Select and Close
            </Button>
          </Stack>
          <br />
          <Typography variant="body1">
            <strong>Description:</strong>
            <br />
            {loudSectionBuiltInSelected?.description}
          </Typography>
          <br />
          <Typography variant="body1">
            <strong>Author:</strong> {loudSectionBuiltInSelected?.author}
          </Typography>
          {loudSectionBuiltInSelected?.authorLink && (
            <Typography variant="body1">
              <strong>Author Link:</strong> {loudSectionBuiltInSelected.authorLink}
            </Typography>
          )}
          <br />
          <Typography variant="body1">
            <strong>Name:</strong> {loudSectionBuiltInSelected?.name}
          </Typography>
          {loudSectionBuiltInSelected?.category && (

            <Typography variant="body1">
              <strong>Category:</strong> {loudSectionBuiltInSelected.category}
            </Typography>
          )}
          {loudSectionBuiltInSelected?.theme && (

            <Typography variant="body1">
              <strong>Theme:</strong> {loudSectionBuiltInSelected.theme}
            </Typography>
          )}
          <br />
          <br />
          <br />

        </div>
      </div>
    </div>
  );
};

export default BuiltInDisplay;
