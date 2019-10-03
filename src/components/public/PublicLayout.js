import React from 'react';  
import { Route } from 'react-router-dom';
import './public.css';
  
const PublicLayout = ({ children }) => (                         
    <div className="public-layout text-center">
        <div className="public-main">
            <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            {children}
            <p className="mt-5 mb-3 text-muted">&copy; 2019 Fireact</p>
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