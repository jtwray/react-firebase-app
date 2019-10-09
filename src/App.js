import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/FirebaseAuthContext";

import PublicLayoutRouter from './components/public/PublicLayout';
import AppLayoutRouter from './components/app/AppLayout';

import Home from './components/app/pages/Home';
import SignIn from './components/public/pages/SignIn';
import NotFound from './components/public/pages/NotFound';
import UserProfile from './components/app/pages/user/UserProfile';
import UpdateUserName from './components/app/pages/user/UpdateUserName';
import UpdateUserPhone from './components/app/pages/user/UpdateUserPhone';
import UpdateUserEmail from './components/app/pages/user/UpdateUserEmail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <AppLayoutRouter exact path="/" component={Home} />
          <AppLayoutRouter exact path="/user/profile" component={UserProfile} />
          <AppLayoutRouter exact path="/user/update-name" component={UpdateUserName} />
          <AppLayoutRouter exact path="/user/update-email" component={UpdateUserEmail} />
          <AppLayoutRouter exact path="/user/update-phone" component={UpdateUserPhone} />
          <PublicLayoutRouter exact path="/signin" component={SignIn} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
