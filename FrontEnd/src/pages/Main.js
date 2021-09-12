import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import SelectType from "../components/SelectType";
import Attributes from "../components/Attributes";
import Confirmation from "../components/Confirmation";
import deploy from "../services/deploy";

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

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
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
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Token Type", "Token Attributes", "Confirmation"];

function getStepContent(
  step,
  {
    tknType,
    settknType,
    tknName,
    settknName,
    tknSym,
    settknSym,
    tknSup,
    settknSup,
    tkninfo,
  }
) {
  switch (step) {
    case 0:
      return <SelectType tknType={tknType} setTokenType={settknType} />;
    case 1:
      return (
        <Attributes
          tknName={tknName}
          settknName={settknName}
          tknSym={tknSym}
          settknSym={settknSym}
          tknSup={tknSup}
          settknSup={settknSup}
        />
      );
    case 2:
      return <Confirmation tkninfo={tkninfo} />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Main() {
  const [tknType, settknType] = useState("");
  const [tknName, settknName] = useState("");
  const [tknSym, settknSym] = useState("");
  const [tknSup, settknSup] = useState("");

  const tkninfo = [
    { name: "Token Name", value: tknName },
    { name: "Token Type", value: tknType },
    { name: "Token Symbol", value: tknSym },
    { name: "Inital Supply", value: tknSup },
  ];
  const stateControle = {
    tknType,
    settknType,
    tknName,
    settknName,
    tknSym,
    settknSym,
    tknSup,
    settknSup,
    tkninfo,
  };

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === 2) {
      deploy
        .send({
          tknType: tknType,
          tknName: tknName,
          tknSym: tknSym,
          tknSup: tknSup,
        })
        .then((res) => console.log("success ===>", res))
        .catch((err) => console.log("error ===<", err));
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
            <Typography variant="h6" color="inherit" noWrap>
              Ethereum Token Generator
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Token Creation Wizard
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Your Request is Being processed.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539.
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep, stateControle)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Deploy" : "Next"}
                  </Button>
                </div>
              </>
            )}
          </>
        </Paper>
      </main>
      <Copyright />
    </>
  );
}
