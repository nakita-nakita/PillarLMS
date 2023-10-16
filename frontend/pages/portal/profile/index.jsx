'use client'

// library
import React, { useState, useEffect } from "react"
import { MuiColorInput } from 'mui-color-input'
import axios from 'axios';

// mine
import AdminLayout from "@/layouts/admin/layout";
import { getUserToken } from "@/utils/graphql/user";
import uploaderUtil from "@/utils/uploader/callUploaderApi";
import { getProfileGraphQL, postProfileGraphQL } from "@/pages-scripts/portal/profile/store/profile.graphql";
import UserChip from "@/components/chip/user.chip";
import AdminLayoutContext from "@/layouts/admin/layout/adminLayout.context";

// MUI
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import HeaderRow from "@/components/global/HeaderRow/HeaderRow.component";
import { List } from "@mui/material";
import postPreviewProfileApi from "@/pages-scripts/portal/profile/store/postPreviewProfile.api";
import postProfile from "@/pages-scripts/portal/profile/store/postProfile.api";
import { enqueueSnackbar } from "notistack";
// icons


function Page() {
  const theme = useTheme();
  const { idChip, setIdChip, setTabs } = React.useContext(AdminLayoutContext)

  const [isLoaded, setIsLoaded] = useState(false)

  // display names
  const [email, setEmail] = useState(undefined)

  const [firstName, setFirstName] = useState("")
  const [firstNameError, setFirstNameError] = useState("")
  const [lastName, setLastName] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [username, setUsername] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [callByType, setCallByType] = useState("EMAIL")
  const [callByTypeError, setCallByTypeError] = useState("")

  // picture
  const [picturePreview, setPicturePreview] = useState("")
  const [originalPicture, setOriginalPicture] = useState()
  const [fileInputValue, setFileInputValue] = useState("");

  // colors
  const [labelColor, setLabelColor] = useState("#ffffff")
  const [circleColor, setCircleColor] = useState("#000000")

  useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: []
    }))

    getProfileGraphQL().then(profileData => {
      setEmail(profileData.data.foundationUser_getOne.email)

      if (profileData.data.foundationUserProfile_getOne) {
        setCallByType(profileData.data.foundationUserProfile_getOne.callByType || "EMAIL")
        setCircleColor(profileData.data.foundationUserProfile_getOne.circleColor)
        setLabelColor(profileData.data.foundationUserProfile_getOne.labelColor)
        setFirstName(profileData.data.foundationUserProfile_getOne.firstName || "")
        setLastName(profileData.data.foundationUserProfile_getOne.lastName || "")
        setPicturePreview(profileData.data.foundationUserProfile_getOne.picture)
        setUsername(profileData.data.foundationUserProfile_getOne.username || "")
        setOriginalPicture(profileData.data.foundationUserProfile_getOne.picture)
      }

      setIsLoaded(true)
    })
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    postProfile({
      event,
      callByType,
      firstName,
      lastName,
      username,
      picture,
      circleColor,
      labelColor,
      originalPicture,
    }).then(response => {
      enqueueSnackbar("Profile Saved!")

      if (Object.hasOwn(response.data, "link")) {
        setIdChip(prevState => ({
          ...prevState,
          picture: response.data.link
        }))
      }
    })

    setIdChip(prevState => ({
      ...prevState,
      callByType: callByType ? callByType : prevState.callByType,
      firstName: firstName ? firstName : prevState.firstName || undefined,
      lastName: lastName ? lastName : prevState.lastName || undefined,
      username: username ? username : prevState.username || undefined,
      circleColor: circleColor ? circleColor : prevState.circleColor,
      labelColor: labelColor ? labelColor : prevState.labelColor,
    }))
  }

  const previewImage = async (event) => {
    setFileInputValue(event.target.value);
    postPreviewProfileApi(event).then(response => {
      setPicturePreview(response.data.link);
    })
  }

  const handleClearPicture = (event) => {
    setPicturePreview("")
    setFileInputValue("")
  }

  return (
    <>
      {isLoaded && (
        <Box sx={{
          flexGrow: 1,
          width: "100%",
          maxWidth: "900px",
          m: "auto"
        }}>
          <Paper elevation={3} sx={{ minHeight: "350px" }}>
            <List sx={{ p: 0 }}>
              <HeaderRow label="Change your appearance." />
            </List>
            <div sx={{ padding: "20px", }}>

              <form style={{ minHeight: "155px" }} onSubmit={handleSubmit}>
                <div style={{ margin: "30px" }}>
                  {/* <FirstNameInput /> */}
                  <TextField
                    margin="normal"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoFocus
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}

                    error={firstNameError.length}
                    helperText={firstNameError}
                  // error={emailErrorMessage.length}
                  // helperText={emailErrorMessage}
                  />
                  <br />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    error={lastNameError.length}
                    helperText={lastNameError}
                  // error={emailErrorMessage.length}
                  // helperText={emailErrorMessage}
                  />
                  {/* <LastNameInput /> */}
                  <br />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    error={usernameError.length}
                    helperText={usernameError}
                  // error={emailErrorMessage.length}
                  // helperText={emailErrorMessage}
                  />
                  {/* <UsernameInput /> */}
                  <br />
                  <br />
                  <FormControl fullWidth error={callByTypeError.length}>
                    <InputLabel id="demo-simple-select-label">What to call you by?</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={age}
                      label="What to call you by?"
                      // onChange={handleChange}
                      value={callByType}
                      onChange={(event) => setCallByType(event.target.value)}


                    >
                      <MenuItem value="EMAIL">Email</MenuItem>
                      <MenuItem value="USERNAME">Username</MenuItem>
                      <MenuItem value="FIRST_NAME">First Name</MenuItem>
                      <MenuItem value="LAST_NAME">LastName</MenuItem>
                      <MenuItem value="FULL_NAME">Full Name</MenuItem>
                    </Select>
                    {callByTypeError && (<FormHelperText>{callByTypeError}</FormHelperText>)}
                  </FormControl>
                  <br />
                  <br />
                  <InputLabel id="select-field-demo-label" htmlFor="select-field-demo-button">
                    Picture
                  </InputLabel>

                  <Stack spacing={2} direction="row">
                    <Button
                      variant="contained"
                      component="label"
                    >
                      Upload File
                      <input
                        id="picture"
                        name="picture"
                        value={fileInputValue}
                        onChange={previewImage}
                        type="file"
                        hidden
                      />
                    </Button>
                    <Button onClick={handleClearPicture}>Clear</Button>
                  </Stack>
                  <div style={{ display: "table", border: "5px solid black", padding: "3px", marginTop: "5px", marginBottom: "5px" }}>
                    <img src={picturePreview && picturePreview.length !== 0 ? `${process.env.NEXT_PUBLIC_WEB_API_URL}${picturePreview}` : "/no-image/8_Bit_Dinosaur_With_Laptop.png"} style={{ width: "150px" }} />
                  </div>
                  <br />
                  <FormControl>
                    <p>Primary Color</p>
                    <br />
                    <MuiColorInput
                      value={labelColor}
                      onChange={(newValue) => setLabelColor(newValue)}
                    />
                  </FormControl>
                  {/* <PrimaryColorSelect /> */}
                  <br />
                  <br />
                  <FormControl>
                    <p>Secondary Color</p>
                    <MuiColorInput
                      value={circleColor}
                      onChange={(newValue) => setCircleColor(newValue)}
                    />
                  </FormControl>
                  {/* <SecondaryColorSelect /> */}
                  <br />
                  <br />
                  <Paper elevation={3} sx={{ p: "15px" }}>
                    <p>Preview</p>
                    <UserChip
                      email={email}
                      firstName={firstName}
                      lastName={lastName}
                      username={username}
                      callByType={callByType}
                      picturePreview={picturePreview}
                      labelColor={labelColor}
                      circleColor={circleColor}
                    />

                  </Paper>
                  <br />
                  <Button variant="contained" type="submit">Save</Button>
                  <br />
                  <br />
                </div>
              </form >
            </div>
          </Paper>
        </Box>
      )}
    </>
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