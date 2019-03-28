import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import App from "./App";
import AgreementPanel from "./components/pages/Agreement";

export default () => (
  <Router>
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Redirect to="/app/dashboard/index" push />}
      />
      <Route path="/app" component={App} />
      <Route path="/404" component={NotFound} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/agreement" component={AgreementPanel} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
