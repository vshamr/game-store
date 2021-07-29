const SET_USER_NAME = "SET-USER-NAME";
const GET_TARGET_PAGE = "GET-TARGET-PAGE";
const LOG_IN = "LOG-IN";
const LOG_OUT = "LOG-OUT";


const initialState = {
  isLoggedIn: false,
  userName: "",
  chosenLocation: ""
};

type InitialStateType = typeof initialState

export const reducer = (state: InitialStateType = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_NAME: {
      return {
        ...state,
        userName: action.userName
      };
    }
    case GET_TARGET_PAGE: {
      return {
        ...state,
        chosenLocation: action.path
      };
    }
    case LOG_IN: {
      return {
        ...state,
        isLoggedIn: true
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false
      };
    }
  }
};


export const setUserNameAC = (userName: string) => ({ type: SET_USER_NAME, userName: userName })
export const getTargetPageAC = (path: string) => ({type: GET_TARGET_PAGE, path})
export const logInAC = () => ({type: LOG_IN})
export const logOutAC = () => ({type: LOG_OUT})
