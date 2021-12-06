import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRouteComponent({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default PrivateRouteComponent;