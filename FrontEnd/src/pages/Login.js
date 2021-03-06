import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import http from "../services/http-common.js";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/">
        Ethereum Token Generator
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const mnemonic = data.get("mnemonic");
    console.log({
      mnemonic: data.get("mnemonic"),
    });

    // pelican enable chief quality install huge pear acid speak into match river
    // 0x4c0dc7A9C7ceC8C7e6B839879c01137c8b8519EF ERC20

    http
      .post("http://localhost:8080/login", { mnemonic: mnemonic })
      .then((res) => {
        console.log("succes ==>", res);
        window.location.replace("/");

        // window.location.reload();
      })
      .catch((err) => {
        // console.log("error =<", err);
        console.log("error", err.response);
        alert(err.response.data);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ width: "35%", margin: "auto", padding: "2px" }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in (Rinkeby Test-Network)
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {/* <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            /> */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="mnemonic"
                label="mnemonic"
                type="mnemonic"
                id="mnemonic"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Paper>
    </ThemeProvider>
  );
}
