import { Component, ErrorInfo, StrictMode, Suspense, lazy } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/redux/redux-store";

import "./styles/main.css";
import "./styles/main.scss";
import HomePage from "@/components/homePage";
import ProfilePage from "@/components/profilePage";
import About from "@/components/about";
import Footer from "@/components/footer";
import ChosenCategory from "@/components/homePage/chooseCategory";
import Products from "@/components/products";
import CartPage from "@/components/products/cartPage/cartPage";
import { Routes } from "./constants/Routes";
import someTypeScript from "./someTypeScript";
import Header from "./components/header";

const Modal = lazy(() => import("./components/modal"));
const SignIn = lazy(() => import("./components/loginization/signIn"));
const SignUp = lazy(() => import("./components/loginization/signUp"));

interface AppProps {
  nothing: boolean;
}

interface AppState {
  title: string;
  hasError: boolean;
  authorizedUser: boolean;
  cartItems: any;
}

class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);

    this.state = {
      title: someTypeScript("Test-block for css-modules"),
      hasError: false,
      authorizedUser: false,
      cartItems: [],
    };
    this.redirectOnChoosenPage = this.redirectOnChoosenPage.bind(this);

    store.subscribe(() => {
      this.setState({
        authorizedUser: store.getState().isLoggedIn,
      });
    });
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    alert(error);
    console.error("error Info", errorInfo.componentStack);
  }

  onAdd(games) {
    const exist = this.state.cartItems.find((x) => x.id === games.id);
    if (exist) {
      this.setState(this.state.cartItems.map((x) => (x.id === games.id ? { ...exist, qty: exist.qty + 1 } : x)));
    } else {
      this.setState([...this.state.cartItems, { ...games, qty: 1 }]);
    }
    console.log("add to card");
  }

  onRemove(games) {
    const exist = this.state.cartItems.find((x) => x.id === games.id);
    if (exist.qty === 1) {
      this.setState(this.state.cartItems.filter((x) => x.id !== games.id));
    } else {
      this.setState(this.state.cartItems.map((x) => (x.id === games.id ? { ...exist, qty: exist.qty - 1 } : x)));
    }
    console.log("remove from cart");
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
              <Header countCartItems={this.state.cartItems.length} />
              <CartPage cartItems={this.state.cartItems} onAdd={this.onAdd} onRemove={this.onRemove} />
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
                {/*  <Route exact path={Routes.CART}>
                  {this.redirectOnChoosenPage(<CartPage cartItems={this.state.cartItems} />)}
                </Route> */}
                <Route exact path={Routes.SIGN_UP}>
                  {store.getState().isLoggedIn ? (
                    <Redirect to={Routes.PROFILE_PAGE} />
                  ) : (
                    <Modal>
                      <SignUp />
                    </Modal>
                  )}
                </Route>
                <Route exact path={Routes.SIGN_IN}>
                  {store.getState().isLoggedIn ? (
                    <Redirect to={store.getState().chosenLocation} />
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
