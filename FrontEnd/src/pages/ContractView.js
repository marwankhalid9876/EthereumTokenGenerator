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
const { jsonToHTMLTable } = require("nested-json-to-table");

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

const ViewRow = (props) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {props.item}:{props.value}
      </Typography>
    </>
  );
};

export default function ContractView(props) {
  const classes = useStyles();
  const [contractInfo, setcontractInfo] = useState({});

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

  //   console.log(
  //     Object.keys(contractInfo).forEach((item, index, array) => {
  //       return <ViewRow key={item} value={contractInfo[item]} />;
  //     })
  //   );

  const { tknName, tknType } = contractInfo;
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
          {tknName}
        </Typography>
        {/* <Typography variant="h6" gutterBottom>
          {JSON.stringify(contractInfo, null, "  ")}
        </Typography> */}

        {Object.entries(contractInfo).map(([item, value]) => (
          <ViewRow item={item} value={value} />
        ))}
      </Paper>
    </main>
  );
}
