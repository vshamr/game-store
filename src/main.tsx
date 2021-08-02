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
import { Provider } from "react-redux";
import store from "@/redux/redux-store";

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
}

class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      title: someTypeScript("Test-block for css-modules"),
      hasError: false,
      authorizedUser: false
    };
    this.redirectOnChoosenPage = this.redirectOnChoosenPage.bind(this);

    store.subscribe(() => {
      this.setState({
        authorizedUser: store.getState().isLoggedIn
      });
    });
  }


  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    alert(error);
    console.error("error Info", errorInfo.componentStack);
  }



  redirectOnChoosenPage(component: JSX.Element) {
    if (store.getState().isLoggedIn) {
      return component;
    }
    return <Redirect to={Routes.SIGN_IN} />;
  }

  render() {
    return (
      <StrictMode>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Provider store={store}>
              <Header />
              <Switch>
                <Route exact path={Routes.HOME} render={() => <HomePage />} />
                <Route exact path={Routes.PRODUCTS}>
                  {this.redirectOnChoosenPage(<Products />)}
                </Route>
                <Route exact path={Routes.ABOUT}>
                  {this.redirectOnChoosenPage(<Index />)}
                </Route>

                <Route exact path={Routes.SIGN_UP}>
                  {store.getState().isLoggedIn ? (
                    <Redirect to={Routes.USER_PAGE} />
                  ) : (
                    <Modal> <SignUp /></Modal>
                  )}
                </Route>

                <Route exact path={Routes.SIGN_IN}>
                  {store.getState().isLoggedIn ? (
                    <Redirect to={store.getState().chosenLocation} />
                  ) : (
                    <Modal> <SignIn /> </Modal>
                  )}
                </Route>

                <Route exact path={Routes.USER_PAGE}>
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
