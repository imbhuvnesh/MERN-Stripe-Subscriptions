import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./context";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthRoute from "./components/routes/AuthRoute";

import { Toaster } from "react-hot-toast";
import StripeSuccess from "./pages/StripeSuccess";
import StripeCancel from "./pages/StripeCancel";
import Account from "./pages/Account";

function App() {
  const [state, setState] = useContext(UserContext);
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route
          exact
          path="/stripe/success"
          element={
            <AuthRoute>
              <StripeSuccess />
            </AuthRoute>
          }
        ></Route>
        <Route
          exact
          path="/stripe/cancel"
          element={
            <AuthRoute>
              <StripeCancel />
            </AuthRoute>
          }
        ></Route>
        <Route
          exact
          path="/account"
          element={
            <AuthRoute>
              <Account />
            </AuthRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
