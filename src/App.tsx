import React from "react";
import Index from "./containers/Index";
import New from "./containers/New";
import Edit from "./containers/Edit";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/new" component={New} />
      <Route exact path="/edit/:id" component={Edit} />
    </Switch>
  </BrowserRouter>
);

export default App;
