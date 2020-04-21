import React from "react";
import logo from "./logo.svg";
import { Router, Switch, Route } from "react-router-dom";
import mapboxgl from "mapbox-gl";

import { createBrowserHistory } from "history";

import "./App.css";
import Dashboard from "./features/Dashboard/container";

export const history = createBrowserHistory();

mapboxgl.accessToken =
    "pk.eyJ1IjoiY2hhYmVsb2RlbG9jaG8iLCJhIjoiY2s5OHcyb21sMG93cTNkcXhzYjY1ZndyMyJ9.AK8_URSEiRUaKBSnsljt3g";
  
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
