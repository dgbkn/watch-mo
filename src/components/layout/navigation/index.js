import React from "react";
import NavLink from "react-router-dom/NavLink";

const Navigation = () => (
  <nav className="navigation">
    <ul className="d-flex flex-column">
      <li className="logo">
        <NavLink to="/" title="WatchMo.com">
          WatchMo
        </NavLink>
      </li>
      <li>
        <NavLink to="/search" title="Find Here">
          Finder
        </NavLink>
      </li>
      <li>
        <NavLink to="/movies" title="Find Here">
          Movies
        </NavLink>
      </li>
      <li>
        <NavLink to="/tv-shows" title="Find Here">
          TV Shows
        </NavLink>
      </li>
      <li>
        <NavLink to="/settings" title="Find Here">
          Settings
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
