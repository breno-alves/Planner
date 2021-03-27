import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppointmentList from '../pages/AppointmentList/AppointmentList';
import Schedule from '../pages/Schedule/Schedule';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={AppointmentList} />
    <Route path="/schedule" exact component={Schedule} />
  </Switch>
);

export default Routes;
