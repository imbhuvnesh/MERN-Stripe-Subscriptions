import { useContext } from "react";
import { UserContext } from "../../context";

const PriceCard = ({ price, handleSubscription, userSubs }) => {
  const [auth] = useContext(UserContext);
  const borderStyle = (price) => {
    return price.nickname === "Premium" ? "border-danger" : "";
  };

  const headerStyle = (price) => {
    return price.nickname === "Premium" ? "bg-danger text-light" : "";
  };

  const buttonStyle = (price) => {
    return price.nickname === "Basic" ? "btn-outline-danger" : "btn-danger text-light";
  };

  const buttonText = () => {
    return auth ? "Buy the plan" : "Sign Up";
  };

  const dynamicDescription = () => {
    if (price.nickname === "Basic") {
      return "5 Exclusive stocks";
    } else if (price.nickname === "Standard") {
      return "10 Exclusive stocks";
    }
    return "20 Exclusive stocks";
  };
  return (
    <div className="col">
      <div className={`card mb-4 rounded-3 shadow-sm ${borderStyle(price)}`}>
        <div className={`card-header py-3 ${headerStyle(price)}`}>
          <h4 className="my-0 fw-normal">{price.nickname}</h4>
        </div>
        <div className="card-body">
          <h1 className="card-title pricing-card-title">
            {(price.unit_amount / 100).toLocaleString("en-IN", {
              style: "currency",
              currency: "USD",
            })}{" "}
            <small className="text-muted fw-light">/mo</small>
          </h1>
          <ul className="list-unstyled mt-3 mb-4">
            <li>{dynamicDescription(price)}</li>
            <li>Free Market Analysis</li>
            <li>Email Support</li>
            <li>Help Center Access</li>
          </ul>
          <button
            className={`w-100 btn btn-lg btn-outline-danger ${buttonStyle(price)}`}
            onClick={() => handleSubscription(price)}
          >
            {userSubs && userSubs.includes(price.id) ? "Access Plan" : buttonText()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
