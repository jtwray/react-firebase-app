import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <h1>About</h1>
      <p>about this site</p>
      <Link to="/">Home</Link>
    </>
  );
};

export default About;