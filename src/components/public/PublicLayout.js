import React from 'react';  
import { Route } from 'react-router-dom';
import './public.css';
  
const PublicLayout = ({ children }) => (                         
    <div className="public-layout text-center">
        <div className="public-main">
            <i className="fa fa-5x fa-fire text-warning"></i>
            <h2 className="h3 mb-3 font-weight-normal">Please sign in</h2>
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