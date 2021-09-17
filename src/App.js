import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Graphs from './components/Graphs';
import StatsList from './components/Stats';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Harry Bradshaw
        </a>
        <div className="navbar-nav mr-auto">
        <li className="nav-item">
            <Link to={"/graphs"} className="nav-link">
              Graphs
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/stats"} className="nav-link">
              Stats
            </Link>
            </li>
            
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/stats"]} component={StatsList} />
          <Route exact path={["/","/graphs"]} component={Graphs} />
        </Switch>
      </div>
    </div>
  );
}

export default App;