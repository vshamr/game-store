import { Component, ErrorInfo, StrictMode, Suspense, lazy } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/redux/redux-store";

import "./styles/main.css";
import "./styles/main.scss";
import HomePage from "@/components/homePage";
import { Routes } from "./constants/Routes";
import someTypeScript from "./someTypeScript";

const Header = lazy(() => import("./components/header"));
const About = lazy(() => import("./components/about"));
const ProfilePage = lazy(() => import("@/components/profilePage"));
const ChosenCategory = lazy(() => import("@/components/homePage/chooseCategory"));
const Products = lazy(() => import("@/components/products"));
const CartPage = lazy(() => import("@/components/cartPage/cartPage"));
const Modal = lazy(() => import("./components/modal"));
const SignIn = lazy(() => import("./components/loginization/signIn"));
const SignUp = lazy(() => import("./components/loginization/signUp"));
const EditPage = lazy(() => import("@/components/editPage"));
const Footer = lazy(() => import("@/components/footer"));

interface AppProps {
  nothing: boolean;
}

interface AppState {
  title: string;
  hasError: boolean;
  authorizedUser: boolean;
}

class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);

    this.state = {
      title: someTypeScript("Test-block for css-modules"),
      hasError: false,
      authorizedUser: false,
    };
    this.redirectOnChoosenPage = this.redirectOnChoosenPage.bind(this);

    store.subscribe(() => {
      this.setState({
        authorizedUser: store.getState().userPage.isLoggedIn,
      });
    });
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    alert(error);
    console.error("error Info", errorInfo.componentStack);
  }

  redirectOnChoosenPage(component: JSX.Element) {
    if (store.getState().userPage.isLoggedIn) {
      return component;
    }
    return <Redirect to={Routes.SIGN_IN} />;
  }

  render() {
    return (
      <StrictMode>
        <BrowserRouter>
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Provider store={store}>
              <Header />
              <Switch>
                <Route exact path={Routes.HOME} render={() => <HomePage />} />
                <Route exact path={Routes.PRODUCTS}>
                  {this.redirectOnChoosenPage(<Products />)}
                </Route>
                <Route exact path={`${Routes.PRODUCTS}/:category`}>
                  {this.redirectOnChoosenPage(<ChosenCategory />)}
                </Route>
                <Route exact path={Routes.ABOUT}>
                  {this.redirectOnChoosenPage(<About />)}
                </Route>
                <Route exact path={Routes.CART}>
                  {this.redirectOnChoosenPage(<CartPage />)}
                </Route>
                <Route exact path={Routes.ADMIN}>
                  {this.redirectOnChoosenPage(<EditPage />)}
                </Route>
                <Route exact path={Routes.ADMIN}>
                  {store.getState().userPage.isLoggedIn ? (
                    <Redirect to={Routes.PROFILE_PAGE} />
                  ) : (
                    <Modal>
                      <SignUp />
                    </Modal>
                  )}
                </Route>
                <Route exact path={Routes.SIGN_UP}>
                  {store.getState().userPage.isLoggedIn ? (
                    <Redirect to={Routes.PROFILE_PAGE} />
                  ) : (
                    <Modal>
                      <SignUp />
                    </Modal>
                  )}
                </Route>
                <Route exact path={Routes.SIGN_IN}>
                  {store.getState().userPage.isLoggedIn ? (
                    <Redirect to={store.getState().userPage.chosenLocation} />
                  ) : (
                    <Modal>
                      <SignIn />
                    </Modal>
                  )}
                </Route>
                <Route exact path={Routes.PROFILE_PAGE}>
                  {this.redirectOnChoosenPage(<ProfilePage />)}
                </Route>
                <Redirect from="/" to={Routes.HOME} />
              </Switch>
              <Footer />
            </Provider>
          </Suspense>
        </BrowserRouter>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
