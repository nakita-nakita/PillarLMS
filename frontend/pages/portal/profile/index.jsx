'use client'

// library
import React, { useState, useEffect } from "react"
import { MuiColorInput } from 'mui-color-input'
import axios from 'axios';

// mine
import AdminLayout from "@/layouts/admin/layout";
import { getUserToken } from "@/utils/graphql/user";
import uploaderUtil from "@/utils/uploader/callUploaderApi";
import { getProfileGraphQL, postProfileGraphQL } from "@/pages-scripts/portal/profile/profile.graphql";
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
  const [hasPicturedPreviewChanged, setHasPicturedPreviewedChanged] = useState(false)
  const [doesPictureHaveValue, setDoesPictureHaveValue] = useState(false)

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
        setCallByType(profileData.data.foundationUserProfile_getOne.callByType)
        setCircleColor(profileData.data.foundationUserProfile_getOne.circleColor)
        setLabelColor(profileData.data.foundationUserProfile_getOne.labelColor)
        setFirstName(profileData.data.foundationUserProfile_getOne.firstName)
        setLastName(profileData.data.foundationUserProfile_getOne.lastName)
        setPicturePreview(profileData.data.foundationUserProfile_getOne.picture)
        setUsername(profileData.data.foundationUserProfile_getOne.username)
      }

      setIsLoaded(true)
    })
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let newPicture = null;


    if (hasPicturedPreviewChanged && data.get('picture')) {

      if (data.get('picture')) {
        newPicture = await uploaderUtil.postUserAvatar({
          file: data.get('picture')
        })
      }
    }



    await postProfileGraphQL({
      callByType,
      firstName,
      lastName,
      username,
      picture: newPicture ? newPicture?.data?.data?.link : undefined,
      circleColor,
      labelColor,
    })

    console.log('idChip', idChip)
    setIdChip(prevState => ({
      ...prevState,
      callByType: callByType ? callByType : prevState.callByType,
      firstName: firstName ? firstName : prevState.firstName,
      lastName: lastName ? lastName : prevState.lastName,
      username: username ? username : prevState.username,
      picture: newPicture ? newPicture?.data?.data?.link : prevState.picture,
      circleColor: circleColor ? circleColor : prevState.circleColor,
      labelColor: labelColor ? labelColor : prevState.labelColor,
    }))
    // await uploaderUtil.postUserAvatar({})
  }

  const previewImage = async (event) => {
    const userAvatarPreview = `${process.env.NEXT_PUBLIC_WEB_API_URL}/api/v1/uploader/user-avatar-previewer`
    const file = event.target.files[0]

    var formData = new FormData()
    formData.append('files', file)

    const token = getUserToken()

    const config = {
      headers: {
        "Authorization": `Bearer ${token}`,
        'content-type': 'multipart/form-data',
      }
    }

    const response = await axios.post(userAvatarPreview, formData, config)
    // const response = await post(userAvatarPreview, formData,config)
    setPicturePreview(response.data.data.link);
    setHasPicturedPreviewedChanged(true)
    setDoesPictureHaveValue(true)
  }

  const handleClearPicture = () => {
    setPicturePreview("")
    setHasPicturedPreviewedChanged(true)
    setDoesPictureHaveValue(false)
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
          <Paper elevation={3} sx={{ padding: "20px", minHeight: "350px" }}>
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
              </div>
            </form >
          </Paper>
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