import React from "react";
import { testCategories } from "../testData";
import PropTypes from "prop-types";
import CategorySelect from "../components/CategorySelect";
import { Tabs, Tab } from "../components/Tabs";
import PriceForm from "../components/PriceForm";
import { TYPE_INCOME, TYPE_OUTCOME } from "../utility";
import { Appcontext } from "../App";
const tabsText = [TYPE_OUTCOME, TYPE_INCOME];
class Create extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const filterCategories = testCategories.filter(
      category => category.type === TYPE_OUTCOME
    )
    return (
      <Appcontext.Consumer>
        {({ state }) => {
          return(
          <div
            className="create-page py-3 px-3 rounded mt-3"
            style={{ background: "#fff" }}
          >
            <Tabs activeIndex={0} onTabChange={this.tabChange}>
              <Tab>支出</Tab>
              <Tab>收入</Tab>
            </Tabs>
            <CategorySelect
              categories={filterCategories}
              onSelectCategory={() => {}}
            />
            <PriceForm onFormSubmit={() => {}} onCancelSubmit={() => {}} />
          </div>
          )
          }}
      </Appcontext.Consumer>
    )
  }
}
export default Create;

// { !validationPassed &&
//     <div className="alert alert-danger mt-5" role="alert">
//       请选择分类信息
//     </div>
//   }
