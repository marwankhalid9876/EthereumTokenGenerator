import Cookies from "js-cookie";
import Login from "./Login";
import NewContract from "./NewContract";

export default function Main() {
  console.log("mn", Cookies.get("mnemonic"));
  if (Cookies.get("mnemonic") === undefined) return <Login />;
  else return <NewContract />;
}
