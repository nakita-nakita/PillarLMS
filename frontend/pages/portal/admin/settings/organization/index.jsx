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
import SocialMediaList from '@/pages-scripts/portal/admin/settings/organization/socialMediaList';
import dynamic from 'next/dynamic';
import { getSettingOrganizationGraphQL } from '@/pages-scripts/portal/admin/settings/organization/store/settingOrganization_getOne.store';
import { getSocketId, initSocket, socketId } from '@/utils/realtime/socket';
import { postSettingOrganizationAddressGraphQL } from '@/pages-scripts/portal/admin/settings/organization/store/settingOrganization_saveAddress.store';
import { enqueueSnackbar } from 'notistack';
import { postSettingOrganizationSocialsGraphQL } from '@/pages-scripts/portal/admin/settings/organization/store/settingOrganization_saveSocials.store';
import RealTimePictureRow from '@/components/realtime/PictureSelectRow/pictureSelection.realtime';
import postPreviewBrandingApi from '@/pages-scripts/portal/admin/settings/organization/store/settingOrganization_previewBranding.api';
import postBrandingApi from '@/pages-scripts/portal/admin/settings/organization/store/settingOrganization_saveBranding.api';
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
  const [id, setId] = useState()

  // name is realtime, name value is text, there should be an error trigger and a bottom message.
  const [logo, setlogo] = useState()
  const [logoValue, setlogoValue] = useState()
  const [name, setName] = useState()
  const [nameValue, setNameValue] = useState()
  const [shouldApplyToTopNavMenu, setShouldApplyToTopNavMenu] = useState()
  const [shouldApplyToTopNavMenuValue, setShouldApplyToTopNavMenuValue] = useState()

  const [addressLine1, setAddressLine1] = useState()
  const [addressLine1Value, setAddressLine1Value] = useState()
  const [addressLine2, setAddressLine2] = useState()
  const [addressLine2Value, setAddressLine2Value] = useState()
  const [cityLocality, setCityLocality] = useState()
  const [cityLocalityValue, setCityLocalityValue] = useState()
  const [stateProvinceRegion, setStateProvinceRegion] = useState()
  const [stateProvinceRegionValue, setStateProvinceRegionValue] = useState()
  const [postalCode, setPostalCode] = useState()
  const [postalCodeValue, setPostalCodeValue] = useState()
  const [socialFacebook, setSocialFacebook] = useState()
  const [socialFacebookValue, setSocialFacebookValue] = useState()
  const [socialX, setSocialX] = useState()
  const [socialXValue, setSocialXValue] = useState()
  const [socialInstagram, setSocialInstagram] = useState()
  const [socialInstagramValue, setSocialInstagramValue] = useState()
  const [socialLinkedIn, setSocialLinkedIn] = useState()
  const [socialLinkedInValue, setSocialLinkedInValue] = useState()
  const [socialYouTube, setSocialYouTube] = useState()
  const [socialYouTubeValue, setSocialYouTubeValue] = useState()
  const [socialPinterest, setSocialPinterest] = useState()
  const [socialPinterestValue, setSocialPinterestValue] = useState()
  const [socialWhatsapp, setSocialWhatsapp] = useState()
  const [socialWhatsappValue, setSocialWhatsappValue] = useState()
  const [socialReddit, setSocialReddit] = useState()
  const [socialRedditValue, setSocialRedditValue] = useState()

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
      const org = response.data.backendSettingOrganization_getOneRealTime

      console.log('main data', org)

      updateEntity({
        entity: org.entity
      })

      setId(org.id)
      setEntity(org.entity)
      setlogo(org.logo)
      setName(org.name)
      setShouldApplyToTopNavMenu(org.shouldApplyToTopNavMenu)
      setAddressLine1(org.addressLine1)
      setAddressLine2(org.addressLine2)
      setCityLocality(org.cityLocality)
      setStateProvinceRegion(org.stateProvinceRegion)
      setPostalCode(org.postalCode)
      setSocialFacebook(org.socialFacebook)
      setSocialInstagram(org.socialInstagram)
      setSocialLinkedIn(org.socialLinkedIn)
      setSocialPinterest(org.socialPinterest)
      setSocialReddit(org.socialReddit)
      setSocialWhatsapp(org.socialWhatsapp)
      setSocialX(org.socialX)
      setSocialYouTube(org.socialYouTube)

      console.log('socialFacebook', org, socialFacebook)

      setIsLoaded(true)
    })

  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const handleAddressSave = () => {

    postSettingOrganizationAddressGraphQL({
      id,
      addressLine1: addressLine1Value,
      addressLine2: addressLine2Value,
      cityLocality: cityLocalityValue,
      stateProvinceRegion: stateProvinceRegionValue,
      postalCode: postalCodeValue,
    }).then(() => {
      enqueueSnackbar("Main Address Saved!")
    })
  }

  const handleSocialSave = () => {
    postSettingOrganizationSocialsGraphQL({
      id,
      socialFacebook: socialFacebookValue,
      socialInstagram: socialInstagramValue,
      socialLinkedIn: socialLinkedInValue,
      socialPinterest: socialPinterestValue,
      socialReddit: socialRedditValue,
      socialWhatsapp: socialWhatsappValue,
      socialX: socialXValue,
      socialYouTube: socialYouTubeValue,
    }).then(() => {
      enqueueSnackbar("Socials Saved!")
    })
  }

  const handleBrandingSave = () => {
    postBrandingApi({
      id,
      previewLogo: logoValue,
      name: nameValue,
      shouldApplyToTopNavMenu: shouldApplyToTopNavMenuValue,
    }).then(() => {
      enqueueSnackbar("Branding Saved!")
    })
  }

  return (
    <>

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

        {isLoaded && (
          <>
            <br />


            <Paper elevation={3}>

              {/* <List sx={{ p: 0 }}>
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
              </List> */}

              {/* <div style={{ display: "table", border: "5px solid black", padding: "3px", marginTop: "5px", marginBottom: "5px" }}>
              <img style={{ height: "150px", width: "150px" }} />
            </div> */}
              <List sx={{ p: 0 }}>
                <HeaderRow label="Branding" />
                <ListItem>
                  <div>
                    <br />
                    <p>Logo</p>
                  </div>
                </ListItem>
                <RealTimePictureRow
                  entity={entity}
                  data={logo}
                  onFileSubmit={event => {
                    return postPreviewBrandingApi({
                      event,
                      entity,
                      name: logo.name,
                    })
                  }}

                  onChange={picture => {
                    console.log('picture', picture)
                    setlogoValue(picture)

                  }}



                />
                <br />
                <DynamicRealTimeTextField
                  label={"Organization Name"}
                  data={name}
                  entity={entity}
                  onTextUpdate={(text) => {
                    setNameValue(text)
                    console.log('contents to be saved', text)
                  }}
                />
                <br />
                <RealTimeSwitchRow
                  label={"Apply to the top of the left menu?"}
                  data={shouldApplyToTopNavMenu}
                  entity={entity}
                  onChange={(value) => {
                    setShouldApplyToTopNavMenuValue(value)
                    console.log('contents to be saved: boolean: setShouldApplyToTopNavMenuValue:', value)

                  }}
                />
                <ListItem>
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBrandingSave}
                  >
                    Save
                  </Button>
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
              <DynamicRealTimeTextField
                label="Address line 1"
                data={addressLine1}
                entity={entity}

                onTextUpdate={(text) => {
                  setAddressLine1Value(text)
                  // console.log('contents to be saved', text)
                }}
              />
              <br />
              <DynamicRealTimeTextField
                label="Address Line2 "
                data={addressLine2}
                entity={entity}
                onTextUpdate={(text) => {
                  setAddressLine2Value(text)
                  console.log('contents to be saved', text)
                }}
              />
              <br />
              <DynamicRealTimeTextField
                label="City / Locality"
                data={cityLocality}
                entity={entity}

                onTextUpdate={(text) => {
                  setCityLocalityValue(text)
                  // console.log('contents to be saved', text)
                }}
              />
              <br />
              <DynamicRealTimeTextField
                label="State / Province / Region"
                data={stateProvinceRegion}
                entity={entity}

                onTextUpdate={(text) => {
                  setStateProvinceRegionValue(text)
                  // console.log('contents to be saved', text)
                }}
              />

              <br />
              <DynamicRealTimeTextField
                label="Postal Code"
                data={postalCode}
                entity={entity}
                onTextUpdate={(text) => {
                  setPostalCodeValue(text)
                  // console.log('contents to be saved', text)
                }}
              />
              <ListItem>
                <br />

                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={handleAddressSave}
                >Save</Button>


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
                <DynamicRealTimeTextField
                  label="Facebook"
                  data={socialFacebook}
                  entity={entity}

                  onTextUpdate={(text) => {
                    setSocialFacebookValue(text)
                    // console.log('contents to be saved', text)
                  }}
                />
                <br />
                <DynamicRealTimeTextField
                  label="X"
                  data={socialX}
                  entity={entity}

                  onTextUpdate={(text) => {
                    setSocialXValue(text)
                    // console.log('contents to be saved', text)
                  }}
                />
                <br />
                <DynamicRealTimeTextField
                  label="Instagram"
                  data={socialInstagram}
                  entity={entity}

                  onTextUpdate={(text) => {
                    setSocialInstagramValue(text)
                    // console.log('contents to be saved', text)
                  }}
                />
                <br />
                <DynamicRealTimeTextField
                  label="LinkedIn"
                  data={socialLinkedIn}
                  entity={entity}

                  onTextUpdate={(text) => {
                    setSocialLinkedInValue(text)
                    // console.log('contents to be saved', text)
                  }}
                />
                <br />
                <DynamicRealTimeTextField
                  label="YouTube"
                  data={socialYouTube}
                  entity={entity}

                  onTextUpdate={(text) => {
                    setSocialYouTubeValue(text)
                    // console.log('contents to be saved', text)
                  }}
                />
                <br />
                <DynamicRealTimeTextField
                  label="Pinterest"
                  data={socialPinterest}
                  entity={entity}

                  onTextUpdate={(text) => {
                    setSocialPinterestValue(text)
                    // console.log('contents to be saved', text)
                  }}
                />
                <br />
                <DynamicRealTimeTextField
                  label="WhatsApp"
                  data={socialWhatsapp}
                  entity={entity}

                  onTextUpdate={(text) => {
                    setSocialWhatsappValue(text)
                    // console.log('contents to be saved', text)
                  }}
                />
                <br />
                <DynamicRealTimeTextField
                  label="Reddit"
                  data={socialReddit}
                  entity={entity}

                  onTextUpdate={(text) => {
                    setSocialRedditValue(text)
                    // console.log('contents to be saved', text)
                  }}
                />
                <br />

                {/* <br />
              <ListItem>
                <Button variant="contained" color="primary">New</Button>

              </ListItem> */}

                <ListItem>

                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={handleSocialSave}
                  >Save</Button>


                </ListItem>
              </List>
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
          </>
        )}
      </Box>

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