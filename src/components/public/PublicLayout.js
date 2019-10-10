import React from 'react';  
import { Route } from 'react-router-dom';
import './public.css';
  
const PublicLayout = ({ children }) => (                         
    <div className="public-layout text-center">
        <div className="public-main">
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