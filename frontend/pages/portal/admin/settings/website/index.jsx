'use client'

//library
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

// Mine
// import AdminLayoutContext from '../../../layout/adminLayout.context';
// import * as tabsJson from '../../tabs.json';
// import * as settingsTabsJson from '../tabs.json';
// import FaviconUpload from './favicon.upload';
// import SettingTabsContext from '../setting-tabs.context';
// import SettingTabs from '../tabs';
import tabsJson from '@/pages-scripts/portal/admin/tabs.json';
import settingsTabsJson from '@/pages-scripts/portal/admin/settings/tabs/tabs.json';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';
import SettingTabs from '@/pages-scripts/portal/admin/settings/tabs/tabs';
import SettingTabsContext from '@/pages-scripts/portal/admin/settings/tabs/setting-tabs.context';
// import FaviconUpload from '@/pages-scripts/portal/admin/settings/website/favicon.upload';

// MUI
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
// import { getSettingsSiteGraphQL, postSettingsSiteGraphQL } from '@/pages-scripts/portal/admin/settings/site/site.graphql';
import { processGraphQLErrors } from '@/utils/graphql/processGraphQLErrors.func';
import { realtimeLink } from '@/utils/realtime/link';
import { List } from '@mui/material';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';

const Page = () => {
  const router = useRouter()
  const { setTabs } = React.useContext(AdminLayoutContext)
  const settingsTabsContext = React.useContext(SettingTabsContext)

  const [isLoaded, setIsLoaded] = useState(false)

  const [churchShortName, setChurchShortName] = useState("")
  const [churchShortNameError, setChurchShortNameError] = useState("")
  const [favicon, setFavicon] = useState("")

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

  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 1,
    }))

    settingsTabsContext.setTabs(prevState => ({
      ...prevState,
      tabs: settingsTabsJson.tabs,
      selectedValue: 1,
    }))

    // getSettingsSiteGraphQL().then(response => {
    //   setChurchShortName(response?.data?.backendSetting_site_getOne?.churchShortName)
    //   setFavicon(response?.data?.backendSetting_site_getOne?.favicon)
    setIsLoaded(true)
    // })

  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();

    setChurchShortNameError("")

    // postSettingsSiteGraphQL({
    //   churchShortName,
    // }).then(response => {
    //   const result = processGraphQLErrors({ response })

    //   console.log('response', response, result)

    // })

  }

  return (

    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto"
    }}
      component="form"
      noValidate
      onSubmit={handleSubmit}
    >

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <SettingTabs />
      </Box>

      {isLoaded && (
        <>
          <br />

          <Paper elevation={3}>
            <List sx={{ p: 0 }}>
              <HeaderRow label="Website Settings Portal" />
            </List>
            <div className="admin-card">

              <p>Website settings serve as your portal to customize branding, headers, footers, colors, and more, enhancing your online presence.</p>
              <br />
              <Button onClick={() => changeUrl("/portal/admin/settings/website/settings")} variant="contained" color="secondary" type="submit">Start Customizing Now!</Button>
            </div>
          </Paper>
          <br />
          <br />
          <br />
          <br />
        </>
      )}
    </Box>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      hasNoEntity
    >
      {page}
    </AdminLayout>
  )
}

export default Page