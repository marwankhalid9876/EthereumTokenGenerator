import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

export default function Attributes(props) {
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));

  return (
    <>
      {props.tknType === "erc20" ? (
        <Erc20look {...props} />
      ) : (
        <Erc721look {...props} />
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={props.whiteListChecked}
                onChange={(e) => props.setwhiteListChecked(e.target.checked)}
              />
            }
            label="Enable whitelist"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label>
            Closed Group Token, You specifiy who can participate in the token
          </label>
        </Grid>
      </Grid>
    </>
  );

  //   // if (props.tknType === "erc20") return <Erc20look {...props} />;
  //   // else return <Erc721look {...props} />;
}
const Erc721look = (props) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Name the following
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="tknName"
            label="Token Name"
            fullWidth
            value={props.tknName}
            onChange={(e) => {
              props.settknName(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label>
            The name of the token. 3-25 symbols. Alphanumerical characters,
            space, and hyphen are accepted.
          </label>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="tknSym"
            label="Token Symbol"
            fullWidth
            value={props.tknSym}
            onChange={(e) => {
              props.settknSym(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label>
            2-10 characters (example ETH, BTC, BAT, etc.). No spaces. Only
            alphanumerical characters.
          </label>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Erc20look = (props) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Name the following
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="tknName"
            label="Token Name"
            fullWidth
            value={props.tknName}
            onChange={(e) => {
              props.settknName(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label>
            The name of the token. 3-25 symbols. Alphanumerical characters,
            space, and hyphen are accepted.
          </label>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="tknSym"
            label="Token Symbol"
            fullWidth
            value={props.tknSym}
            onChange={(e) => {
              props.settknSym(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label>
            2-10 characters (example ETH, BTC, BAT, etc.). No spaces. Only
            alphanumerical characters.
          </label>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="tknSup"
            label="Token Total Suply"
            fullWidth
            value={props.tknSup}
            onChange={(e) => {
              props.settknSup(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label>
            Total amount of tokens to be generated. Minimum value is 1, and
            maximum 1000000000000000.
          </label>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
