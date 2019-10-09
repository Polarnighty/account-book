import React from "react";
import PriceList from "../components/PriceList";
import ViewTab from "../components/ViewTab";
import MonthPicker from "../components/MonthPicker";
import TotalPrice from "../components/TotalPrice";
import CreateBtn from "../components/CreateBtn";
// import { ReactComponent } from "*.svg";
import {
  LIST_VIEW,
  CHART_VIEW,
  TYPE_INCOME,
  TYPE_OUTCOME,
  parseToYearAndMonth,
  padLeft
} from "../utility";

const categories = {
  "1": {
    id: "1",
    iconName: "ios-plane",
    type: "income",
    name: "旅行"
  },
  "2": {
    id: "2",
    iconName: "logo-yen",
    type: "income",
    name: "理财"
  }
};
const items = [
  {
    id: 1,
    title: "去上海工作",
    price: 400,
    date: "2019-9-10",
    cid: 1
  },
  {
    id: 2,
    title: "去北京工作",
    price: 400,
    date: "2019-10-10",
    cid: 2
  }
];
const newItem = {
  id: 4,
  title: "新添加的项目",
  price: 233,
  date: "2019-9-10",
  cid: 1
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items,
      currentDate: parseToYearAndMonth(),
      tabView: LIST_VIEW
    };
  }
  changView = view => {
    this.setState({
      tabView: view
    });
  };
  changDate = (year,month) => {

  };
  modifyItem = (modifiedItem) => {
    const modifiedItems=this.state.items.map(item=>{
      if (item.id===modifiedItem.id) {
        return {...item,title:'更新后的标题'}
      }else{
        return item
      }
    })
    this.setState({
      items: modifiedItems
    });

  };
  createItem = () => {
    this.setState({
      items: [newItem, ...this.state.items]
    });
  };
  deleteItem = deletedItem => {
    const filteredItems = this.state.items.filter(
      item => item.id !== deletedItem.id
    );
    this.setState({
      items: filteredItems
    });
  };
  render() {
    let totalIncome = 0,
      totalOutcome = 0;
    const { items, currentDate, tabView } = this.state;
    const itemsWithCategory = items.map(item => {
      item.category = categories[item.cid];
      console.log(categories[item.cid]);
      return item;
    }).filter(item=>{
      return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
    })
    itemsWithCategory.forEach(item => {
      if (item.category.type === TYPE_OUTCOME) {
        totalIncome += item.price;
      } else {
        totalOutcome += item.price;
      }
    });
    return (
      <React.Fragment>
        <header className="App-header">
          <div className="row">
            <div className="col">
              <MonthPicker
                year={currentDate.year}
                month={currentDate.month}
                onChange={(year, month) => {
                  console.log(year, month);
                }}
              />
            </div>
            <div className="col">
              <TotalPrice income={totalIncome} outcome={totalOutcome} />
            </div>
          </div>
        </header>
        <div className="content-area py-3 px+3">
          <ViewTab activeTab={tabView} onTabChange={this.changView} />
          <CreateBtn onClick={this.createItem}></CreateBtn>
          {tabView === LIST_VIEW && (
            <PriceList
              items={itemsWithCategory}
              onDeleteItem={this.deleteItem}
              onModifyItem={this.modifyItem}
            ></PriceList>
          )}
          {tabView === CHART_VIEW && <h1>待实现的图标区域</h1>}
        </div>
      </React.Fragment>
    );
  }
}
export default Home;
