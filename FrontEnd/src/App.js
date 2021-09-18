import React from "react";
import Main from "./pages/Main";
import "./styles.css";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";

import ContractView from "./pages/ContractView";
import Login from "./pages/Login";

const App = () => {
  const mnemonic = Cookies.get("mnemonic");
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route
          exact
          path="/ContractView/:blockTimeStamp"
          component={ContractView}
        />
        {mnemonic === undefined ? <Redirect to="/login" /> : <Main />}
      </Switch>
    </BrowserRouter>
  );
};

export default App;

// <form onSubmit={handleSubmit}>
// <p>Token Name: </p>
// <input id="tokenname" name="tokenname" type="text" />
// <br />
// <p>Token Symbol: </p>
// <input id="tokensym" name="tokensym" type="text" />
// <br />
// <p>Token Initial Supply: </p>
// <input id="initsupp" name="initsupp" type="number" />
// <br />
// <br />
// <button id="deploybutton" type="submit">
//   Deploy
// </button>
// </form>
