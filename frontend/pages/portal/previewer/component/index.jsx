// Library
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// mine
import MainSiteLayout from '@/layouts/mainSiteLayout/layout';
import DynamicComponent from '@/components/previews/DynamicComponent/DynamicComponent.component';

const PreviewComponentPage = () => {
  const [webAssetImport, setWebAssetImport] = useState();
  const router = useRouter();

  useEffect(() => {
    const { webAssetImport: webAssetQueryParam } = router.query;
    
    // Check if the query parameter is present before setting the state
    if (webAssetQueryParam) {
      setWebAssetImport(webAssetQueryParam.toString());
    }
  }, [router.query]);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "390px",
      }}
    >
      {webAssetImport && (
        <DynamicComponent
          filePath={webAssetImport}
        />
      )}
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
