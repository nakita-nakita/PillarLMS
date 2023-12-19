import React, { useContext } from 'react'
import DiamondDeviceEmulator from '@/components/previews/DeviceEmulators/DiamondDeviceEmulators';
import { SiteDesignerPageSectionContext } from './context/SiteDesignerPageSection.context';
import { useRouter } from 'next/router';

function PreviewSiteDesignerPageSection() {
  const router = useRouter()

  const {
    isLoaded,
    setIsDarkMode,
  } = useContext(SiteDesignerPageSectionContext)

  return (
    <>
      {isLoaded && (
        <DiamondDeviceEmulator src={`/portal/previewer/normal-section?id=${router.query.sectionId}`} setIsDarkMode={setIsDarkMode} />
      )}
    </>
  )
}
// <DiamondDeviceEmulator src={"/portal/previewer/header?one=1"} setIsDarkMode={setIsDarkMode} />

export default PreviewSiteDesignerPageSection