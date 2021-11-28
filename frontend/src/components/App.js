import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "./Pages/LoginForm";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginForm />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
