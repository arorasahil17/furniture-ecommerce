import {
  ADD_PRODUCT,
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_SUCCESS,
  ADMIN_AUTH,
  ADMIN_LOGIN,
  ADMIN_LOGIN_FAILURE,
  DELETE_ITEM_IN_CART,
  DELETE_PRODUCT,
  EMPTY_CART,
  GET_ORDERS,
  GET_ORDERS_REQUEST,
  INIT_CART,
  INIT_CART_FAILURE,
  LOGOUT_ADMIN,
  LOGOUT_ADMIN_FAILURE,
  LOGOUT_USER,
  LOGOUT_USER_FAILURE,
  PLACE_ORDER,
  RESET_CART_STATE,
  RESET_ORDER_STATE,
  RESET_PRODUCT_STATE,
  RESET_USER_STATE,
  UPDATE_ADDRESS,
  UPDATE_CART,
  UPDATE_ORDER,
  UPDATE_ORDER_REQUEST,
  UPDATE_PRODUCT,
  USER_AUTH,
  USER_LOGIN,
  USER_LOGIN_ERROR,
  USER_REGISTER,
  USER_REGISTER_ERROR,
} from "../actions";

const initialStateAdmin = {
  admin: {},
  success: "",
  error: "",
};

const initialStateProducts = {
  products: [],
  loading: false,
  success: "",
  error: "",
};

const initialStateCart = {
  items: {
    products: [],
  },
  loading: false,
  error: null,
  success: null,
};

const initialStateUser = {
  user: null,
  error: null,
  success: null,
};

const initialStateOrder = {
  orders: [],
  loading: false,
  success: "",
  error: "",
};

const productReducer = (state = initialStateProducts, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_PRODUCTS_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case ADD_PRODUCT:
      return { ...state, success: "Product Added" };
    case UPDATE_PRODUCT:
      return { ...state, success: "Product Updated" };
    case RESET_PRODUCT_STATE:
      return { ...state, success: "" };
    case DELETE_PRODUCT:
      return { ...state, success: "Product Deleted" };
    default:
      return state;
  }
};

const cartReducer = (state = initialStateCart, action) => {
  switch (action.type) {
    case INIT_CART:
      if (action.payload === null) {
        return { ...state };
      }
      return { ...state, items: action.payload };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        items: action.payload.cart,
        success: action.payload.message,
      };
    case RESET_CART_STATE:
      return { ...state, success: null, error: null };
    case ADD_TO_CART_FAILURE:
      if (action.payload === "jwt expired") {
        return { ...state, error: "Please Login First" };
      }
      return { ...state, error: action.payload };
    case DELETE_ITEM_IN_CART:
      return { ...state, items: action.payload };
    case INIT_CART_FAILURE:
      return { ...state, items: { products: [] } };
    case UPDATE_CART:
      return { ...state, items: action.payload };
    case EMPTY_CART:
      return { ...state, items: { products: [] } };
    default:
      return state;
  }
};

const userReducer = (state = initialStateUser, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, user: action.payload };
    case USER_LOGIN_ERROR:
      return { ...state, error: action.payload };
    case USER_REGISTER:
      return { ...state, user: action.payload };
    case USER_REGISTER_ERROR:
      return { ...state, error: action.payload };
    case USER_AUTH:
      return { ...state, user: action.payload };
    case LOGOUT_USER:
      return { ...state, user: null };
    case LOGOUT_USER_FAILURE:
      return { ...state, error: action.payload };
    case UPDATE_ADDRESS:
      return { ...state, user: action.payload, success: "Address added!" };
    case RESET_USER_STATE:
      return { ...state, success: "" };
    case PLACE_ORDER:
      return { ...state, user: action.payload, success: "Order Placed" };
    default:
      return state;
  }
};

const adminReducer = (state = initialStateAdmin, action) => {
  switch (action.payload) {
    case ADMIN_LOGIN:
      return {
        ...state,
        admin: action.payload,
        success: "Logged in successfully",
      };
    case ADMIN_LOGIN_FAILURE:
      return { ...state, error: action.payload };
    case ADMIN_AUTH:
      return { ...state, admin: action.payload };
    case LOGOUT_ADMIN:
      return { ...state, admin: {} };
    case LOGOUT_ADMIN_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const orderReducer = (state = initialStateOrder, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return { ...state, loading: true };
    case GET_ORDERS:
      return { ...state, orders: action.payload, loading: false };
    case UPDATE_ORDER:
      return {
        ...state,
        orders: action.payload,
        loading: false,
        success: "Order has been Updated",
      };
    case UPDATE_ORDER_REQUEST:
      return { ...state, loading: true };
    case RESET_ORDER_STATE:
      return { ...state, success: "" };
    default:
      return state;
  }
};

export { productReducer, cartReducer, userReducer, adminReducer, orderReducer };
