import React, { useEffect, useContext, useState } from 'react';  
import { Route, Redirect, NavLink } from "react-router-dom";
import { AuthContext } from "../auth/FirebaseAuthContext";
import Loader from "../public/pages/Loader";
import UserMenu from "./UserMenu";
  
const AppLayout = ({ children }) => {

  const [userMenuActive, setUserMenuActive] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.src = '/theme.js';
    document.head.appendChild(script);
    return () => script.parentNode.removeChild(script);
  }, []);

  return (                         
    <div id="wrapper">

        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled" id="accordionSidebar">
          <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-fire text-warning"></i>
            </div>
            <div className="sidebar-brand-text mx-3">Fireact</div>
          </NavLink>

          <hr className="sidebar-divider my-0" />
          {/* menu */}
          <li className={"nav-item"+((window.location.pathname==='/')?" active":"")}>
            <NavLink className="nav-link" exact to="/" activeClassName="nav-link active">
              <i className="fas fa-fw fa-atom"></i>
              <span>Projects</span>
            </NavLink>
          </li>
          <hr className="sidebar-divider" />
          <div className="sidebar-heading">
            Account
          </div>
          <li className={"nav-item"+((window.location.pathname.startsWith('/user/'))?" active":"")}>
             <a className="nav-link collapsed" href="/" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
              <i className="fas fa-fw fa-cog"></i>
              <span>User</span>
            </a>
            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">User Features:</h6>
                <NavLink className="collapse-item" strict activeClassName="collapse-item active" to="/user/profile">Profile</NavLink>
                <NavLink className="collapse-item" strict activeClassName="collapse-item active" to="/user/log">Activity Log</NavLink>
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