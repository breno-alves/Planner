import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppointmentList from '../pages/AppointmentList/AppointmentList';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={AppointmentList} />
  </Switch>
);

export default Routes;
