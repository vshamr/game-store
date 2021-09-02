import { Game } from "@/constants/interfaces";

const CURRENT_GAME_CARD = "CURRENT-GAME-CARD";
const ADD_GAME = "ADD-GAME";
const GET_PRODUCTS_ARRAY = "GET-PRODUCTS-ARRAY";

const initialState = {
  currentGameCard: null,
  products: [],
};

type InitialStateType = typeof initialState;

export const editReducer = (state: InitialStateType = initialState, action) => {
  switch (action.type) {
    case "CURRENT-GAME-CARD": {
      return {
        ...state,
        currentGameCard: action.payload,
      };
    }
    case "ADD-GAME": {
      return {
        ...state,
        products: [...state.products, state.products.unshift(action.payload)],
      };
    }
    case "GET-PRODUCTS-ARRAY": {
      return {
        ...state,
        products: action.payload,
      };
    }
    default:
      return state;
  }
};

export const getCurrentGameCard = (item: Game) => ({ type: CURRENT_GAME_CARD, payload: item });
export const addGameAC = (item: Game) => ({ type: ADD_GAME, payload: { ...item } });
export const getProductsArray = (item: Game) => ({ type: GET_PRODUCTS_ARRAY, payload: [...item] });
