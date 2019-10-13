import React from "react";
import Ionicon from "react-ionicons";
import PropTypes from "prop-types";
import { Colors } from '../utility'

class CategorySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategoryId: props.selectedCategory && props.selectedCategory.id
    };
  }
  selectedCategory = (e, category) => {
    this.setState({
      selectedCategoryId: category.id
    });
    this.props.onSelectCategory(category);
    e.preventDefault();
  };
  render() {
    const { categories } = this.props;
    const { selectedCategoryId } = this.state;
    return (
      <div className="category-select-component">
        <div className="row">
          {categories.map((category, index) => {
      const iconColor = (category.id === selectedCategoryId) ? Colors.white : Colors.gray
      const backColor = (category.id === selectedCategoryId) ? Colors.blue : Colors.lightGray
     const activeClassName = selectedCategoryId === category.id ? "category-item col-3 active" : "category-item col-3"; 
     return (
              <div
                className={activeClassName}
                key={index}
                role="button" style={{ textAlign: 'center'}}
                onClick={e => {
                  this.selectedCategory(e, category);
                }}
              >
                <Ionicon
                  className="rounded-circle"
                  style={{ backgroundColor: backColor, padding: "5px" }}
                  fontSize="50px"
                  color={iconColor}
                  icon={category.iconName}
                />
                <p>{category.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

CategorySelect.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  onSelectCategory: PropTypes.func.isRequired
};

export default CategorySelect;
