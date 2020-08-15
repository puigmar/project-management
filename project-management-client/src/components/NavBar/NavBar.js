import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav-style">
      <ul>
        <li>
          <Link to="/projects" style={{ textDecoration: "none" }}>
            Projects
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;