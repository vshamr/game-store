import { Game } from "@/constants/interfaces";

const CART_ADD_ITEM = "CART/ADD-ITEM";
const CART_REMOVE_ITEM = "CART/REMOVE-ITEM";

const initialState = {
  carts: [] as Game[],
  totalQuantity: 0,
};

type InitialStateType = typeof initialState;

export const cartReducer = (state: InitialStateType = initialState, action: ActionTypes) => {
  switch (action.type) {
    case "CART/ADD-ITEM": {
      return {
        ...state,
        carts: [...state.carts, ...[action.payload]],
        totalQuantity: state.totalQuantity + 1,
      };
    }
    case "CART/REMOVE-ITEM": {
      return {
        ...state,
        carts: state.carts.filter((_item, index) => index !== action.payload),
        totalQuantity: state.totalQuantity - 1,
      };
    }
    default:
      return state;
  }
};

export const setAddItemToCart = (item: Game) => ({ type: CART_ADD_ITEM, payload: item });
export const setRemoveItemFromCart = (index: number) => ({ type: CART_REMOVE_ITEM, payload: index });

export type AddItemActionType = ReturnType<typeof setAddItemToCart>;
export type RemoveItemFromCart = ReturnType<typeof setRemoveItemFromCart>;
type ActionTypes = AddItemActionType | RemoveItemFromCart;
