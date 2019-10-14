import React from "react";
import PriceList from "../components/PriceList";
import { withRouter } from "react-router-dom";
import MonthPicker from "../components/MonthPicker";
import TotalPrice from "../components/TotalPrice";
import CreateBtn from "../components/CreateBtn";
import { Tabs, Tab } from "../components/Tabs";
import Ionicon from "react-ionicons";
import { Appcontext } from "../App";
import withContext from "../WithContext";
import {
  LIST_VIEW,
  CHART_VIEW,
  TYPE_INCOME,
  TYPE_OUTCOME,
  parseToYearAndMonth,
  padLeft
} from "../utility";

export const categories = {
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
export const items = [
  {
    id: 1,
    title: "去上海工作",
    price: 400,
    date: "2019-09-10",
    cid: 1
  },
  {
    id: 2,
    title: "去北京工作",
    price: 400,
    date: "2019-10-15",
    cid: 2
  },
  {
    id: 3,
    title: "去广州工作",
    price: 400,
    date: "2019-10-16",
    cid: 2
  },
  {
    id: 4,
    title: "去深圳工作",
    price: 400,
    date: "2019-08-10",
    cid: 1
  }
];
const newItem = {
  id: 4,
  title: "新添加的项目",
  price: 233,
  date: "2019-10-10",
  cid: 1
};
const tabsText = [LIST_VIEW, CHART_VIEW];
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items,
      currentDate: parseToYearAndMonth(),
      tabView: tabsText[0]
    };
  }

  changView = index => {
    this.setState({
      tabView: tabsText[index]
    });
  };
  changeDate = (year, month) => {
    this.setState({
      currentDate: { year, month }
    });
  };
  modifyItem = (item) => {
    this.props.history.push(`./edit/${item.id}`)
  };
  createItem = () => {
    this.props.history.push('./create')
  };
  deleteItem = (item) => {
    console.log(this.props)
  };
  render() {
    const {data}=this.props
    let totalIncome = 0,
      totalOutcome = 0;
    const { items, currentDate, tabView } = this.state;
    const itemsWithCategory = items
      .map(item => {
        item.category = categories[item.cid];
        return item;
      })
      .filter(item => {
        return item.date.includes(
          `${currentDate.year}-${padLeft(currentDate.month)}`
        );
      });
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
                onChange={this.changeDate}
              />
            </div>
            <div className="col">
              <TotalPrice income={totalIncome} outcome={totalOutcome} />
            </div>
          </div>
        </header>
        <div className="content-area py-3 px-3">
          <Tabs activeIndex={0} onTabChange={this.changView}>
            <Tab>
              <Ionicon
                className="rounded-circle mr-2"
                fontSize="25px"
                color={"#007bff"}
                icon="ios-paper"
              />
              列表模式
            </Tab>
            <Tab>
              <Ionicon
                className="rounded-circle mr-2"
                fontSize="25px"
                color={"#007bff"}
                icon="ios-pie"
              />
              图表模式
            </Tab>
          </Tabs>
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
    )
  }
}
export default withRouter(withContext(Home))
