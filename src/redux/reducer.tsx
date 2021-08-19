const SET_USER_NAME = "SET-USER-NAME";
const GET_TARGET_PAGE = "GET-TARGET-PAGE";
const LOG_IN = "LOG-IN";
const LOG_OUT = "LOG-OUT";
const SET_USER_PASSWORD = "SET-USER-PASSWORD";
const SAVE_USER_PROFILE = "SAVE-USER-PROFILE";

const initialState = {
  userId: null,
  isLoggedIn: false,
  userName: "",
  userPassword: "",
  chosenLocation: "",
  filteredGames: "",
};

type InitialStateType = typeof initialState;

export const reducer = (state: InitialStateType = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_NAME: {
      return {
        ...state,
        userName: action.userName,
      };
    }
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
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    case SET_USER_PASSWORD: {
      return {
        ...state,
        userPassword: action.userPassword,
      };
    }
    case SAVE_USER_PROFILE: {
      return {
        ...state,
        userName: action.userName,
      };
    }
    default:
      return state;
  }
};

export const setUserNameAC = (userName: string) => ({ type: SET_USER_NAME, userName });
export const setUserPasswordAC = (userPassword: number) => ({ type: SET_USER_PASSWORD, userPassword });
export const setUserProfileAC = (userName: string) => ({ type: SAVE_USER_PROFILE, userName });
export const getTargetPageAC = (path: string) => ({ type: GET_TARGET_PAGE, path });
export const logInAC = () => ({ type: LOG_IN });
export const logOutAC = () => ({ type: LOG_OUT });
