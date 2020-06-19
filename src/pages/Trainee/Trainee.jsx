import React from 'react';
import {
  Switch, useRouteMatch, Route,
} from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetails from './TraineeDetails';

const TraineeRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={TraineeList} />
      <Route exact path={`${path}/:id`} component={TraineeDetails} />
    </Switch>
  );
};

export default TraineeRoutes;
