import React, { useContext } from 'react'
import DiamondDeviceEmulator from '@/components/previews/DeviceEmulators/DiamondDeviceEmulators';
import { SettingHeaderContext } from './context/SettingHeader.context';

function PreviewHeader() {
  const {
    isLoaded,
    setIsDarkMode,
  } = useContext(SettingHeaderContext)

  return (
    <>
      {isLoaded && (
        <DiamondDeviceEmulator src={"/portal/previewer/header?one=1"} setIsDarkMode={setIsDarkMode} />
      )}
    </>
  )
}

export default PreviewHeader