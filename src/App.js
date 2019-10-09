import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/FirebaseAuthContext";

import PublicLayoutRouter from './components/public/PublicLayout';
import AppLayoutRouter from './components/app/AppLayout';

import Home from './components/app/pages/Home';
import SignIn from './components/public/pages/SignIn';
import NotFound from './components/public/pages/NotFound';
import UpdateUserName from './components/app/pages/user/UpdateUserName';
import UserProfile from './components/app/pages/user/UserProfile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <AppLayoutRouter exact path="/" component={Home} />
          <AppLayoutRouter exact path="/user/profile" component={UserProfile} />
          <AppLayoutRouter exact path="/user/update-name" component={UpdateUserName} />
          <PublicLayoutRouter exact path="/signin" component={SignIn} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
