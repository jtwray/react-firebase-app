import React from 'react';
import '../public.css';

const NotFound = ({ children }) => (
    <div className="public-layout text-center">
        <div className="public-main">
            Oops, the page you requested is not found.
        </div>
    </div>
);

export default NotFound;