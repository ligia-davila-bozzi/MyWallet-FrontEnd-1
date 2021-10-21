import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SignUp from "../pages/home/sign-up/sign-up";

function App() {
  return (
    <Router >
      <Switch>
        <Route exact path="/">
          <SignUp />
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
