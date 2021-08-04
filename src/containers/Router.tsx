import React from "react";
import { BrowserRouter as ReactRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import JokeDetail from "./JokeDetail";

export default function Router() {
  return (
    <ReactRouter>
      <Switch>
        <Route path="/" exact children={<Home />} />
        <Route path="/category/:id" exact children={<JokeDetail />} />
      </Switch>
    </ReactRouter>
  );
}
