'use client'

// Libraries
import * as React from 'react'
import Link from 'next/link';

// Mine
import { processGraphQLErrors } from '@/utils/graphql/processGraphQLErrors.func';
import AuthLayout from '@/layouts/authLayout/layout';
import { forgotPasswordGraphQL } from '@/pages-scripts/auth/forgot-password/forgot-password.graphql';

// MUI
import { createTheme } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

// icon
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

function Page(props) {
  const theme = createTheme();


  const [showEmailForm, setShowEmailForm] = React.useState(true)
  const [errorMessage, setErrorMessage] = React.useState("")
  const [email, setEmail] = React.useState("")

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrorMessage("")
    const data = new FormData(event.currentTarget);

    if (data.get('email') === "") {
      setErrorMessage("Email is required")
      return;
    }

    forgotPasswordGraphQL({
      email: data.get('email')
    }).then(response => {
      
      const result = processGraphQLErrors({response})

      if (result.success) {
        setEmail(data.get('email'))
        setShowEmailForm(false)
      } else {
        setErrorMessage(result.message)
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

        <Link href={"/auth/signin/"}>

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
              <div>
                Sign In
              </div>
            </div>

          </Typography>
          {/* <Typography component="h2" variant="h3">
            <ArrowCircleLeftIcon style={{ marginRight: "3px", fontSize: "34px" }} />
            Back
          </Typography> */}
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

        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <AlternateEmailIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forget Password
        </Typography>

        {showEmailForm && (
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              error={errorMessage.length}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              helperText={errorMessage}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send
            </Button>
          </Box>
        )}

        {!showEmailForm && (
          <Card sx={{ minWidth: 275, mt: "25px" }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                An email has been sent to the email below
              </Typography>
              {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
              </Typography> */}
              <Typography variant="body2">
                {email}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Resend</Button>
            </CardActions>
          </Card>
          // <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          //   <p>
          //     {completedMessage}
          //   </p>
          // </Box>
        )}

      </Box>
    </>
  );
}


Page.getLayout = function getLayout(page) {
  return (
    <AuthLayout>
      {page}
    </AuthLayout>
  )
}

export default Page

