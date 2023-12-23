import React from "react";
import {Link} from 'react-router-dom';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import {
  Typography,
  TextField,
  Button,
  Checkbox,
  CssBaseline,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import AuthContext from "../context/authContext";
import { useContext } from "react";
import styles from "./login.module.css";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);

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
            <Typography variant="h1" color="white" align="center">
              Login 
            </Typography>
            <Box
              component="form"
              onSubmit={loginUser}
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" />}
                label="Remember me"
              />
              <Box marginTop={4} >
                <Typography variant="h7" align="left" ><Link to="/reset_email" style={{"color":"orange"}}>Forgot password?</Link> </Typography>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ color: "#fff" }}
                sx={{ mt: 3, mb: 2, fontSize: 16, pt: 3, pb: 3 }}
              >
                Sign In
              </Button>
              <Box>
                <Typography variant="h6" align="right" >Don't have an account ?<Link to="/" style={{"color":"orange"}}>Request Admin</Link> </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
