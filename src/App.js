import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/FirebaseAuthContext";

import PublicLayoutRouter from './components/public/PublicLayout';
import AppLayoutRouter from './components/app/AppLayout';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import Home from './components/app/pages/Home';
import About from './components/app/pages/About';
import SignIn from './components/public/pages/SignIn';
import NotFound from './components/public/pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <AppLayoutRouter exact path="/" component={Home} />
          <AppLayoutRouter exact path="/about" component={About} />
          <PublicLayoutRouter exact path="/signin" component={SignIn} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
