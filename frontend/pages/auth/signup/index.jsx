'use client'

// Libraries
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Mine
import { setUserToken } from "@/utils/graphql/user";
import { processGraphQLErrors } from "@/utils/graphql/processGraphQLErrors.func";
import { signUpGraphQL } from "@/pages-scripts/auth/signup/signup.graphql";
import AuthLayout from "@/layouts/authLayout/layout";

// MUI
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// icons
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

function Page() {
  const theme = useTheme();
  const router = useRouter();

  const [emailErrorMessage, setEmailErrorMessage] = useState("")
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("")


  const handleSubmit = (event) => {
    event.preventDefault();

    setEmailErrorMessage("")
    setPasswordErrorMessage("")
    setConfirmPasswordErrorMessage("")

    const data = new FormData(event.currentTarget);

    if (data.get('email') === "") {
      setEmailErrorMessage("Email is required")
      return;
    }

    if (data.get('password') === "") {
      setPasswordErrorMessage("Password is required")
      return;
    }

    if (data.get('confirmPassword') === "") {
      setConfirmPasswordErrorMessage("Confirm Password is required")
      return;
    }



    signUpGraphQL({
      email: data.get('email'),
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword')
    }).then(response => {
      const result = processGraphQLErrors({ response })
      if (result.success) {
        setUserToken({
          token: response.data.foundationAuth_signup.token,
        })
        router.push("/client/vcs")
      } else {
        switch (result.error) {
          case "0001":
            setEmailErrorMessage(result.message)
            break;
          case "0002":
            setEmailErrorMessage(result.message)
            break;
          case "0003":
            setEmailErrorMessage(result.message)
            break;
          case "0004":
            setPasswordErrorMessage(result.message)
            break;
          case "0005":
            setConfirmPasswordErrorMessage(result.message)
            break;
          case "0006":
            setConfirmPasswordErrorMessage(result.message)
            break;
          case "0007":
            setPasswordErrorMessage(result.message)
            break;
        }
      }
    })
  };

  return (
    <>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Link href="/auth/signin/">
          <Typography component="h2" variant="h6">
            <div
              style={{
                display: "flex",
                color: theme.palette.grey[600],
              }}
            >
              <div>
                <ArrowCircleLeftIcon style={{ marginRight: "3px", fontSize: "30px" }} />
              </div>
              <div> Back </div>
            </div>
          </Typography>
        </Link>
      </Box>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
          <VpnKeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            error={emailErrorMessage.length}
            helperText={emailErrorMessage}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={passwordErrorMessage.length}
            helperText={passwordErrorMessage}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            error={confirmPasswordErrorMessage.length}
            helperText={confirmPasswordErrorMessage}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <AuthLayout>
      {page}
    </AuthLayout>
  )
}

export default Page