import { Outlet, Navigate, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";

export const CandidatApp = () => {
  const sideBar = document.getElementById("sidebar");
  const [navigate, setNavigate] = useState();

  useEffect(() => {
    sideBar === null ? setNavigate(true) : setNavigate(false);
  }, [sideBar]);

  return (
    <>
      <Header />
      <SideNavBar />
      {navigate && <Navigate to="Candidat/consulter-annonces" replace={true} />}
      <Outlet />
    </>
  );
};

const SideNavBar = () => {
  const sideBarItems = [
    {
      href: `Candidat/consulter-annonces`,
      span_text: "Consulter annonces",
    },
    {
      href: `Candidat/suivir-correction`,
      span_text: "Suivir correction",
    },
    {
      href: `Candidat/consulter-notes`,
      span_text: "Consulter notes",
    },
    {
      href: `Candidat/consulter-emplacement`,
      span_text: "Consulter emplacement",
    },
    {
      href: `Candidat/classer-theses`,
      span_text: "Classer les sujets de thèse",
    },
  ];

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <Navitem userNavItems={sideBarItems} />
        <li className="nav-heading">Pages</li>

        <NavLink to={"Candidat/Profile"} className="nav-link collapsed">
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
