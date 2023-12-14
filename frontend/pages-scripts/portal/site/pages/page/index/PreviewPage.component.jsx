import React, { useContext } from 'react'
import DiamondDeviceEmulator from '@/components/previews/DeviceEmulators/DiamondDeviceEmulators';
import { SiteDesignerPageContext } from './context/SiteDesignerPage.context';

function PreviewSiteDesignerPage() {
  const {
    isLoaded,
    setIsDarkMode,
  } = useContext(SiteDesignerPageContext)

  return (
    <>
      {isLoaded && (
        <DiamondDeviceEmulator src={"about:blank"} setIsDarkMode={setIsDarkMode} />
      )}
    </>
  )
}
// <DiamondDeviceEmulator src={"/portal/previewer/header?one=1"} setIsDarkMode={setIsDarkMode} />

export default PreviewSiteDesignerPage