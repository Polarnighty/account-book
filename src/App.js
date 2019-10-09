import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./containers/Home";
const items = [
  {
    id: 1,
    title: "1",
    price: 400,
    date: "2019-9-10",
    category: {
      id: "1",
      iconName: "旅行",
      type: "outcome"
    }
  }
];
function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
