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
import { Link } from "react-router-dom";

const Tokenitem = (props) => {
  const { token } = props;
  const handleClick = () => {
    console.log("clkick");
  };
  return (
    <>
      <Button
        style={{ width: "100%", alignItems: "left", justifyContent: "left" }}
        href={props.href}
      >
        <h4>
          {token.tknName} ({token.tknType})
        </h4>
      </Button>
      <hr />
    </>
    // <Link
    //   to="/ee"
    //   onClick={handleClick}
    //   style={{
    //     width: "100%",
    //     borderStyle: "solid",
    //     alignItems: "left",
    //     justifyContent: "left",
    //   }}
    // >

    // </Link>
  );
};

export default function ContractList(props) {
  const [tokens, settokens] = useState([]);
  useEffect(() => {
    tokenService
      .getUserTokenList()
      .then((res) => {
        console.log("success ==>>", res.data);
        settokens(res.data);
      })
      .catch((err) => console.log("err ==<", err));
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        My Contracts
      </Typography>

      <Grid
        container
        direction="column"
        justifyContent="left"
        alignItems="left"
      >
        {tokens.map((token) => (
          <Grid>
            <Tokenitem
              token={token}
              href={"/ContractView/" + token.block_timestamp}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
