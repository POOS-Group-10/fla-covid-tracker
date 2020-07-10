import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// Pages
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import PasswordRecoveryPage from './pages/PasswordRecoveryPage';
import PasswordResetPage from './pages/PasswordResetPage';

import './App.css';
<<<<<<< HEAD


=======
>>>>>>> master

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/SignUp" exact>
          <SignUpPage />
        </Route>
        <Route path="/Home" exact>
          <HomePage />
        </Route>
        <Route path="/PasswordRecovery" exact>
          <PasswordRecoveryPage />
        </Route>
        <Route path="/PasswordReset">
          <PasswordResetPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
