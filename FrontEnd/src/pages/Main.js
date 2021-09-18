import { useState } from "react";
import Cookies from "js-cookie";
import Login from "./Login";
import NewContract from "./NewContract";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import http from "../services/http-common";
import Test from "./Test";
import Paper from "@material-ui/core/Paper";
import TokensList from "../components/ContractList";
import NavBar from "../components/NavBar";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";

export default function Main() {
  // TESTING
  // return <Test />;
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="http://localhost:3000/">
          Ethereum Token Generator
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const [showNewContracts, setshowNewContracts] = useState(false);

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
    addNewBtn: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "right",
      marginTop: theme.spacing(3),
      marginLeft: "auto",
    },
  }));
  const classes = useStyles();
  const mnemonic = Cookies.get("mnemonic");

  // if (mnemonic === undefined) return <Redirect to="/login" />;
  // else
  return (
    <>
      <NavBar />

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <TokensList />
          {!showNewContracts && (
            <Button
              variant="outlined"
              className={classes.addNewBtn}
              onClick={() => {
                setshowNewContracts(true);
              }}
            >
              New Contract
            </Button>
          )}
        </Paper>
        {showNewContracts && (
          <NewContract
            handleCloseBtn={() => {
              setshowNewContracts(false);
            }}
          />
        )}
      </main>
      <Copyright />
    </>
  );
}
