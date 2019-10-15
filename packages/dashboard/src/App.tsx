import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './pages/home/home';
import { Auth } from './pages/auth/auth';

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path="/auth/openid">
          <Auth />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
