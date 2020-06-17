import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent || "Component";
};

// this is a higher order function that takes in a component, then returns that component after adding the user data to it.
const withUser = (Component) => {
  const WrappedComponent = (props) => {
    return (
      <UserContext.Consumer>
        {(user) => <Component user={user} {...props} />}
      </UserContext.Consumer>
    );
  };

  WrappedComponent.displayName = `WithUser(${getDisplayName(
    WrappedComponent
  )})`;

  return WrappedComponent;
};

export default withUser;
