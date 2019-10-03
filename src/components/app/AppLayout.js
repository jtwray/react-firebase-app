import React, { useContext } from 'react';  
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../auth/FirebaseAuthContext";
import Loader from "../public/pages/Loader";
  
const AppLayout = ({ children }) => (                         
    <div>
        <p>This is the App Layout</p>
        {children}
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