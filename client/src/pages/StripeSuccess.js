import axios from "axios";
import { useContext, useEffect } from "react";

import { SyncOutlined } from "@ant-design/icons";
import { UserContext } from "../context";
import { useNavigate } from "react-router-dom";

const StripeSuccess = () => {
  const [state, setState] = useContext(UserContext);
  const navigate = useNavigate();
  const getSubscriptionStatus = async () => {
    const authToken = localStorage.getItem("auth");

    try {
      const { data } = await axios.get("/subscription-status");
      console.log("data: ", data);
      if (data.subscriptions.length === 0) {
        navigate("/");
      } else {
        const token = localStorage.getItem("auth");
        const auth = {
          user: data,
          token,
        };

        setState(auth);
        setTimeout(() => {
          navigate("/account");
        }, 1000);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getSubscriptionStatus();
  }, []);
  return (
    <div className="d-flex justify-content-center fw-bold" style={{ height: "90vh" }}>
      <div className="d-flex align-items-center">
        <SyncOutlined spin style={{ fontSize: "50px" }}></SyncOutlined>
      </div>
    </div>
  );
};

export default StripeSuccess;
