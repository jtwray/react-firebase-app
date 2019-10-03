import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/FirebaseAuthContext";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <Link to="/about">About</Link>
      <AuthContext.Consumer>
        {(context) => (
          <div>
            <p>{context.authUser.user.displayName}</p>
            <img src={context.authUser.user.photoURL} />
          </div>
        )}
      </AuthContext.Consumer>
    </>
  );
};

export default Home;