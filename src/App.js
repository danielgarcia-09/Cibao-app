import "./App.css";
import Sidebar from "./components/ui/Sidebar";
import CallForLoginOrHandleRedirect from "./config/azure-ad/settings";
import { useContext, useEffect } from "react";
import AxiosClient from "./config/axios";
import AuthContext from "./context/Auth/AuthContext";

function App() {
  const { GetUser } = useContext(AuthContext);

  useEffect(() => {
    (async function mounted() {
      await CallForLoginOrHandleRedirect(onLoggedIn);
    })();
  }, []);

  const onLoggedIn = async (tokenResponse) => {
    GetUser(tokenResponse);
    AxiosClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${tokenResponse.accessToken}`;
    localStorage.setItem("token", tokenResponse.accessToken);
    localStorage.setItem("ha_id", tokenResponse.account.homeAccountId);
    localStorage.setItem("ms_username", tokenResponse.account.username);
  };
  return <Sidebar />;
}

export default App;
