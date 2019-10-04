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
              <i className="fas fa-fire text-warning"></i>
            </div>
            <div className="sidebar-brand-text mx-3">Fireact</div>
          </a>

          <hr className="sidebar-divider my-0" />
          {/* menu */}
          <li className="nav-item active">
            <Link className="nav-link" to="/dashboard">
              <i className="fas fa-fw fa-atom"></i>
              <span>Projects</span>
            </Link>
          </li>
          <hr className="sidebar-divider" />
          <div className="sidebar-heading">
            Account
          </div>
          <li className="nav-item">
             <a className="nav-link collapsed" href="/" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
              <i className="fas fa-fw fa-cog"></i>
              <span>User</span>
            </a>
            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Custom Components:</h6>
                <Link className="collapse-item" to="/profile">Profile</Link>
                <Link className="collapse-item" to="/settings">Setting</Link>
              </div>
            </div>
          </li>
          <hr className="sidebar-divider d-none d-md-block" />
          <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle"></button>
          </div>
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

            {children}
            
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