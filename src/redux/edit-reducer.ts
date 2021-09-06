import { Game } from "@/constants/interfaces";

const CURRENT_GAME_CARD = "GAME/CURRENT-GAME-CARD";
const ADD_GAME = "GAME/ADD-GAME";
const GET_PRODUCTS_ARRAY = "GAME/GET-PRODUCTS-ARRAY";

const initialState = {
  currentGameCard: null,
  products: [],
};

type InitialStateType = typeof initialState;

export const editReducer = (state: InitialStateType = initialState, action) => {
  switch (action.type) {
    case "GAME/CURRENT-GAME-CARD": {
      return {
        ...state,
        currentGameCard: action.payload,
      };
    }
    case "GAME/ADD-GAME": {
      return {
        ...state,
        products: [...state.products, state.products.unshift(action.payload)],
      };
    }
    case "GAME/GET-PRODUCTS-ARRAY": {
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
