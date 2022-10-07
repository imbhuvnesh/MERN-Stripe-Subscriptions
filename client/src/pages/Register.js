import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import Button from "../components/Button";
import Input from "../components/Input";
import { UserContext } from "../context";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async function (event) {
    event.preventDefault();
    try {
      const data = { name, email, password };
      const response = await axios.post("/register", {
        data,
      });
      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
      console.log(response);
      setName("");
      setEmail("");
      setPassword("");
      toast.success("Registration successful. Please login!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong, Please try again!");
    }
  };

  return (
    <div className="d-flex justify-content-center" style={{ height: "80vh" }}>
      <div className="container d-flex align-items-center">
        <div className="row col-md-6 offset-md-3 text-center">
          <h1 className="pt-5 fw-bold">Register here to get started!</h1>
          <p className="lead pb-4">Sign Up for free!</p>

          <div className="form-group">
            <Input type="text" label="Name" value={name} setValue={setName} required={true} />
            <Input type="email" label="Email" value={email} setValue={setEmail} />
            <Input type="password" label="Password" value={password} setValue={setPassword} />
            <Button
              type="danger"
              size="sm"
              text="Register"
              handleClick={handleRegister}
              disabled={!(email && name && password)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
