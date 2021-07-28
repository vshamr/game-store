import React from "react";

type HeaderPropsType = {
  authorizedUser: boolean;
  userName: string;
  updateIsAuthorized: (value: boolean) => void;
  getTargetPage: (path: string) => void;
};

const HeaderContextValues = {
  authorizedUser: false,
  userName: "",
  updateIsAuthorized: () => {
  },
  getTargetPage: () => {
  }
};

const HeaderContext = React.createContext<HeaderPropsType>(HeaderContextValues);

export default HeaderContext;
