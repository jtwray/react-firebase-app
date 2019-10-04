import React, { useContext } from 'react';  
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../auth/FirebaseAuthContext";
import Loader from "../public/pages/Loader";
import './theme.css';
  
const AppLayout = ({ children }) => (                         
    <div id="wrapper">

        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
          </a>

          <hr className="sidebar-divider my-0" />
        </ul>

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">

            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
              </button>
            </nav>

            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Cards</h1>
              </div>
              <div className="row">
                <div className="col">
                  <p>This is the App Layout</p>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>  
);
  
const AppLayoutRoute = ({component: Component, ...rest}) => {
  const {authUser} = useContext(AuthContext);
  //const {userStateChecked} = useContext(AuthContext);
  return ( 
  <Route
      {...rest}
      render={ matchProps => 
          authUser.checked ? (
            !!authUser.user ? (
              <AppLayout>  
                <Component {...matchProps} />  
              </AppLayout>
            ) : (
              <Redirect to={"/signin"} />
            )
          ) : (
            <Loader />
          )
      }
  /> 
  )
};  
  
export default AppLayoutRoute;  