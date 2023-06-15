import React from "react";
import { NavLink } from "react-router-dom";

export const Navitem = ({ userNavItems }) => {
  return userNavItems.map((navitem, index) => (
    <NavLink to={navitem.href} className="nav-link collapsed" key={index}>
      <li className="nav-item">
        <i className="bi bi-envelope"></i>
        <span>{navitem.span_text}</span>
      </li>
    </NavLink>
  ));
};
