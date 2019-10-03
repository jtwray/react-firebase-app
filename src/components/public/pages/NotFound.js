import React from 'react';
import '../public.css';
import { Link } from "react-router-dom";

const NotFound = ({ children }) => (
    <div className="public-layout text-center">
        <div className="public-main">
            <h1>Page not found</h1>
            <p>Oops, the page you requested is not found.</p>
            <Link to="/">Home</Link>
        </div>
    </div>
);

export default NotFound;