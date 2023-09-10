import React from 'react'
import Link from 'next/link';
import SettingTabsContext from './setting-tabs.context'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const SettingTabs = () => {
  const { tabs } = React.useContext(SettingTabsContext)
  //   const { tabs } = React.useContext(AdminLayoutContext
  return (
    <>
      <Tabs value={tabs.selectedValue} aria-label="basic tabs example">
        {tabs && tabs.tabs && tabs.tabs.map((tab, i) => (
          <Link href={tab.link}>
            <Tab value={i} label={tab.name} />
          </Link>
        ))}
      </Tabs>
    </>
  )
}
// <Tab label="Colors" />
// <Tab label="Links" />
// <Tab label="Sites" />

export default SettingTabs