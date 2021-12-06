import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PublicRouteComponent({ component: Component, restricted, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
          <Component {...props} />
      }
    />
  );
}

export default PublicRouteComponent;