import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PriceCard from "../components/cards/PriceCard";
import { UserContext } from "../context";

const Home = () => {
  const [prices, setPrices] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [state] = useContext(UserContext);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("auth");
  const fetchPrices = async () => {
    try {
      const { data } = await axios.get("/prices");
      console.log("data: ", data);
      setPrices(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBuy = async (price) => {
    // e.preventDefault();
    if (subscriptions?.includes(price.id)) {
      navigate("/account");
      return;
    }

    if (state && state.token) {
      try {
        const { data } = await axios.post("/create-subscription", {
          priceId: price.id,
        });
        window.open(data);
      } catch (err) {
        console.error(err);
      }
    } else {
      navigate("/register");
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  useEffect(() => {
    const result = [];
    const check = () =>
      state?.user?.subscriptions?.map((sub) => {
        result.push(sub.plan.id);
      });
    check();
    setSubscriptions(result);
  }, [state && state.user]);
  return (
    <div className="container-fluid">
      <div className="row col-md-6 offset-md-3 text-center">
        <h1 className="pt-5 fw-bold">Explore the right plans for your business</h1>
        <p className="lead pb-4">Choose a plan that suits you best!</p>
      </div>
      <div className="row pt-5 mb-3 text-center">
        {prices &&
          prices.map((price) => {
            return (
              <PriceCard
                key={price.id}
                price={price}
                handleSubscription={handleBuy}
                userSubs={subscriptions}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
