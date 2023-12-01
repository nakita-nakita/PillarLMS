import React, { useContext } from 'react'
import DiamondDeviceEmulator from '@/components/previews/DeviceEmulators/DiamondDeviceEmulators';
import { SettingFooterContext } from './context/SettingFooter.context';

function PreviewFooter() {
  const {
    isLoaded,
    setIsDarkMode,
  } = useContext(SettingFooterContext)

  return (
    <>
      {isLoaded && (
        <DiamondDeviceEmulator src={"/portal/previewer/footer?one=1"} setIsDarkMode={setIsDarkMode} />
      )}
    </>
  )
}

export default PreviewFooter