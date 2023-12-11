import React from 'react'
import {
    Typography,
    TextField,
    Button,
    CssBaseline,
    Grid,
    Box,
} from "@mui/material";
import axios from 'axios';



const ResetMail = () => {

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        const response= await axios.post('http://127.0.0.1:8000/api/user/send-reset-password-email/',{
        email: formdata.get('email'),
    })
    console.log(response);

    }
  return (
    <>
      <CssBaseline />
      <Grid
        container
        style={{
          background: "linear-gradient(to right, #8e2de2, #4a00e0)",
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid
          container
          style={{
            margin: "0 0 0 20",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Grid item sm={0} md={3} />
          <Grid item md={6}>
            <Typography variant="h4" color="white" align="center">
              Send Reset Email Address
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ color: "#fff" }}
                sx={{ mt: 3, mb: 2, fontSize: 16, pt: 3, pb: 3 }}
              >
                Send Mail
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default ResetMail