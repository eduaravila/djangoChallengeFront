import React from "react";
import logo from "./logo.svg";
import { Router, Switch, Route } from "react-router-dom";
import mapboxgl from "mapbox-gl";

import { createBrowserHistory } from "history";

import "./App.css";
import Dashboard from "./features/Dashboard/container";

console.log(process.env);

export const history = createBrowserHistory();

mapboxgl.accessToken = process.env.REACT_APP_API_MAP;

function App() {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
