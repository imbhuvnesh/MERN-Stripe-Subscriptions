import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import Button from "../components/Button";
import Input from "../components/Input";
import { UserContext } from "../context";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [state, setState] = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async function (event) {
    event.preventDefault();
    try {
      const data = { email, password };
      const response = await axios.post("/login", {
        data,
      });
      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
      console.log(response);
      setEmail("");
      setState(response.data);
      setPassword("");

      localStorage.setItem("auth", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong, Please try again!");
    }
  };

  return (
    <div className="d-flex justify-content-center" style={{ height: "80vh" }}>
      <div className="container d-flex align-items-center">
        <div className="row col-md-6 offset-md-3 text-center">
          <h1 className="pt-5 fw-bold">Login here!</h1>

          <div className="form-group">
            <Input type="email" label="Email" value={email} setValue={setEmail} />
            <Input type="password" label="Password" value={password} setValue={setPassword} />
            <Button
              type="danger"
              size="sm"
              text="Login"
              handleClick={handleLogin}
              disabled={!(email && password)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
