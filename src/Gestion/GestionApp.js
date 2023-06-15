import { Outlet, Navigate, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";

export const GestionApp = () => {
  const sideBar = document.getElementById("sidebar");
  const [navigate, setNavigate] = useState();

  useEffect(() => {
    sideBar === null ? setNavigate(true) : setNavigate(false);
  }, [sideBar]);

  return (
    <>
      <Header />
      <SideNavBar />
      {navigate && (
        <Navigate to="Admin/consulter-utilisateurs" replace={true} />
      )}
      <Outlet />
    </>
  );
};

const SideNavBar = () => {
  const sideBarItems = [
    {
      href: `Admin/consulter-utilisateurs`,
      span_text: "consulter les utilisateurs",
    },
    {
      href: `Admin/ajouter-utilisateur`,
      span_text: "Ajouter un utilisateur",
    },
    {
      href: `Admin/ajouter-candidats`,
      span_text: "Ajouter les candidats",
    },
    {
      href: `Admin/ajouter-emplacement`,
      span_text: "Ajouter emplacement",
    },
    {
      href: `Admin/ajouter-councours`,
      span_text: "Ajouter councours",
    },
  ];

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <Navitem userNavItems={sideBarItems} />
        <li className="nav-heading">Pages</li>

        <NavLink to={"Admin/Profile"} className="nav-link collapsed">
          <li className="nav-item d-flex align-items-center">
            <i className="bi bi-person"></i>
            <span>Profile</span>
          </li>
        </NavLink>
      </ul>
    </aside>
  );
};

const Navitem = ({ userNavItems }) => {
  return userNavItems.map((navitem, index) => (
    <NavLink to={navitem.href} className="nav-link collapsed" key={index}>
      <li className="nav-item d-flex align-items-center">
        <i className="bi bi-grid"></i>
        <span>{navitem.span_text}</span>
      </li>
    </NavLink>
  ));
};
