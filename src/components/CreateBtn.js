import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'
import React from "react";

const CreateBtn = ({ onClick }) => (
  <button
    className="btn btn-primary btn-block d-flex justify-content-center align-items-center"
    onClick={(e) => {onClick()}}
  >
    <Ionicon
      className="rounded-circle"
      fontSize="30px"
      color='#fff'
      icon='ios-add-circle'
    />
    创建一条新的记账记录
  </button>
)
 
CreateBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
}
export default CreateBtn
