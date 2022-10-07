import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import moment from "moment";
const Account = () => {
  const [state, setState] = useContext(UserContext);
  const [subs, setSubs] = useState([]);
  const getSubscriptions = async () => {
    try {
      const { data } = await axios.get("/subscriptions");
      console.log("data: ", data);
      setSubs(data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const manageSubscriptions = async () => {
    try {
      const { data } = await axios.get("/customer-portal");
      window.open(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getSubscriptions();
  }, []);
  return (
    <div className="container p-5">
      <div className="row">
        <UserOutlined className="display-4" />
        <h1>Account</h1>
        <p className="lead pb-4">Subscription status</p>
        {/* <pre>{JSON.stringify(subs, null, 4)}</pre> */}
        <button className="btn btn-warning w-25" onClick={manageSubscriptions}>
          Manage Subscriptions
        </button>
      </div>
      <div className="row">
        {subs &&
          subs.map((sub) => (
            <div key={sub.id}>
              <section>
                <hr />
                <h4 className="fw-bold">{sub.plan.nickname}</h4>
                <h5>
                  {(sub.plan.amount / 100).toLocaleString("en-IN", {
                    style: "currency",
                    currency: sub.plan.currency,
                  })}{" "}
                </h5>
                <p>Status: {sub.status}</p>
                <p>Card last 4 digits: {sub.default_payment_method.card.last4}</p>
                <p>
                  Current period end:{" "}
                  {moment(sub.current_period_end * 1000)
                    .format("dddd, MMMM Do YYYY h:mm:ss:a")
                    .toString()}
                </p>
                {/* <button className="btn btn-outline-danger">Access</button>{" "} */}
              </section>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Account;
