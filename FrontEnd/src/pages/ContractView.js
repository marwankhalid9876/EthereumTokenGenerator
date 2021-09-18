import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import tokenService from "../services/tokenService";
import Button from "@material-ui/core/Button";
import { Link, useParams } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

import parseArgs from "../services/parser";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    display: "flex",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 900,
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

const FormDialog = (props) => {
  const [args, setargs] = useState([]);
  const [resultFromCall, setresultFromCall] = useState("");
  const contractInfo = props.contractInfo;
  const callMethod = (methodName, args) => {
    console.log("calling", methodName, "args", args);
    const contractAddress = contractInfo.contract_address;
    const tknType = contractInfo.tknType;
    tokenService
      .callMethod({ contractAddress, methodName, args, tknType })
      .then((res) => {
        console.log("success ==>", res.data);
        setresultFromCall(res.data);
      })
      .catch((err) => console.log("err ==<", err));
  };

  useEffect(() => {
    if (props.showDialog == false) return;
    const parsedArgs = parseArgs(props.method);
    setargs(parsedArgs);
    if (parsedArgs == 0) callMethod(props.method, []);
  }, [props.showDialog]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {};
    let argsStack = [];
    let methodName = "";
    for (let i = 0; i < form.elements.length - 2; i++) {
      const elem = form.elements[i];
      if (elem.name === "submittedFormMethodName") {
        methodName = elem.value;
        continue;
      }
      //   data[elem.name] = elem.value;
      argsStack.push({ name: elem.name, value: elem.value });
    }

    callMethod(methodName, argsStack);
  };

  const handleClose = () => {
    setresultFromCall("");
    props.setshowDialog(false);
  };

  return (
    <div>
      <Dialog open={props.showDialog} onClose={handleClose}>
        <form onSubmit={handleFormSubmit}>
          <DialogTitle>Call {props.method}</DialogTitle>
          <DialogContent>
            {!(args == "") && (
              <DialogContentText>
                Requires the following parameters
              </DialogContentText>
            )}
            {args.map((arg) => (
              <TextField
                autoFocus
                margin="dense"
                fullWidth
                variant="standard"
                required
                name={arg}
                label={arg}
                type={arg}
                id={arg}
              />
            ))}
            <input
              type="hidden"
              name="submittedFormMethodName"
              value={props.method.split("(")[0]}
            />

            <Typography variant="h6" gutterBottom>
              Result = {JSON.stringify(resultFromCall)}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Call</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

const InfoRow = (props) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {props.item}:{props.value}
      </Typography>
    </>
  );
};
const MethodCall = (props) => {
  const [showDialog, setshowDialog] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          setshowDialog(true);
        }}
      >
        {props.title}
      </Button>
      <FormDialog
        showDialog={showDialog}
        setshowDialog={setshowDialog}
        method={props.title}
        contractInfo={props.contractInfo}
      />
    </>
  );
};

export default function ContractView(props) {
  const classes = useStyles();
  const [contractInfo, setcontractInfo] = useState({});
  const [contractMethods, setcontractMethods] = useState([]);

  let { blockTimeStamp } = useParams();
  useEffect(() => {
    tokenService
      .getContractInfo({ blockTimeStamp })
      .then((res) => {
        console.log("contratc found ==>>", res.data);
        setcontractInfo(res.data);
      })
      .catch((err) => console.log("err ==<", err));
  }, []);

  useEffect(() => {
    const contractAddress = contractInfo.contract_address;
    const tknType = contractInfo.tknType;
    if (!contractAddress) return;
    console.log("contreact address", contractAddress);
    tokenService
      .getContractMethods({ contractAddress, tknType })
      .then((res) => {
        console.log("Methods ==>>", res.data);
        setcontractMethods(res.data);
      })
      .catch((err) => console.log("err ==<", err));
  }, [contractInfo]);

  const { tknName } = contractInfo;
  return (
    <main className={classes.layout}>
      <Grid
        container
        direction="column"
        justifyContent="left"
        alignItems="left"
      ></Grid>
      <Paper className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          Contract: {tknName}
        </Typography>
        <hr />
        {Object.entries(contractInfo).map(([item, value]) => (
          <InfoRow item={item} value={value} />
        ))}

        <hr />
        <Typography variant="h4" gutterBottom>
          Available Methods:
        </Typography>
        <hr />
        {contractMethods.map((methodName) => (
          <MethodCall title={methodName} contractInfo={contractInfo} />
        ))}
      </Paper>
    </main>
  );
}
