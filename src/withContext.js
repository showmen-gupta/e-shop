import React from "react";
import Context from "./Context";

const withContext = (WrappedComponent) => {
  const WithHoc = (props) => {
    return (
      <Context.Consumer>
        {(context) => <WrappedComponent {...props} context={context} />}
      </Context.Consumer>
    );
  };

  return WithHoc;
};

export default withContext;
