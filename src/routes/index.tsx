import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppointmentList from '../pages/AppointmentList/AppointmentList';
import Login from '../pages/Login/Login';
import Schedule from '../pages/Schedule/Schedule';

const Routes: React.FC = () => (
  <Switch>
    <Route path='/' exact component={Login} />
    <Route path="/appointments" component={AppointmentList} />
    <Route path="/schedule" exact component={Schedule} />
  </Switch>
);

export default Routes;
