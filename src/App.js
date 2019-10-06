import React from "react";
import "./App.css";
import PriceList from "./components/PriceList";
import ViewTab from "./components/ViewTab";
import { LIST_VIEW, CHART_VIEW } from "./utility";

import "bootstrap/dist/css/bootstrap.min.css";

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
      <PriceList
        items={items}
        onDeleteItem={item => {
          alert(item.id);
        }}
        onModifyItem={item => {
          alert(item.id);
        }}
      ></PriceList>
      <ViewTab activeTab={CHART_VIEW} onTabChange={view=>{console.log(view);
      }} ></ViewTab>
    </div>
  );
}

export default App;
