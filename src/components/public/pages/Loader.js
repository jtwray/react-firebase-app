import React from 'react';
import '../public.css';

const Loader = ({ children }) => (
    <div className="public-layout text-center">
        <div className="public-main">
            <i className="fa fa-cog fa-5x fa-spin" />
        </div>
    </div>
);

export default Loader;