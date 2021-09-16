const GET_TARGET_PAGE = "USER/GET-TARGET-PAGE";
const LOG_IN = "USER/LOG-IN";
const LOG_OUT = "USER/LOG-OUT";
const EDIT_USER_PROFILE = "EDIT-USER-PROFILE";

const initialState = {
  userId: null,
  isLoggedIn: false,
  isAdmin: false,
  userName: "",
  userPassword: "",
  chosenLocation: "",
};

type InitialStateType = typeof initialState;

export const userReducer = (state: InitialStateType = initialState, action: any) => {
  switch (action.type) {
    case GET_TARGET_PAGE: {
      return {
        ...state,
        chosenLocation: action.path,
      };
    }
    case LOG_IN: {
      return {
        ...state,
        isLoggedIn: true,
        isAdmin: false,
        userName: action.userName,
        userPassword: action.userPassword,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    case EDIT_USER_PROFILE: {
      return {
        ...state,
        userName: action.userName,
      };
    }
    default:
      return state;
  }
};

export const setUserProfile = (userName: string) => ({ type: EDIT_USER_PROFILE, userName });
export const getTargetPage = (path: string) => ({ type: GET_TARGET_PAGE, path });
export const logIn = (userName?: string, userPassword?: number | string) => ({ type: LOG_IN, userName, userPassword });
export const logOut = () => ({ type: LOG_OUT });

