'use client'

// Library
import React, { useState } from 'react'

// Mine
import tabsJson from '@/pages-scripts/portal/admin/tabs.json';
import settingsTabsJson from '@/pages-scripts/portal/admin/settings/tabs/tabs.json';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
// import PageTemplatesDataGrid from '@/pages-scripts/portal/site/page-templates/data.grid';
import AdminLayout from '@/layouts/admin/layout';
import SettingTabs from '@/pages-scripts/portal/admin/settings/tabs/tabs';
// import LogoUpload from '@/pages-scripts/portal/admin/settings/church/logo.upload';
import SettingTabsContext from '@/pages-scripts/portal/admin/settings/tabs/setting-tabs.context';

// import AdminLayoutContext from '../../../layout/adminLayout.context';
// import * as tabsJson from '../../tabs.json';
// import * as settingsTabsJson from '../tabs.json';
// import LogoUpload from './logo.upload';
// import SettingTabs from '../tabs';


// MUI
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

//icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import { processGraphQLErrors } from '@/utils/graphql/processGraphQLErrors.func';
import { List, ListItem } from '@mui/material';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
// import RealTimeTextFieldRow from '@/components/realtime/TextFieldRow/TextField.realtime';
import RealTimeSwitchRow from '@/components/realtime/SwitchRow/SwitchRow.realtime';
import RealTimeSocialMediaRow from '@/components/realtime/SocialMediaRow/socialMediaRow.realtime';
import SocialMediaList from '@/pages-scripts/portal/admin/settings/organization/socialMediaList';
import dynamic from 'next/dynamic';
import { getSettingOrganizationGraphQL } from '@/pages-scripts/portal/admin/settings/organization/store/settingOrganization_getOne.store';
import { getSocketId, initSocket, socketId } from '@/utils/realtime/socket';
const DynamicRealTimeTextField = dynamic(() => import('@/components/realtime/TextFieldRow/TextField.realtime'), {
  ssr: false
});

const Page = () => {
  const theme = useTheme()

  const { setTabs, updateEntity } = React.useContext(AdminLayoutContext)
  const settingsTabsContext = React.useContext(SettingTabsContext)

  const [isLoaded, setIsLoaded] = useState(false)

  const [logoPreview, setLogoPreview] = useState("")



  // const [logo, setlogo] = useState()
  // const [shouldApplyToTopNavMenu, setshouldApplyToTopNavMenu] = useState()
  const [entity, setEntity] = useState()
  const [name, setName] = useState()
  const [addressLine1, setAddressLine1] = useState()
  const [addressLine2, setAddressLine2] = useState()
  const [cityLocality, setCityLocality] = useState()
  const [stateProvinceRegion, setStateProvinceRegion] = useState()
  const [postalCode, setPostalCode] = useState()
  const [socialFacebook, setSocialFacebook] = useState()
  const [socialX, setSocialX] = useState()
  const [socialInstagram, setSocialInstagram] = useState()
  const [socialLinkedIn, setSocialLinkedIn] = useState()
  const [socialYouTube, setSocialYouTube] = useState()
  const [socialPinterest, setSocialPinterest] = useState()
  const [socialWhatsapp, setSocialWhatsapp] = useState()
  const [socialReddit, setSocialReddit] = useState()

  React.useEffect(() => {
    const socket = initSocket()
    setTabs(prevState => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 1,
    }))

    settingsTabsContext.setTabs(prevState => ({
      ...prevState,
      tabs: settingsTabsJson.tabs,
      selectedValue: 0,
    }))

    getSettingOrganizationGraphQL({
      socketId: getSocketId(),
    }).then(response => {
      const org = response.data.backendSettingOrganization_getOne

      updateEntity({
        entity: org.entity
      })

      setEntity(org.entity)
      setName(org.name)
      setAddressLine1(org.addressLine1)
      setAddressLine2(org.addressLine2)
      setCityLocality(org.cityLocality)
      setStateProvinceRegion(org.stateProvinceRegion)
      setPostalCode(org.postalCode)

      setIsLoaded(true)
    })

  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
 
  }
  return (
    <>
      {isLoaded && (

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
            {/* <Tabs value={1} aria-label="basic tabs example">
          <Tab value={0} label="Church" />
          <Tab label="Colors" />
          <Tab label="Links" />
          <Tab label="Sites" />
        </Tabs> */}
          </Box>
          <br />


          <Paper elevation={3}>

            <List sx={{ p: 0 }}>
              <HeaderRow label="Logo" />
              <ListItem>
                <div>
                  <br />
                  <Stack spacing={2} direction="row">
                    <Button
                      variant="contained"
                      component="label"
                    >
                      Upload File
                      <input
                        type="file"
                        hidden
                      />
                    </Button>
                    <Button>Clear</Button>
                  </Stack>
                  <div style={{ display: "table", border: "5px solid black", padding: "3px", marginTop: "5px", marginBottom: "5px" }}>
                    <img src={logoPreview && logoPreview.length !== 0 ? `${process.env.NEXT_PUBLIC_WEB_API_URL}${logoPreview}` : "/no-image/8_Bit_Dinosaur_With_Laptop.png"} style={{ width: "150px" }} />
                  </div>
                </div>
                <br />
              </ListItem>
            </List>

            {/* <div style={{ display: "table", border: "5px solid black", padding: "3px", marginTop: "5px", marginBottom: "5px" }}>
              <img style={{ height: "150px", width: "150px" }} />
            </div> */}
            <List sx={{ p: 0 }}>
              <DynamicRealTimeTextField label={"Organization Name"} data={name} entity={entity} />
              <RealTimeSwitchRow label={"Apply to the top of the left menu?"} />
              <ListItem>
                <br />
                <Button variant="contained" color="primary" type="submit" disabled>Save</Button>
              </ListItem>
            </List>
          </Paper>
          <br />
          <Paper elevation={3}>
            <List sx={{ p: 0 }}>
              <HeaderRow label="Address" />
            </List>
            <ListItem>
              <p>
                Please provide the organization's primary headquarters or official public address.
              </p>
            </ListItem>
            <br />









            {/* 

    Recipient Name: (The person or company name to whom you are sending the package.)
    Address Line 1: (Street address, P.O. box, company name, c/o)
    Address Line 2: (Apartment, suite, unit, building, floor, etc.)
    City / Locality: (Often referred to just as 'City'.)
    State / Province / Region: (Depending on the country, this could be a state, province, prefecture, region, etc.)
    Postal Code: (ZIP code in the U.S.)
    Country: (It's crucial to have this especially for international shipping.)

 */}
            <DynamicRealTimeTextField label="Address line 1" data={addressLine1} entity={entity} />
            <br />
            <DynamicRealTimeTextField label="Address Line2 " data={addressLine2} entity={entity} />
            <br />
            <DynamicRealTimeTextField label="City / Locality" data={cityLocality} entity={entity} />
            <br />
            <DynamicRealTimeTextField label="State / Province / Region" data={stateProvinceRegion} entity={entity} />

            <br />
            <DynamicRealTimeTextField label="Postal Code" data={postalCode} entity={entity} />
            <ListItem>
              <br />

              <Button variant="contained" color="primary" type="submit" disabled>Save</Button>


            </ListItem>


            {/* <TextField
                required
                id="recipientName"
                label="Recipient Name"
                sx={{ width: "100%" }}
                value={streetAddress}
                onChange={event => setStreetAddress(event.target.value)}
                error={streetAddressError.length}
                helperText={streetAddressError}
              />
              <br />
              <br />

              <TextField
                required
                id="AddressLine1"
                label="AddressLine 1"
                sx={{ width: "100%" }}
                value={streetAddress}
                onChange={event => setStreetAddress(event.target.value)}
                error={streetAddressError.length}
                helperText={streetAddressError}
              />
              <br />
              <br />

              <TextField
                required
                id="Address Line 1"
                label="Recipient Name"
                sx={{ width: "100%" }}
                value={streetAddress}
                onChange={event => setStreetAddress(event.target.value)}
                error={streetAddressError.length}
                helperText={streetAddressError}
              />
              <br />
              <br />











              <TextField
                required
                id="streetAddress"
                label="Street Address"
                sx={{ width: "100%" }}
                value={streetAddress}
                onChange={event => setStreetAddress(event.target.value)}
                error={streetAddressError.length}
                helperText={streetAddressError}
              />
              <br />
              <br />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="suiteNumber"
                    label="Suite Number"
                    sx={{ width: "100%" }}
                    value={suiteNumber}
                    onChange={event => setSuiteNumber(event.target.value)}
                    error={suiteNumberError.length}
                    helperText={suiteNumberError}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="zipCode"
                    label="Zip Code"
                    sx={{ width: "100%" }}
                    value={zipCode}
                    onChange={event => setZipCode(event.target.value)}
                    error={zipCodeError.length}
                    helperText={zipCodeError}
                  />
                </Grid>
                <br />
                <br />
                <Grid item xs={6}>
                  <TextField
                    required
                    id="city"
                    label="City"
                    sx={{ width: "100%" }}
                    value={city}
                    onChange={event => setCity(event.target.value)}
                    error={cityError.length}
                    helperText={cityError}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="state"
                    label="State"
                    sx={{ width: "100%" }}
                    value={state}
                    onChange={event => setState(event.target.value)}
                    error={stateError.length}
                    helperText={stateError}
                  />
                </Grid> */}
            {/* </Grid> */}

          </Paper>
          <br />
          <Paper elevation={3}>
            <List sx={{ p: 0 }}>
              <HeaderRow label="Social Links" />
              <br />
              <ListItem>
                <Button variant="contained" color="primary">New</Button>

              </ListItem>
            </List>
            <SocialMediaList />
            {/* <List sx={{ p: 0 }}> */}
            {/* <RealTimeSocialMediaRow /> */}
            {/* </List> */}
          </Paper>
          {/* <br />
      <h2>Select Bible Version</h2>
      <Paper elevation={3} className='admin-card'>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select default bible translations</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Select default bible translations"
          // onChange={handleChange}
          >
            <MenuItem value={10}>Amplified Bible</MenuItem>
            <MenuItem value={20}>Amplified Bible, Classic Edition</MenuItem>
            <MenuItem value={30}>The Books of the Bible NT</MenuItem>
            <MenuItem value={40}>English: Berean Study Bible</MenuItem>
          </Select>
        </FormControl> */}
        </Box>
      )}

      <br />
      <br />
      <br />
      <br />
    </>
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