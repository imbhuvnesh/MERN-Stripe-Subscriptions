import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context";

const Navbar = () => {
  const navigate = useNavigate();
  const [state, setState] = useContext(UserContext);
  const logout = async () => {
    try {
      const { data } = await axios.get("/logout");

      toast.success(data.message);

      localStorage.removeItem("auth");
      setState({
        user: {},
        token: "",
      });

      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ul className="nav border">
      <li className="nav-item">
        <Link className="nav-link" aria-current="page" to="/">
          Home
        </Link>
      </li>
      {state && state.token ? (
        <div className="nav-item">
          <li
            className="btn nav-link dropdown-toggle"
            // type="button"
            // id="dropdownMenuButton"
            data-toggle="dropdown"
            // aria-haspopup="true"
            // aria-expanded="false"
          >
            {state.user.email}
          </li>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li className="nav-item dropdown-item">
              <Link className="nav-link cursor-pointer" to="/account">
                Account
              </Link>
            </li>
            <li className="nav-item dropdown-item">
              <span className="nav-link cursor-pointer" onClick={logout}>
                Logout
              </span>
            </li>
          </div>
        </div>
      ) : (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default Navbar;
