import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import {
  Create,
  Principal,
  Edit
} from './views';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          render={() => <Redirect to="/home" />}
        />

        <Route
          path="/home"
          exact
          component={Principal}
        />

        <Route
          path="/create"
          exact
          component={Create}
        />

        <Route
          path="/edit/:id"
          exact
          component={Edit}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
