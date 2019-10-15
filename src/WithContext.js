import React from "react";
import { Appcontext } from "./App";

const withContext = Component => {
  return props => (
    <Appcontext.Consumer>
      {({ state, actions }) => {
        return <Component {...props} data={state} actions={actions} />
      }}
    </Appcontext.Consumer>
  );
};

export default withContext;
