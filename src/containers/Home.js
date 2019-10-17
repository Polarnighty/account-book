import React from "react";
import PriceList from "../components/PriceList";
import { withRouter } from "react-router-dom";
import MonthPicker from "../components/MonthPicker";
import TotalPrice from "../components/TotalPrice";
import CreateBtn from "../components/CreateBtn";
import { Tabs, Tab } from "../components/Tabs";
import Ionicon from "react-ionicons";
import Loader from "../components/Loader";
import withContext from "../WithContext";
import {
  LIST_VIEW,
  CHART_VIEW,
  TYPE_INCOME,
  TYPE_OUTCOME,
  parseToYearAndMonth,
  padLeft
} from "../utility";

const tabsText = [LIST_VIEW, CHART_VIEW];
class Home extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    const { items } = data;
    this.state = {
      tabView: tabsText[0]
    };
  }

  componentDidMount() {
    this.props.actions.getInitalData();
  }
  changView = index => {
    this.setState({
      tabView: tabsText[index]
    });
  };
  changeDate = (year, month) => {
    this.props.actions.selectNewMonth(year, month);
  };
  modifyItem = item => {
    this.props.history.push(`./edit/${item.id}`);
  };
  createItem = () => {
    this.props.history.push("./create");
  };
  deleteItem = item => {
    this.props.actions.deleteItem(item);
  };
  render() {
    const { data } = this.props;
    let totalIncome = 0,
      totalOutcome = 0;
    const { items, categories, currentDate, isLoading } = data;
    const { tabView } = this.state;
    const itemsWithCategory = Object.keys(items).map(id => {
      items[id].category = categories[items[id].cid];
      return items[id];
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
        {isLoading && <Loader />}
        <div className="content-area py-3 px-3">
          {!isLoading && (
            <React.Fragment>
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
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(withContext(Home));
