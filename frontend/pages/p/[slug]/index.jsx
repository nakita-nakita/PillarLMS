// Library
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// mine
import MainSiteLayout from '@/layouts/mainSiteLayout/layout';
import DynamicComponent from '@/components/previews/DynamicComponent/DynamicComponent.component';
import { useTheme } from '@mui/material';

const Page = () => {
  const router = useRouter()
  const theme = useTheme()

  const [isLoaded, setIsLoaded] = useState(false)
  const [componentProps, setComponentProps] = useState({})
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

    if (modeQueryParam) {
      setComponentProps({
        props: {
          data: {
            system: {
              state: {
                isDisplayMode: true,
                isFunctionalMode: false,
                isDayMode: modeQueryParam.toString() === "day",
                isNightMode: modeQueryParam.toString() === "night",
              },
              // socials
            }
          }
        },
      })
    }

    setIsLoaded(true)



  }, [router.query]);

  return (
    <>
      {isLoaded && (
        <div
          style={{
            backgroundColor: backgroundColor,
            minHeight: "390px",
          }}
        >
          {webAssetImport && (
            <DynamicComponent
              filePath={webAssetImport}
              props={componentProps?.props}
            />
          )}
          <br />
          <br />
          <br />
        </div>
      )}
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return (
    <MainSiteLayout
      hasNoEntity
    >
      {page}
    </MainSiteLayout>
  );
};

export default Page;
