import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

//Redux
import store from "./redux/store";

//Pages
import Home from "./components/pages/Home/Home";
import Edit from "./components/pages/Edit/Edit";
import Profile from "./components/pages/Profile/Profile";
import About from "./components/pages/About/About";
import Login from "./components/pages/Login/Login";
import Signup from "./components/pages/Singup/Signup";
import NotFound from "./components/pages/404/404";

//Components
import Header from "./components/layouts/Header/Header";
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated
} from "./functions/authentication";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Fragment>
              <Header />
              <Switch>
                <Route exact path="/" component={UserIsAuthenticated(Home)} />
                <Route
                  exact
                  path="/edit"
                  component={UserIsAuthenticated(Edit)}
                />
                <Route
                  exact
                  path="/profile"
                  component={UserIsAuthenticated(Profile)}
                />
                <Route exact path="/about" component={About} />
                <Route
                  exact
                  path="/signup"
                  component={UserIsNotAuthenticated(Signup)}
                />
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route component={NotFound} />
              </Switch>
            </Fragment>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
