import "./styles/main.css";
import "./styles/main.scss";
import { Component, ErrorInfo, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Products from "@/components/header/products/products";
import someTypeScript from "./someTypeScript";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { Routes } from "./constants/Routes";

interface AppProps {
  nothing: boolean;
}
interface AppState {
  title: string;
  hasError: boolean;
}

class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      title: someTypeScript("Test-block for css-modules"),
      hasError: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    alert(error);
    console.error("error Info", errorInfo.componentStack);
    <Redirect push to={Routes.HOME} />;
  }

  render() {
    return (
      <StrictMode>
        <BrowserRouter>
          <Header />
          <Route path={Routes.HOME} render={() => "This is home page"} />
          <Route path={Routes.PRODUCTS} render={() => <Products />} />
          <Route path={Routes.ABOUT} render={() => "About"} />
          <Redirect from="/" to={Routes.HOME} />

          <Footer />
        </BrowserRouter>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
