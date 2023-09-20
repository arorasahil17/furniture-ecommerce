import { Outlet, useLocation } from "react-router";
import "./App.css";
import Nav from "./components/nav";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authenticate, fetchProducts, initCart } from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoginPage = location.pathname.includes("/login");
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(authenticate());
    dispatch(initCart());
  }, [dispatch]);
  return (
    <>
      {!isLoginPage && <Nav />}
      <Outlet />
    </>
  );
}

export default App;
