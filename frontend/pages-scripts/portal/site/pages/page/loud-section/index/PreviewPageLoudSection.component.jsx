import React, { useContext } from 'react'
import DiamondDeviceEmulator from '@/components/previews/DeviceEmulators/DiamondDeviceEmulators';
import { SiteDesignerPageLoudSectionContext } from './context/SiteDesignerPageLoudSection.context';
import { useRouter } from 'next/router';

function PreviewSiteDesignerPageLoudSection() {
  const router = useRouter()

  const {
    isLoaded,
    setIsDarkMode,
  } = useContext(SiteDesignerPageLoudSectionContext)

  return (
    <>
      {isLoaded && (
        <DiamondDeviceEmulator src={`/portal/previewer/loud-section?pageId=${router.query.pageId}`} setIsDarkMode={setIsDarkMode} />
      )}
    </>
  )
}
// <DiamondDeviceEmulator src={"/portal/previewer/header?one=1"} setIsDarkMode={setIsDarkMode} />

export default PreviewSiteDesignerPageLoudSection