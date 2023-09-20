import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import CartPage from "./pages/cartPage.jsx";
import CheckOutPage from "./pages/checkoutPage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  cartReducer,
  orderReducer,
  productReducer,
  userReducer,
} from "./redux/reducers/index";
import Profile from "./components/myOrders.jsx";
import AdminLayout from "./components/admin/adminLayout.jsx";
import Main from "./components/admin/home.jsx";
import AddProduct from "./components/admin/addProduct.jsx";
import AdminLogin from "./components/admin/adminLogin.jsx";
import AllOrders from "./components/admin/allOrder.jsx";
import Error from "./components/admin/error.jsx";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckOutPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="orders" element={<Profile />} />
            <Route path="*" element={<Error />} />
          </Route>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Main />} />
            <Route path="add/product" element={<AddProduct />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="orders" element={<AllOrders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </NextUIProvider>
);
