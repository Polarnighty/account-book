import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Create from "./containers/Create";
import Home from "./containers/Home";
import { flatternArr,ID,parseToYearAndMonth } from "./utility";
import axios from "axios"


export const Appcontext = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      categories: {},
      currentDate:parseToYearAndMonth()
    }
    this.actions={
      getInitalData:()=>{
        const { currentDate} =this.state
        const getURLWithData=`/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`
        const PromiseArr=[axios.get('/categories'),axios.get(getURLWithData)]
        Promise.all(PromiseArr).then((arr)=>{
          const [categories,items]=arr
          this.setState({
            items:flatternArr(items.data),
            categories:flatternArr(categories.data),
          })
        })
      },
      selectNewMonth:(year,month)=>{
        const getURLWithData=`/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`
        axios.get(getURLWithData).then(items=>{
          this.setState({
            items:flatternArr(items.data),
            currentDate:{year,month}
          })
        })
      },
      deleteItem:(item)=>{
        axios.delete(`/items/${item.id}`).then(()=>{
          delete this.state.items[item.id]
          this.setState({
            items:this.state.items
          })
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
