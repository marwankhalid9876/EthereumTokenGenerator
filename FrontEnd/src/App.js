import React from "react";
import Main from "./pages/Main";
import "./styles.css";
const App = () => {
  return (
    <div>
      <Main />
    </div>
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
