import React from 'react';
import { Router, Route, Redirect } from "react-router-dom";
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { getUser } from './api';
import routes from './routes'
import './App.css';
import history from './history';

const App = () => {
  return (
    <Router history={history}>
      <div className="app">
        <PrivateRoute exact path={routes.main} component={MainPage} />
        <Route path={routes.login} component={LoginPage} />
        <Route path={routes.register} component={RegisterPage} />
      </div>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        getUser() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: routes.login ,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default App;
