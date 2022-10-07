import { useState, useEffect, createContext } from "react";
import axios from "axios";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: {},
    token: "",
  });

  useEffect(() => {
    setState((prev) => ({
      user: JSON.parse(localStorage.getItem("user")),
      token: localStorage.getItem("auth"),
    }));
  }, []);

  //axios config
  const token = state && state.token ? state.token : "";
  axios.defaults.baseURL = process.env.REACT_APP_API;
  axios.defaults.headers.common["Authorization"] = `${token}`;
  axios.defaults.withCredentials = true;

  return <UserContext.Provider value={[state, setState]}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
