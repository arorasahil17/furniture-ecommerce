import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";

export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const DELETE_PRODUCT_ERROR = "DELETE_PRODUCT_ERROR";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_FAILURE = "ADD_TO_CART_FAILURE";
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";
export const USER_REGISTER = "USER_REGISTER";
export const USER_REGISTER_ERROR = "USER_REGISTER_ERROR";
export const USER_AUTH = "USER_AUTH";
export const INIT_CART = "INIT_CART";
export const INIT_CART_FAILURE = "INIT_CART_FAILURE";
export const RESET_CART_STATE = "RESET_CART_STATE";
export const DELETE_ITEM_IN_CART = "DELETE_ITEM_IN_CART";
export const LOGOUT_USER = "LOGOUT_USER";
export const LOGOUT_USER_FAILURE = "LOGOUT_USER_FAILURE";
export const UPDATE_CART = "UPDATE_CART";
export const PLACE_ORDER = "PLACE_ORDER";
export const UPDATE_ADDRESS = "UPDATE_ADDRESS";
export const RESET_USER_STATE = "RESET_USER_STATE";
export const EMPTY_CART = "EMPTY_CART";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const RESET_PRODUCT_STATE = "RESET_PRODUCT_STATE";
export const ADMIN_LOGIN = "ADMIN_LOGIN";
export const ADMIN_LOGIN_FAILURE = "ADMIN_LOGIN_FAILURE";
export const ADMIN_AUTH = "ADMIN_AUTH";
export const GET_ORDERS = "GET_ORDERS";
export const GET_ORDERS_REQUEST = "GET_ORDERS_REQUEST";
export const GET_ORDERS_FAILURE = "GET_ORDERS_FAILURE";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const UPDATE_ORDER_REQUEST = "UPDATE_ORDER_REQUEST";
export const RESET_ORDER_STATE = "RESET_ORDER_STATE";
export const LOGOUT_ADMIN = "LOGOUT_ADMIN";
export const LOGOUT_ADMIN_FAILURE = "LOGOUT_ADMIN_FAILURE";

export const checkAdminAuth = (navigate) => async (dispatch) => {
  try {
    let token = localStorage.getItem("adminToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get("/admin/auth", config);
    if (res.data.success) {
      dispatch({ type: ADMIN_AUTH, payload: res.data.admin });
      navigate("/admin");
    } else {
      navigate("/admin/login");
    }
  } catch (err) {
    navigate("/admin/login");
    console.log(err);
  }
};

export const adminLoginFailure = (message) => ({
  type: ADD_TO_CART_FAILURE,
  payload: message,
});

export const adminLoginAC =
  ({ username, password }, navigate) =>
  async (dispatch) => {
    try {
      const res = await axios.post("/admin/login", { username, password });
      console.log(res);
      if (res.data.success) {
        dispatch({ type: ADMIN_LOGIN, payload: res.data.admin });
        localStorage.setItem("adminToken", res.data.admin.token);
        navigate("/admin");
      } else {
        dispatch(adminLoginFailure(res.data.message));
      }
    } catch (err) {
      console.log(err);
      dispatch(adminLoginFailure(err.response.data.message));
    }
  };

export const logoutAdmin = (navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem("adminToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post("/logout/admin", null, config);
    if (res.data.success) {
      console.log(res);
      localStorage.setItem("adminToken", "");
      dispatch({ type: LOGOUT_ADMIN });
      navigate("/admin/login");
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGOUT_ADMIN_FAILURE,
      payload: err.response.data.message,
    });
  }
};

export const getOrdersRequest = () => ({ type: GET_ORDERS_REQUEST });

export const getOrderFailure = () => ({ type: GET_ORDERS_FAILURE });

export const getOrders = () => async (dispatch) => {
  dispatch(getOrdersRequest());
  try {
    const res = await axios.get("/orders");
    console.log(res);
    if (res.data.success) {
      dispatch({ type: GET_ORDERS, payload: res.data.orders });
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateOrderRequest = () => ({
  type: UPDATE_ORDER_REQUEST,
});

export const updateOrder = (status, orderId) => async (dispatch) => {
  dispatch(updateOrderRequest());
  try {
    const res = await axios.put(`/update/order/${orderId}`, { status });
    if (res.data.success) {
      dispatch({ type: UPDATE_ORDER, payload: res.data.orders });
    }
  } catch (err) {
    console.log(err);
  }
};

export const addProduct = (product) => async (dispatch) => {
  try {
    const res = await axios.post("/add/product", product);
    console.log(res);
    if (res.data.success) {
      dispatch({ type: ADD_PRODUCT });
      dispatch(fetchProducts());
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchProductsRequest = () => ({ type: FETCH_PRODUCTS_REQUEST });

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsRequest());
  try {
    const res = await axios.get("http://localhost:8080/products");
    dispatch(fetchProductsSuccess(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/delete/product/${id}`);
    console.log(res);
    if (res.data.success) {
      dispatch({ type: DELETE_PRODUCT });
      dispatch(fetchProducts());
    }
  } catch (err) {
    console.log(err);
  }
};

export const updatedProduct = (id, product) => async (dispatch) => {
  try {
    const res = await axios.put(`update/product/${id}`, product);
    console.log(res);
    if (res.data.success) {
      dispatch({ type: UPDATE_PRODUCT });
      dispatch(fetchProducts());
    }
  } catch (err) {
    console.log(err);
  }
};

export const addToCartSuccess = (data) => ({
  type: ADD_TO_CART_SUCCESS,
  payload: data,
});

export const addToCartFailure = (data) => ({
  type: ADD_TO_CART_FAILURE,
  payload: data,
});

export const addToCartAC = (product) => async (dispatch) => {
  try {
    let token = localStorage.getItem("token");
    if (token === null) {
      token = "";
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(`/add/to/cart`, product, config);
    if (res.data.success) {
      dispatch(addToCartSuccess(res.data));
    }
  } catch (err) {
    console.log(err);
    dispatch(addToCartFailure(err.response.data.message));
  }
};

export const initCart = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    console.log(`init cart ${token}`);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(`/cart`, null, config);
    if (res.data.success) {
      console.log(res.data.cart);
      dispatch({ type: INIT_CART, payload: res.data.cart });
    } else {
      console.log("cart failure");
      dispatch({ type: INIT_CART_FAILURE });
    }
  } catch (err) {
    console.log(`cart error ${err}`);
    dispatch({ type: INIT_CART_FAILURE });
  }
};

export const logoutUser = (navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post("/logout", null, config);
    if (res.data.success) {
      localStorage.setItem("token", "");
      await dispatch(initCart());
      dispatch({ type: LOGOUT_USER });
      navigate("/");
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: LOGOUT_USER_FAILURE, payload: err.response.data.message });
  }
};

export const resetCartState = () => async (dispatch) => {
  dispatch({ type: RESET_CART_STATE });
};

export const deleteCart = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(`/remove/item/${id}`, null, config);
    if (res.data.success) {
      dispatch({ type: DELETE_ITEM_IN_CART, payload: res.data.cart });
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateCart =
  (productId, newQuantity, navigate) => async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(
        `update/cart/${productId}`,
        { newQuantity },
        config
      );

      if (res.data.success) {
        dispatch({ type: UPDATE_CART, payload: res.data.cart });
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

export const emptyCart = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.delete("/delete/cart", config);
    console.log(res);
    if (res.data.success) {
      dispatch({ type: "EMPTY_CART" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const userLoginError = (data) => ({
  type: USER_LOGIN_ERROR,
  payload: data,
});

export const userLogin = (user, navigate) => async (dispatch) => {
  try {
    const res = await axios.post("/login", user);
    if (res.data.success) {
      const user = res.data.user;
      const token = user.token;
      localStorage.setItem("token", token);
      dispatch({ type: USER_LOGIN, payload: res.data.user });
      dispatch(initCart());
      navigate("/");
    }
  } catch (err) {
    dispatch(userLoginError(err.response.data.message));
    console.log(err);
  }
};

export const userResgisterError = (data) => ({
  type: USER_REGISTER_ERROR,
  payload: data,
});

export const userRegister = (user, navigate) => async (dispatch) => {
  try {
    const res = await axios.post("/register", user);
    if (res.data.success) {
      const user = res.data.user;
      const token = user.token;
      localStorage.setItem("token", token);
      dispatch({ type: USER_REGISTER, payload: res.data.user });
      navigate("/");
    }
  } catch (err) {
    console.log(err);
    dispatch(userLoginError(err.response.data.message));
  }
};

export const authenticate = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post("/auth", null, config);
    if (res.data.success) {
      const user = res.data.user;
      dispatch({ type: USER_AUTH, payload: user });
    }
  } catch (err) {
    console.log(err);
  }
};

export const placeOrder =
  (products, shippingAddress, navigate) => async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(
        `/place/order`,
        { products, shippingAddress },
        config
      );
      if (res.data.success) {
        dispatch({ type: PLACE_ORDER, payload: res.data.user });
        alert("Order Placed");
        navigate("/");
        dispatch(emptyCart());
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

export const addAddress = (address, userId) => async (dispatch) => {
  try {
    const res = await axios.patch(`/add/address/${userId}`, address);
    console.log(res);
    dispatch({ type: UPDATE_ADDRESS, payload: res.data.user });
  } catch (err) {
    console.log(err);
  }
};

export const resetUserState = () => async (dispatch) => {
  dispatch({ type: RESET_USER_STATE });
};

export const resetProductState = () => async (dispatch) => {
  dispatch({ type: RESET_PRODUCT_STATE });
};

export const resetOrderState = () => ({ type: RESET_ORDER_STATE });
