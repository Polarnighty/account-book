import React from "react";
import "./App.css";
import PriceList from "./components/PriceList";
import ViewTab from "./components/ViewTab";
import MonthPicker from "./components/MonthPicker";


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