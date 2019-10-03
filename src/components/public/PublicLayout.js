import React from 'react';  
import { Route } from 'react-router-dom';
import './public.css';
import logo from '../../logo.svg';
  
const PublicLayout = ({ children }) => (                         
    <div className="public-layout text-center">
        <div className="public-main">
            <img className="mb-4" src={logo} alt="Default Logo" width="72" height="72" />
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            {children}
        </div>
    </div>  
);  
  
const PublicLayoutRoute = ({component: Component, ...rest}) => {  
    return (  
        <Route {...rest} render={matchProps => (  
            <PublicLayout>  
                <Component {...matchProps} />  
            </PublicLayout>  
        )} />  
    )  
};
  
export default PublicLayoutRoute;