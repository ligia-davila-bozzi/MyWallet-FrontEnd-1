import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LogIn from "../pages/home/log-in/log-in";
import SignUp from "../pages/home/sign-up/sign-up";

function App() {
  return (
    <Router >
      <Switch>
        <Route exact path="/cadastro">
          <SignUp />
        </Route>
        <Route exact path="/">
          <LogIn />
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
