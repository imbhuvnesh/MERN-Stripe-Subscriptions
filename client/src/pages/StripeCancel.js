import axios from "axios";
import { useContext, useEffect } from "react";
import { UserContext } from "../context";
import { useNavigate } from "react-router-dom";

import { WarningTwoTone } from "@ant-design/icons";

const StripeCancel = () => {
  const [state, setState] = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!state) {
      navigate("/login");
      console.log(state);
    }
  }, []);
  return (
    <div className="d-flex justify-content-center fw-bold" style={{ height: "90vh" }}>
      <div className="d-flex align-items-center">
        <WarningTwoTone style={{ fontSize: "50px" }}></WarningTwoTone>
      </div>
    </div>
  );
};

export default StripeCancel;
