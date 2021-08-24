const CART_ADD_ITEM = "CART-ADD-ITEM";
const CART_REMOVE_ITEM = "CART-REMOVE-ITEM";

const initialState = {
  cart: [],
  totalQuantity: 0,
};

type InitialStateType = typeof initialState;

export const cartReducer = (state: InitialStateType = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      if (state.cart.find((value) => value.title === action.payload.item.title)) {
        return {
          ...state,
          cart: state.cart.push(action.payload.item),
          totalQuantity: state.totalQuantity + 1,
        };
      }
      return {
        ...state,
        cart: state.cart.filter((item, index) => index !== action.payload),
        totalQuantity: state.totalQuantity + 1,
      };
    }
    case CART_REMOVE_ITEM: {
      return {
        ...state,
        cart: state.cart.filter((item, index) => index !== action.payload),
        totalQuantity: state.totalQuantity - 1,
      };
    }
    default:
      return state;
  }
};

export const setAddItemToCart = (item) => ({ type: CART_ADD_ITEM, payload: item });
export const setRemoveItemFromCart = (index) => ({ type: CART_REMOVE_ITEM, payload: index });
