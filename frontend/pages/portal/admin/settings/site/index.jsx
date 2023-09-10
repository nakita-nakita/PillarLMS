'use client'

//library
import React, { useState } from 'react'

// Mine
// import AdminLayoutContext from '../../../layout/adminLayout.context';
// import * as tabsJson from '../../tabs.json';
// import * as settingsTabsJson from '../tabs.json';
// import FaviconUpload from './favicon.upload';
// import SettingTabsContext from '../setting-tabs.context';
// import SettingTabs from '../tabs';
import tabsJson from '@/pages-scripts/vc/admin/tabs.json';
import settingsTabsJson from '@/pages-scripts/vc/admin/settings/tabs.json';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';
import SettingTabs from '@/pages-scripts/vc/admin/settings/tabs';
import SettingTabsContext from '@/pages-scripts/vc/admin/settings/setting-tabs.context';
import FaviconUpload from '@/pages-scripts/vc/admin/settings/site/favicon.upload';

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
import { getSettingsSiteGraphQL, postSettingsSiteGraphQL } from '@/pages-scripts/vc/admin/settings/site/site.graphql';
import { processGraphQLErrors } from '@/utils/graphql/processGraphQLErrors.func';

const Page = () => {
  const { setTabs } = React.useContext(AdminLayoutContext)
  const settingsTabsContext = React.useContext(SettingTabsContext)

  const [isLoaded, setIsLoaded] = useState(false)

  const [churchShortName, setChurchShortName] = useState("")
  const [churchShortNameError, setChurchShortNameError] = useState("")
  const [favicon, setFavicon] = useState("")

  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 1,
    }))

    settingsTabsContext.setTabs(prevState => ({
      ...prevState,
      tabs: settingsTabsJson.tabs,
      selectedValue: 3,
    }))

    getSettingsSiteGraphQL().then(response => {
      setChurchShortName(response?.data?.backendSetting_site_getOne?.churchShortName)
      setFavicon(response?.data?.backendSetting_site_getOne?.favicon)
      setIsLoaded(true)
    })

  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();

    setChurchShortNameError("")

    postSettingsSiteGraphQL({
      churchShortName,
    }).then(response => {
      const result = processGraphQLErrors({ response })

      console.log('response', response, result)

    })

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
          <h2>Browser Tabs</h2>
          <Paper elevation={3} className='admin-card'>

            <TextField
              required
              id="outlined-required"
              label="Your Church shortest name"
              placeholder=' '
              sx={{ width: "100%" }}
              value={churchShortName}
              onChange={event => setChurchShortName(event.target.value)}
              error={churchShortNameError.length}
              helperText={churchShortNameError}
            />
            <br />
            <br />
            <FaviconUpload />
          </Paper>
          <br />
          <Button variant="contained" color="secondary" type="submit">Save</Button>
        </>
      )}
    </Box>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

export default Page