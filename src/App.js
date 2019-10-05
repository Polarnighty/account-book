import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PriceList from "./components/PriceList";

const items = [
  {
    id: 1,
    title: ""
  }
];
function App() {
  return (
    <div className="App">
      <PriceList></PriceList>
    </div>
  );
}

export default App;
