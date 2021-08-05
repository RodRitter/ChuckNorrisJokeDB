import React from "react";
import { BrowserRouter as ReactRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import Home from "./Home";
import JokeDetail from "./JokeDetail";

const Router: React.FC = () => {
  return (
    <Provider store={store}>
      <ReactRouter>
        <Switch>
          <Route path="/" exact children={<Home />} />
          <Route path="/category/:id" exact children={<JokeDetail />} />
        </Switch>
      </ReactRouter>
    </Provider>
  );
};

export default Router;
