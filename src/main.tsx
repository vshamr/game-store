import "./styles/main.css";
import "./styles/main.scss";
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import someTypeScript from "./someTypeScript";
import Header from "./components/header";
import Footer from "./components/footer/footer";
import { Routes } from "./constants/Routes";

interface AppProps {
  nothing: boolean;
}
interface AppState {
  title: string;
}

class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      title: someTypeScript("Test-block for css-modules"),
    };
    // test class-dead-code
    const goExlcude = true;
    if (!goExlcude) {
      console.warn("class-dead-code doesn't work");
    }
  }

  render() {
    return (
      <StrictMode>
        <BrowserRouter>
          <Header />

          <Route path={Routes.HOME} render={() => "This is home page"} />
          <Route path={Routes.PRODUCTS} render={() => "All products are presented on this page"} />
          <Route path={Routes.ABOUT} render={() => "About"} />
          <Redirect from="/" to={Routes.HOME} />

          <Footer />
        </BrowserRouter>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
