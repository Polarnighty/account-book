import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Create from "./containers/Create";
import CategorySelect from "./components/CategorySelect";
import Home from "./containers/Home";
function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Home} />
        <Route path="/create" component={Create} />
        <Route path="/edit/:id" component={Create} />

      </div>
    </Router>
  );
}

export default App;
