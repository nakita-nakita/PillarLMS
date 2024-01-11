'use client'

// libraries
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

// mine
import { setUserToken } from '@/utils/graphql/user';
import { processGraphQLErrors } from '@/utils/graphql/processGraphQLErrors.func';
import AuthLayout from '@/layouts/authLayout/layout';
import { signInGraphQL } from '@/pages-scripts/auth/signin/signin.graphql';

// MUI
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// icons
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function Page({ searchParams }) {
  const theme = useTheme();
  const router = useRouter();

  const [emailErrorMessage, setEmailErrorMessage] = React.useState("")
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("")
  const [messageBoxErrorMessage, setMessageBoxErrorMessage] = React.useState("")

  console.log("searchParams", searchParams)

  const handleSubmit = (event) => {
    event.preventDefault();

    setEmailErrorMessage("")
    setPasswordErrorMessage("")
    setMessageBoxErrorMessage("")
    const data = new FormData(event.currentTarget);

    if (data.get('email') === "") {
      setEmailErrorMessage("Email is required")
      return;
    }

    if (data.get('password') === "") {
      setPasswordErrorMessage("Password is required")
      return;
    }

    signInGraphQL({
      email: data.get('email'),
      password: data.get('password'),
    }).then(response => {

      const result = processGraphQLErrors({ response })

      if (result.success) {
        setUserToken({
          token: response.data.foundationAuth_signin.token,
        })
        if (!searchParams || isEmpty(searchParams)) {
          router.push("/portal/dashboard/")
        } else {
          router.push(searchParams.url)
        }

        // decodeURIComponent
      } else {
        switch (result.error) {
          case "0000":
            setMessageBoxErrorMessage(result.message)
            break;
          case "0001":
            setEmailErrorMessage(result.message)
            break;
          case "0002":
            setEmailErrorMessage(result.message)
            break;
          case "0003":
            setPasswordErrorMessage(result.message)
            break;
          case "0004":
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
        <Typography component="h2" variant="h6">
          <Link href="/">
            <div
              style={{
                display: "flex",
                color: theme.palette.grey[600],
              }}
            >
              <div>
                <ArrowCircleLeftIcon style={{ marginRight: "3px", fontSize: "30px" }} />
              </div>
              <div>
                Back
              </div>
            </div>
          </Link>
        </Typography>
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
            autoComplete="current-password"
            error={passwordErrorMessage.length}
            helperText={passwordErrorMessage}
          />
          <FormControlLabel
            control={<Checkbox name="remember" id="remember" value="remember" color="primary"
            // value={rememberMe} 
            // onChange={event => setRememberMe(event.target.value)} 
            />}
            label="Remember me"
          />

          {messageBoxErrorMessage && (
            <Box sx={{ color: theme.palette.error.main }}>
              {messageBoxErrorMessage}
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/auth/forgot-password">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/auth/signup/">
                Don't have an account? Sign Up.
              </Link>
            </Grid>
          </Grid>
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