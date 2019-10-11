import React from "react";
import { Link } from "react-router-dom";

const Home = () => {

  var title = 'Application Home';

  document.title = title;

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">{title}</h1>
      </div>
      <div className="row">
        <div className="col mb-4">
            <div className="card shadow mb-4">
                <div className="card-body">
                  <p>Replace this page with your application homepage.</p>
                  <ul>
                    <li><Link to="/user/profile">Manage Your Profile</Link></li>
                    <li><Link to="/user/log">View Your Activities</Link></li>
                  </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;