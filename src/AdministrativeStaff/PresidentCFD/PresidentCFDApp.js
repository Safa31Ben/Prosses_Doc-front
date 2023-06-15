import { Outlet, Navigate, NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";

export const PresidentCFDApp = () => {
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
        <Navigate to="PresidentCFD/consulter-rapports" replace={true} />
      )}
      <Outlet />
    </>
  );
};

const SideNavBar = () => {
  const sideBarItems = [
    {
      href: `PresidentCFD/affecter-les-emplacements`,
      span_text: "Affecter les emplacements",
    },
    {
      href: `PresidentCFD/affecte-module`,
      span_text: "Affecte module",
    },
    {
      href: `PresidentCFD/valider-notes`,
      span_text: "Valider les notes",
    },
    {
      href: `PresidentCFD/valider-notes-moyennes`,
      span_text: "Valider les notes et les moyennes final",
    },
    {
      href: `PresidentCFD/reclamations`,
      span_text: "Consulter les reclamations",
    },
    {
      href: `PresidentCFD/affecter-sujet-theses`,
      span_text: "Affecter les Sujets du theses",
    },
    {
      href: `PresidentCFD/consulter-rapports`,
      span_text: "Consulter les rapports",
    },
  ];
  const routerNavigate = useNavigate();
  const handleEnseignantLogin = () => {
    routerNavigate("/Enseignant/Enseignant/consulter-emplacement");
  };
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <Navitem userNavItems={sideBarItems} />
        <li className="nav-heading">Pages</li>

        <NavLink to={"PresidentCFD/Profile"} className="nav-link collapsed">
          <li className="nav-item d-flex align-items-center">
            <i className="bi bi-person"></i>
            <span>Profile</span>
          </li>
        </NavLink>

        <li className="nav-link collapsed" onClick={handleEnseignantLogin}>
          <i className="bi bi-toggle-on"></i>
          <span>Se connecter en tant qu'enseignant</span>
        </li>
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
