import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Create from "./containers/Create";
import CategorySelect from "./components/CategorySelect";
import Home from "./containers/Home";
import { testCategories, testItems } from "./testData";
import { flatternArr,ID,parseToYearAndMonth } from "./utility";

// console.log(flatternArr(testItems));

export const Appcontext = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: flatternArr(testItems),
      categories: flatternArr(testCategories)
    }
    this.actions={
      deleteItem:(item)=>{
        delete this.state.items[item.id]
        this.setState({
          items:this.state.items
        })
      },
      creatItem:(data,categoryId)=>{
        const newId=ID()
        const parsedDate=parseToYearAndMonth(data.date)
        data.monthCategory=`${parsedDate.year}-${parsedDate.month}`
        data.timestamp =new Date(data.date).getTime()
        const newItem = {...data,id:newId,cid:categoryId}
        this.setState({
          items:{...this.state.items,[newId]:newItem}
        })
      },
      updateItem:(item,updatedCategoryId)=>{
        const modifiedItem={
          ...item,
          cid:updatedCategoryId,
          timestamp:new Date(item.date).getTime()
        }
        this.setState({
          items:{...this.state.items,[modifiedItem.id]:modifiedItem}
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
