// Library
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// mine
import MainSiteLayout from '@/layouts/mainSiteLayout/layout';
import DynamicComponent from '@/components/previews/DynamicComponent/DynamicComponent.component';
import { useTheme } from '@mui/material';

const PreviewComponentPage = () => {
  const router = useRouter()
  const theme = useTheme()

  const [webAssetImport, setWebAssetImport] = useState()
  const [backgroundColor, setBackgroundColor] = useState()

  useEffect(() => {
    const { webAssetImport: webAssetQueryParam, mode: modeQueryParam } = router.query;

    // Check if the query parameter is present before setting the state
    if (webAssetQueryParam) {
      setWebAssetImport(webAssetQueryParam.toString());

      switch (modeQueryParam.toString()) {
        case "night":
          setBackgroundColor(theme.palette.grey[800])
          break;
        case "day":
          setBackgroundColor(theme.palette.grey[200])
          break;

        default:
          setBackgroundColor(theme.palette.grey[800])
          break;
      }
    }


  }, [router.query]);

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        minHeight: "390px",
      }}
    >
      {webAssetImport && (
        <DynamicComponent
          filePath={webAssetImport}
        />
      )}
      <br />
      <br />
      <br />
    </div>
  );
};

PreviewComponentPage.getLayout = function getLayout(page) {
  return (
    <MainSiteLayout
      hasNoEntity
    >
      {page}
    </MainSiteLayout>
  );
};

export default PreviewComponentPage;
