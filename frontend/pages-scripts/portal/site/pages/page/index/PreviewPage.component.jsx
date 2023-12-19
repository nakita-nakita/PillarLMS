import React, { useContext } from 'react'
import DiamondDeviceEmulator from '@/components/previews/DeviceEmulators/DiamondDeviceEmulators';
import { SiteDesignerPageContext } from './context/SiteDesignerPage.context';
import { useRouter } from 'next/router';

function PreviewSiteDesignerPage() {
  const router = useRouter()

  const {
    isLoaded,
    setIsDarkMode,
  } = useContext(SiteDesignerPageContext)

  return (
    <>
      {isLoaded && (
        <DiamondDeviceEmulator
        height={'calc(100vh - 250px)'}
        src={`/portal/previewer/page?pageId=${router.query.pageId}`}
          setIsDarkMode={setIsDarkMode}
        />
      )}
    </>
  )
}
// <DiamondDeviceEmulator src={"/portal/previewer/header?one=1"} setIsDarkMode={setIsDarkMode} />

export default PreviewSiteDesignerPage