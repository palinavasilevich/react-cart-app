import {
  CLEAR_CART,
  DECREASE_AMOUNT,
  INCREASE_AMOUNT,
  REMOVE_ITEM,
  DISPLAY_ITEMS,
  START_FETCHING_DATA,
  STOP_FETCHING_DATA,
} from "./actions";

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_CART: {
      return { ...state, cart: new Map() };
    }

    case REMOVE_ITEM: {
      const newCartItems = new Map(state.cart);
      newCartItems.delete(payload.id);
      return { ...state, cart: newCartItems };
    }

    case INCREASE_AMOUNT: {
      const newCartItems = new Map(state.cart);
      const itemId = payload.id;
      const item = newCartItems.get(itemId);
      const newItem = { ...item, amount: item.amount + 1 };
      newCartItems.set(itemId, newItem);

      return { ...state, cart: newCartItems };
    }

    case DECREASE_AMOUNT: {
      const newCartItems = new Map(state.cart);
      const itemId = payload.id;
      const item = newCartItems.get(itemId);

      if (item.amount === 1) {
        newCartItems.delete(itemId);
        return { ...state, cart: newCartItems };
      }

      const newItem = { ...item, amount: item.amount - 1 };
      newCartItems.set(itemId, newItem);
      return { ...state, cart: newCartItems };
    }

    case START_FETCHING_DATA: {
      return { ...state, loading: true };
    }

    case STOP_FETCHING_DATA: {
      return { ...state, loading: false };
    }

    case DISPLAY_ITEMS: {
      const newCartItems = new Map(payload.cart.map((item) => [item.id, item]));
      return { ...state, cart: newCartItems };
    }

    default:
      return state;
  }
};

export default reducer;
