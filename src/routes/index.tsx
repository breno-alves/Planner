import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from "../services/auth";

import AppointmentList from '../pages/AppointmentList/AppointmentList';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import Schedule from '../pages/Schedule/Schedule';

interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

const PrivateRoute = ({ component: Component, ...rest }: IProps) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) :
        (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
    }
  />
);

const Routes: React.FC = () => (
  <Switch>
    <Route path='/' exact component={Login} />
    <Route path='/signup' component={Signup} />
    <PrivateRoute path="/appointments" component={AppointmentList} />
    <PrivateRoute path="/schedules" component={Schedule} />
  </Switch>
);

export default Routes;
