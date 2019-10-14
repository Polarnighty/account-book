import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Create from "./containers/Create";
import CategorySelect from "./components/CategorySelect";
import Home from "./containers/Home";
import { testCategories, testItems } from "./testData";
import { flatternArr } from "./utility";

// console.log(flatternArr(testItems));

export const Appcontext = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: flatternArr(testItems),
      categories: flatternArr(testItems)
    }
    this.actions={
      deleteItem:(item)=>{
        delete this.state.items[item.id]
        this.setState({
          items:this.state.items
        })
      }
    }
  }
  render() {
    return (
      <Appcontext.Provider value={{
        state:this.state,
        actions:this.actions
      }}
      >
        <Router>
          <div className="App">
            <Route path="/" exact component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/edit/:id" component={Create} />
          </div>
        </Router>
      </Appcontext.Provider>
    );
  }
}

export default App;
