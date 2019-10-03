import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/FirebaseAuthContext";

import PublicLayoutRouter from './components/public/PublicLayout';
import AppLayoutRouter from './components/app/AppLayout';
import 'bootstrap/dist/css/bootstrap.css';

import Home from './components/app/pages/Home';
import About from './components/app/pages/About';
import SignIn from './components/public/pages/SignIn';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <AppLayoutRouter exact path="/" component={Home} />
          <AppLayoutRouter exact path="/about" component={About} />
          <PublicLayoutRouter exact path="/signin" component={SignIn} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
