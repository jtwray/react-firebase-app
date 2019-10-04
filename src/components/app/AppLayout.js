import React, { useEffect, useContext } from 'react';  
import { Route, Redirect, Link } from "react-router-dom";
import { AuthContext } from "../auth/FirebaseAuthContext";
import Loader from "../public/pages/Loader";
import UserMenu from "./UserMenu";
  
const AppLayout = ({ children }) => {

  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.src = './theme.js';
    document.head.appendChild(script);
    return () => script.parentNode.removeChild(script);
  }, []);

  return (                         
    <div id="wrapper">

        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
          </a>

          <hr className="sidebar-divider my-0" />
          {/* menu */}
          <li className="nav-item active">
            <Link className="nav-link" to="/dashboard">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </Link>
          </li>
        </ul>

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            {/* Topbar */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

              {/* Sidebar Toggle (Topbar) */}
              <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
              </button>
              <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block"></div>

                <UserMenu />
              </ul>
              
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
}
  
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