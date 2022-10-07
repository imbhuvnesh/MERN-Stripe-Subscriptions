import { useContext } from "react";
import { UserContext } from "../../context";
import { Navigate, Route } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const [state, setState] = useContext(UserContext);

  if (!localStorage.getItem("auth")) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default AuthRoute;
