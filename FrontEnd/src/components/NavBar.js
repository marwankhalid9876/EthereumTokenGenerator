import { useState } from "react";
import Cookies from "js-cookie";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import http from "../services/http-common";
import Paper from "@material-ui/core/Paper";

export default function NavBar(props) {
  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: "relative",
      display: "flex",
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {},
    button: {
      // marginTop: theme.spacing(3),
      // marginLeft: theme.spacing(1),
    },
  }));
  const classes = useStyles();
  const mnemonic = Cookies.get("mnemonic");

  const handleLogout = () => {
    http
      .post("http://localhost:8080/logout", { mnemonic: mnemonic })
      .then((res) => {
        console.log("succes ==>", res);
        window.location.reload();
      })
      .catch((err) => {
        console.log("error =<", err);
      });
  };
  return (
    <>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <a href="/" style={{ textDecoration: "none" }}>
            <Typography variant="h6" color="inherit" noWrap style={{ flex: 1 }}>
              Ethereum Token Generator
            </Typography>
          </a>
          <Button
            className={classes.button}
            onClick={handleLogout}
            style={{ marginLeft: "auto" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
