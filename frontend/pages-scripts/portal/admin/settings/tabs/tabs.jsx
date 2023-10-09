import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'

import SettingTabsContext from './setting-tabs.context'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from '@mui/material/Link';
import { realtimeLink } from '@/utils/realtime/link';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material';

const SettingTabs = () => {
  const theme = useTheme()
  const router = useRouter()

  const { tabs } = useContext(SettingTabsContext)
  const { setLeftDrawer, idChip, panelMeetingDoc, setPanelMeetingDoc } = React.useContext(AdminLayoutContext)


  const changeUrl = (href) => {
    // router.push(href)
    realtimeLink({
      to: href,
      leaderUserId: panelMeetingDoc.leader?.id,
      meetingId: panelMeetingDoc.id,
      router,
      userId: idChip.id,
      setPanelMeetingDoc,

    })
  }
  //   const { tabs } = React.useContext(AdminLayoutContext
  return (
    <>
      <Tabs value={tabs.selectedValue} aria-label="basic tabs example" sx={{ backgroundColor: theme.palette.grey[700], m:0 }} TabIndicatorProps={{ sx: { backgroundColor: theme.palette.common.white } }}>
        {tabs && tabs.tabs && tabs.tabs.map((tab, i) => (
          <Link onClick={() => changeUrl(tab.link)}>
            <Tab value={i} label={tab.name} sx={{
              background: theme.palette.grey[700],
              color: theme.palette.common.white,
              "&:hover": {
                background: theme.palette.grey[600],
              }
            }} />
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