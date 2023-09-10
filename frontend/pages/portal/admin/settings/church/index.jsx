'use client'

// Library
import React, { useState } from 'react'

// Mine
import tabsJson from '@/pages-scripts/vc/admin/tabs.json';
import settingsTabsJson from '@/pages-scripts/vc/admin/settings/tabs.json';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
// import PageTemplatesDataGrid from '@/pages-scripts/vc/site/page-templates/data.grid';
import AdminLayout from '@/layouts/admin/layout';
import SettingTabs from '@/pages-scripts/vc/admin/settings/tabs';
// import LogoUpload from '@/pages-scripts/vc/admin/settings/church/logo.upload';
import SettingTabsContext from '@/pages-scripts/vc/admin/settings/setting-tabs.context';
import ServicesTable from '@/pages-scripts/vc/admin/settings/church/services.table';
import ClassesTable from '@/pages-scripts/vc/admin/settings/church/classes.table';
import HolidaysTable from '@/pages-scripts/vc/admin/settings/church/holidays.table';

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
import { getSettingsChurchGraphQL, postSettingsChurchGraphQL } from '@/pages-scripts/vc/admin/settings/church/church.graphql';
import { processGraphQLErrors } from '@/utils/graphql/processGraphQLErrors.func';

const Page = () => {
  const theme = useTheme()

  const { setTabs } = React.useContext(AdminLayoutContext)
  const settingsTabsContext = React.useContext(SettingTabsContext)

  const [isLoaded, setIsLoaded] = useState(false)

  const [logoPreview, setLogoPreview] = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [streetAddressError, setStreetAddressError] = useState("")
  const [suiteNumber, setSuiteNumber] = useState("")
  const [suiteNumberError, setSuiteNumberError] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [zipCodeError, setZipCodeError] = useState("")
  const [city, setCity] = useState("")
  const [cityError, setCityError] = useState("")
  const [state, setState] = useState("")
  const [stateError, setStateError] = useState("")
  const [socialTwitter, setSocialTwitter] = useState("")
  const [socialTwitterError, setSocialTwitterError] = useState("")
  const [socialFacebook, setSocialFacebook] = useState("")
  const [socialFacebookError, setSocialFacebookError] = useState("")
  const [socialInstagram, setSocialInstagram] = useState("")
  const [socialInstagramError, setSocialInstagramError] = useState("")
  const [socialWhatsapp, setSocialWhatsapp] = useState("")
  const [socialWhatsappError, setSocialWhatsappError] = useState("")
  const [socialTelegram, setSocialTelegram] = useState("")
  const [socialTelegramError, setSocialTelegramError] = useState("")



  React.useEffect(() => {
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

    getSettingsChurchGraphQL().then(response => {
      setStreetAddress(response?.data?.backendSetting_church_getOne?.streetAddress)
      setSuiteNumber(response?.data?.backendSetting_church_getOne?.suiteNumber)
      setZipCode(response?.data?.backendSetting_church_getOne?.zipCode)
      setCity(response?.data?.backendSetting_church_getOne?.city)
      setState(response?.data?.backendSetting_church_getOne?.state)
      setSocialTwitter(response?.data?.backendSetting_church_getOne?.socialTwitter)
      setSocialFacebook(response?.data?.backendSetting_church_getOne?.socialFacebook)
      setSocialInstagram(response?.data?.backendSetting_church_getOne?.socialInstagram)
      setSocialWhatsapp(response?.data?.backendSetting_church_getOne?.socialWhatsapp)
      setSocialTelegram(response?.data?.backendSetting_church_getOne?.socialTelegram)
      setIsLoaded(true)
    })

  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    setStreetAddressError("")
    setSuiteNumberError("")
    setZipCodeError("")
    setCityError("")
    setStateError("")
    setSocialTwitterError("")
    setSocialFacebookError("")
    setSocialInstagramError("")
    setSocialWhatsappError("")
    setSocialTelegramError("")

    postSettingsChurchGraphQL({
      streetAddress,
      suiteNumber,
      zipCode,
      city,
      state,
      socialTwitter,
      socialFacebook,
      socialInstagram,
      socialWhatsapp,
      socialTelegram,
    }).then(response => {

      const result = processGraphQLErrors({ response })

      console.log('response', response, result)
    })
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
          <h2>Logo</h2>






























          <Paper elevation={3} className='admin-card'>
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
            {/* <div style={{ display: "table", border: "5px solid black", padding: "3px", marginTop: "5px", marginBottom: "5px" }}>
              <img style={{ height: "150px", width: "150px" }} />
            </div> */}
            <div style={{ display: "table", border: "5px solid black", padding: "3px", marginTop: "5px", marginBottom: "5px" }}>
              <img src={logoPreview && logoPreview.length !== 0 ? `${process.env.NEXT_PUBLIC_WEB_API_URL}${logoPreview}` : "/no-image/8_Bit_Dinosaur_With_Laptop.png"} style={{ width: "150px" }} />
            </div>
          </Paper>
          <br />
          <h2>Address</h2>
          <Paper elevation={3} className='admin-card'>
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
              </Grid>
            </Grid>
          </Paper>
          <br />
          <h2>Social Links</h2>
          <Paper elevation={3} className='admin-card'>
            <p>Fill in what social media you use.</p>
            <br />

            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">Twitter</InputLabel>
              <Input
                id="socialTwitter"
                value={socialTwitter}
                onChange={event => setSocialTwitter(event.target.value)}
                error={socialTwitterError.length}
                // helperText={socialTwitterError}
                startAdornment={
                  <InputAdornment position="start">
                    <TwitterIcon />
                  </InputAdornment>
                }
              />
              {socialTwitterError && (
                <FormHelperText id="standard-weight-helper-text" sx={{ color: theme.palette.error.main }}>{socialTwitterError}</FormHelperText>
              )}
            </FormControl>
            <br />
            <br />

            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">Facebook</InputLabel>
              <Input
                id="socialFacebook"
                value={socialFacebook}
                onChange={event => setSocialFacebook(event.target.value)}
                error={socialFacebookError.length}
                startAdornment={
                  <InputAdornment position="start">
                    <FacebookIcon />
                  </InputAdornment>
                }
              />
              {socialFacebookError && (
                <FormHelperText id="standard-weight-helper-text" sx={{ color: theme.palette.error.main }}>{socialFacebookError}</FormHelperText>
              )}
            </FormControl>
            <br />
            <br />

            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">Instagram</InputLabel>
              <Input
                id="socialInstagram"
                value={socialInstagram}
                onChange={event => setSocialInstagram(event.target.value)}
                error={socialInstagramError.length}
                startAdornment={
                  <InputAdornment position="start">
                    <InstagramIcon />
                  </InputAdornment>
                }
              />
              {socialInstagramError && (
                <FormHelperText id="standard-weight-helper-text" sx={{ color: theme.palette.error.main }}>{socialInstagramError}</FormHelperText>
              )}
            </FormControl>
            <br />
            <br />
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">WhatsApp</InputLabel>
              <Input
                id="socialWhatsapp"
                value={socialWhatsapp}
                onChange={event => setSocialWhatsapp(event.target.value)}
                error={socialWhatsappError.length}
                startAdornment={
                  <InputAdornment position="start">
                    <WhatsAppIcon />
                  </InputAdornment>
                }
              />
              {socialWhatsappError && (
                <FormHelperText id="standard-weight-helper-text" sx={{ color: theme.palette.error.main }}>{socialWhatsappError}</FormHelperText>
              )}
            </FormControl>
            <br />
            <br />
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">Telegram</InputLabel>
              <Input
                id="socialTelegram"
                value={socialTelegram}
                onChange={event => setSocialTelegram(event.target.value)}
                error={socialTelegramError.length}
                startAdornment={
                  <InputAdornment position="start">
                    <TelegramIcon />
                  </InputAdornment>
                }
              />
              {socialTelegramError && (
                <FormHelperText id="standard-weight-helper-text" sx={{ color: theme.palette.error.main }}>{socialTelegramError}</FormHelperText>
              )}
            </FormControl>
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

          {/* 
      Amplified Bible
Amplified Bible, Classic Edition
American Standard Version
The Books of the Bible NT
English: Berean Study Bible
Common English Bible
Contemporary English Version
Contemporary English Version Interconfessional Edition
Contemporary English Version (Anglicised) 2012
Complete Jewish Bible
Catholic Public Domain Version
Christian Standard Bible
Darby's Translation 1890
Douay-Rheims Challoner Revision 1752
EasyEnglish Bible 2018
Holy Bible: Easy-to-Read Version
English Standard Version 2016
Free Bible Version
First Nations Version
Good News Bible (Anglicised)
Good News Bible (Catholic edition in Septuagint order)
Good News Bible (Anglicised) 1994
Good News Translation
Good News Translation (US Version)
Geneva Bible
GOD'S WORD
St Paul from the Trenches 1916
Holman Christian Standard Bible
International Children’s Bible
Jubilee Bible
King James Version
King James Version with Apocrypha, American Edition
King James Version, American Edition
Lexham English Bible
Legacy Standard Bible
Modern English Version
Psalms of David in Metre 1650 (Scottish Psalter)
Scottish Metrical Paraphrases 1781
The Message
New American Bible, revised edition
New American Standard Bible - NASB 1995
New American Standard Bible - NASB
New Century Version
New English Translation
New International Reader’s Version
New International Version
New International Version (Anglicised)
New King James Version
New Living Translation
New Messianic Version Bible
New Revised Standard Version
New Revised Standard Version Catholic Interconfessional
New Revised Standard Version Updated Edition 2021
Plain English Version
Radiate New Testament
Revised Standard Version
Revised Standard Version Old Tradition 1952
Revised Standard Version
Revised Version 1885
Revised Version with Apocrypha 1885, 1895
Isaiah 1830, 1842 (John Jones alias Ioan Tegid)
Tree of Life Version
The Orthodox Jewish Bible
The Passion Translation
The Scriptures 2009
Wycliffe's Bible with Modern Spelling
World English Bible British Edition
World English Bible, American English Edition, without Strong's Numbers
World Messianic Bible
World Messianic Bible British Edition
Young's Literal Translation 1898 */}

          {/* </Paper> */}
          <br />
          <h2>Main Events</h2>
          <Paper elevation={3} sx={{ padding: "20px 10px", borderBottomLeftRadius: 0, borderBottomRightRadius: 0, }}>

            <h3>Services</h3>
            <Button variant="contained">New</Button>
          </Paper>
          <ServicesTable />
          <br />
          <Paper elevation={3} sx={{ padding: "20px 10px", borderBottomLeftRadius: 0, borderBottomRightRadius: 0, }}>
            <h3>Classes</h3>
            <Button variant="contained">New</Button>
          </Paper>
          <ClassesTable />
          <br />
          <Paper elevation={3} sx={{ padding: "20px 10px", borderBottomLeftRadius: 0, borderBottomRightRadius: 0, }}>
            <h3>Holidays</h3>
            <Button variant="contained">New</Button>
          </Paper>
          <HolidaysTable />
          <br />
          <Button variant="contained" color="secondary" type="submit">Save</Button>
        </Box>
      )}
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