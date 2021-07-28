import "./styles/main.css";
import "./styles/main.scss";
import { Component, ErrorInfo, StrictMode } from "react";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import ReactDom from "react-dom";
import Products from "@/components/products/products";
import HomePage from "@/components/homePage/homePage";
import Footer from "@/components/footer/footer";
import ProfilePage from "@/components/profilePage/profilePage";
import Index from "@/components/about";
import { Routes } from "./constants/Routes";
import Header from "./components/header/header";
import someTypeScript from "./someTypeScript";
import HeaderContext from "@/constants/headerContext";

const Modal = lazy(() => import("./components/modal/modal"));
const SignIn = lazy(() => import("./components/loginization/signIn"));
const SignUp = lazy(() => import("./components/loginization/signUp"));

interface AppProps {
  nothing: boolean;
}

interface AppState {
  title: string;
  hasError: boolean;
  authorizedUser: boolean;
  userName: string;
  chosenLocation: string;
}

class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      title: someTypeScript("Test-block for css-modules"),
      hasError: false,
      authorizedUser: false,
      userName: "",
      chosenLocation: ""
    };
    this.updateIsAuthorized = this.updateIsAuthorized.bind(this);
    this.setUserName = this.setUserName.bind(this);
    this.getTargetPage = this.getTargetPage.bind(this);
    this.directUser = this.directUser.bind(this);
  }

  updateIsAuthorized(value: boolean) {
    this.setState({
      authorizedUser: value
    });
  }

  setUserName(name: string) {
    this.setState({
      userName: name
    });
  }

  getTargetPage(path: string) {
    this.setState({
      chosenLocation: path
    });
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    alert(error);
    console.error("error Info", errorInfo.componentStack);
  }

  directUser(component: JSX.Element) {
    if (this.state.authorizedUser) {
      return component;
    }

    return <Redirect to={Routes.SIGN_IN} />;
  }

  render() {
    return (
      <StrictMode>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <HeaderContext.Provider value={{
              authorizedUser: this.state.authorizedUser,
              userName: this.state.userName,
              updateIsAuthorized: this.updateIsAuthorized,
              getTargetPage: this.getTargetPage
            }}>
              <Header />
            </HeaderContext.Provider>
            <Switch>
              <Route exact path={Routes.HOME} render={() => <HomePage />} />
              <Route exact path={Routes.PRODUCTS}>
                {this.directUser(<Products />)}
              </Route>
              <Route exact path={Routes.ABOUT}>
                {this.directUser(<Index />)}
              </Route>
              <Route exact path={Routes.SIGN_UP}>
                {this.state.authorizedUser ? (
                  <Redirect to={Routes.USER_PAGE} />
                ) : (
                  <Modal> <SignUp updateIsAuthorized={this.updateIsAuthorized} setUserName={this.setUserName} />
                  </Modal>
                )}
              </Route>
              <Route exact path={Routes.SIGN_IN}>
                {this.state.authorizedUser ? (
                  <Redirect to={this.state.chosenLocation} />
                ) : (
                  <Modal><SignIn updateIsAuthorized={this.updateIsAuthorized} setUserName={this.setUserName} /> </Modal>
                )}
              </Route>
              <Route exact path={Routes.USER_PAGE}>
                {this.directUser(<ProfilePage />)}
              </Route>

              <Redirect from="/" to={Routes.HOME} />
            </Switch>
            <Footer />
          </Suspense>
        </BrowserRouter>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
