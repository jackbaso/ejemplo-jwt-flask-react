import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext, { Context } from "./store/appContext";
import { Signup } from "./pages/signup.jsx";
import { Login } from "./pages/login.jsx";
import { Logout } from "./pages/logout.jsx";
import { Profile } from "./pages/profile.jsx";
import { Navbar } from "./component/navbar";

import { NavbarProtected } from "./component/navbarProtected";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";
  const { store, actions } = useContext(Context);

  function navbar() {
    if (store.token) {
      return <NavbarProtected />;
    } else {
      return <Navbar />;
    }
  }

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          {navbar()}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/demo">
              <Demo />
            </Route>
            <Route exact path="/single/:theid">
              <Single />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/logout">
              <Logout />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route>
              <h1>Not found!</h1>
            </Route>
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
