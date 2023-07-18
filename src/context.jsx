import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";

import reducer from "./reducer/reducer";
import {
  CLEAR_CART,
  DECREASE_AMOUNT,
  DISPLAY_ITEMS,
  INCREASE_AMOUNT,
  REMOVE_ITEM,
  START_FETCHING_DATA,
  STOP_FETCHING_DATA,
} from "./reducer/actions";

import { getTotals } from "./utils/utils";

const GlobalContext = createContext();

const url = "https://www.course-api.com/react-useReducer-cart-project";

const initialState = {
  cart: new Map(),
  loading: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { totalAmount, totalPrice } = getTotals(state.cart);

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: { id } });
  };

  const increaseAmount = (id) => {
    dispatch({ type: INCREASE_AMOUNT, payload: { id } });
  };

  const decreaseAmount = (id) => {
    dispatch({ type: DECREASE_AMOUNT, payload: { id } });
  };

  const fetchData = useCallback(async () => {
    dispatch({ type: START_FETCHING_DATA });
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }

      const cart = await response.json();
      dispatch({ type: DISPLAY_ITEMS, payload: { cart } });
    } catch (err) {
      console.error(err.message);
    } finally {
      dispatch({ type: STOP_FETCHING_DATA });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseAmount,
        decreaseAmount,
        totalAmount,
        totalPrice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default AppProvider;
