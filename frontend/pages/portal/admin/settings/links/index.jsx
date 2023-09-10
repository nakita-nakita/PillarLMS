'use client'

// Library
import React, { useState } from 'react'

// Mine
// import AdminLayoutContext from '../../../layout/adminLayout.context';
// import * as tabsJson from '../../tabs.json';
// import * as settingsTabsJson from '../tabs.json';
// import MetaUpload from './meta.upload';
// import MetaPreviewCard from './meta-preview.card';
// import SettingTabsContext from '../setting-tabs.context';
// import SettingTabs from '../tabs';
import tabsJson from '@/pages-scripts/vc/admin/tabs.json';
import settingsTabsJson from '@/pages-scripts/vc/admin/settings/tabs.json';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';
import SettingTabs from '@/pages-scripts/vc/admin/settings/tabs';
import SettingTabsContext from '@/pages-scripts/vc/admin/settings/setting-tabs.context';
import MetaUpload from '@/pages-scripts/vc/admin/settings/links/meta.upload';
import MetaPreviewCard from '@/pages-scripts/vc/admin/settings/links/meta-preview.card';

// MUI
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Icon
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Groups2Icon from '@mui/icons-material/Groups2';
import { getSettingsLinksGraphQL, postSettingsLinksGraphQL } from '@/pages-scripts/vc/admin/settings/links/links.graphql';
import { processGraphQLErrors } from '@/utils/graphql/processGraphQLErrors.func';

const Page = () => {
  const theme = useTheme()

  const { setTabs } = React.useContext(AdminLayoutContext)
  const settingsTabsContext = React.useContext(SettingTabsContext)

  const [isLoaded, setIsLoaded] = useState(false)

  const [donationLink, setDonationLink] = useState("")
  const [donationLinkError, setDonationLinkError] = useState("")
  const [virtualServicesLink, setVirtualServicesLink] = useState("")
  const [virtualServicesLinkError, setVirtualServicesLinkError] = useState("")
  const [defaultMetaPicture, setDefaultMetaPicture] = useState("")
  const [defaultMetaTitle, setDefaultMetaTitle] = useState("")
  const [defaultMetaTitleError, setDefaultMetaTitleError] = useState("")
  const [defaultMetaDescription, setDefaultMetaDescription] = useState("")
  const [defaultMetaDescriptionError, setDefaultMetaDescriptionError] = useState("")

  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 1,
    }))

    settingsTabsContext.setTabs(prevState => ({
      ...prevState,
      tabs: settingsTabsJson.tabs,
      selectedValue: 2,
    }))

    getSettingsLinksGraphQL().then(response => {
      setDonationLink(response?.data?.backendSetting_links_getOne?.donationLink)
      setVirtualServicesLink(response?.data?.backendSetting_links_getOne?.virtualServicesLink)
      setDefaultMetaPicture(response?.data?.backendSetting_links_getOne?.defaultMetaPicture)
      setDefaultMetaTitle(response?.data?.backendSetting_links_getOne?.defaultMetaTitle)
      setDefaultMetaDescription(response?.data?.backendSetting_links_getOne?.defaultMetaDescription)
      setIsLoaded(true)
    })

  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    // setStreetAddressError("")
    setDonationLinkError("")
    setVirtualServicesLinkError("")
    setDefaultMetaTitleError("")
    setDefaultMetaDescriptionError("")

    postSettingsLinksGraphQL({
      donationLink,
      virtualServicesLink,
      defaultMetaPicture,
      defaultMetaTitle,
      defaultMetaDescription,
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
      <br />

      {isLoaded && (
        <>
          <h2>Donations</h2>
          <Paper elevation={3} className='admin-card'>

            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">Donation Link</InputLabel>
              <Input
                id="standard-adornment-amount"
                value={donationLink}
                onChange={event => setDonationLink(event.target.value)}
                error={donationLinkError.length}
                startAdornment={
                  <InputAdornment position="start">
                    <VolunteerActivismIcon />
                  </InputAdornment>
                }
              />
              {donationLinkError && (
                <FormHelperText id="standard-weight-helper-text" sx={{ color: theme.palette.error.main }}>{donationLinkError}</FormHelperText>
              )}
            </FormControl>

          </Paper>
          <br />
          <h2>Virtual Services</h2>
          <Paper elevation={3} className='admin-card'>

            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">Virtual Services Link</InputLabel>
              <Input
                id="standard-adornment-amount"
                value={virtualServicesLink}
                onChange={event => setVirtualServicesLink(event.target.value)}
                error={virtualServicesLinkError.length}
                startAdornment={
                  <InputAdornment position="start">
                    <Groups2Icon />
                  </InputAdornment>
                }
              />
              {virtualServicesLinkError && (
                <FormHelperText id="standard-weight-helper-text" sx={{ color: theme.palette.error.main }}>{virtualServicesLinkError}</FormHelperText>
              )}
            </FormControl>

          </Paper>
          <br />
          <h2>Meta</h2>
          <Paper elevation={3} className='admin-card'>
            {/* https://css-tricks.com/essential-meta-tags-social-media/ */}


            <MetaUpload />
            <br />
            <br />
            <TextField
              required
              id="outlined-required"
              label="title"
              sx={{ width: "100%" }}
              value={defaultMetaTitle}
              onChange={event => setDefaultMetaTitle(event.target.value)}
              error={defaultMetaTitleError.length}
              helperText={defaultMetaTitleError}
            />
            <br />
            <br />
            <TextField
              required
              id="outlined-required"
              label="description"
              sx={{ width: "100%" }}
              value={defaultMetaDescription}
              onChange={event => setDefaultMetaDescription(event.target.value)}
              error={defaultMetaDescriptionError.length}
              helperText={defaultMetaDescriptionError}
          />
            <br />
            <br />
            <p>Preview: </p>
            <MetaPreviewCard />
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