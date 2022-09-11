import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import Button from "../components/Button";
import Input from "../components/Input";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleRegister = async function() {
    try {
      const data = { name, email, password };
      const response = await axios.post("/register", {
        data,
      });
      console.log(response);
      toast.success("Registration successful. Please login!");
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
            <Button type="danger" size="sm" text="Register" handleClick={handleRegister} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
