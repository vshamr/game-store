import { Game } from "@/constants/interfaces";

const MODAL_EDIT = "MODAL-EDIT";

const initialState = {
  value: false,
};

type InitialStateType = typeof initialState;

export const editReducer = (state: InitialStateType = initialState, action: ActionTypes) => {
  switch (action.type) {
    case "MODAL-EDIT": {
      return {
        ...state,
        value: !state.value,
      };
    }
    default:
      return state;
  }
};

export const activeModalEdit = (value: Game) => ({ type: MODAL_EDIT, value });

export type ModalEditActionType = ReturnType<typeof activeModalEdit>;
type ActionTypes = ModalEditActionType;
