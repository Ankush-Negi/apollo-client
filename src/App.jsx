
import React from 'react';
import { ApolloProvider } from '@apollo/react-components';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import {
  TextFieldDemo, ChildrenDemo, TraineeComponent, Wrapper, InputDemo, NoMatch,
} from './pages';
import { AuthLayoutRoute, PrivateLayoutRoute } from './routes/index';
import { SnackBarProvider } from './contexts';
import client from './lib/apollo-client';


function App() {
  return (
    <SnackBarProvider>
      <ApolloProvider client={client}>
        <Router >
          {/* history={history} */}
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <AuthLayoutRoute exact path="/login" component={Wrapper} />
            <PrivateLayoutRoute exact path="/trainee" component={TraineeComponent} />
            <PrivateLayoutRoute exact path="/text-field-demo" component={TextFieldDemo} />
            <PrivateLayoutRoute exact path="/children-demo" component={ChildrenDemo} />
            <PrivateLayoutRoute exact path="/input-demo" component={InputDemo} />
            <PrivateLayoutRoute component={NoMatch} />
          </Switch>
        </Router>
      </ApolloProvider>
    </SnackBarProvider>

  );
}

export default App;
