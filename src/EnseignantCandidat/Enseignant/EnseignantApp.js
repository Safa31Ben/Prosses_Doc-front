import { Outlet, Navigate, NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";

export const EnseignantApp = () => {
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
        <Navigate to="Enseignant/consulter-emplacement" replace={true} />
      )}
      <Outlet />
    </>
  );
};

const SideNavBar = () => {
  const type = localStorage.getItem("type");
  const sideBarItems = [
    {
      href: `Enseignant/consulter-emplacement`,
      span_text: "Consulter emplacement",
    },
    {
      href: `Enseignant/saisir-notes`,
      span_text: "Saisir les notes",
    },
    {
      href: `Enseignant/Fair-rapport`,
      span_text: "Fair rapport de saisir",
    },
    {
      href: `Enseignant/Marquer-présence`,
      span_text: "Marquer le présence",
    },
    {
      href: `Enseignant/proposer-sujet-these`,
      span_text: "Proposer un sujet de thèse",
    },
  ];
  const routerNavigate = useNavigate();
  const handleViceDoyenLogin = () => {
    routerNavigate("/ViceDoyen/ViceDoyen/consulter-les-statistiques");
  };
  const handlePresidentCFDLogin = () => {
    routerNavigate("/PresidentCFD/PresidentCFD/consulter-rapports");
  };
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <Navitem userNavItems={sideBarItems} />
        <li className="nav-heading">Pages</li>

        <NavLink to={"Enseignant/Profile"} className="nav-link collapsed">
          <li className="nav-item d-flex align-items-center">
            <i className="bi bi-person"></i>
            <span>Profile</span>
          </li>
        </NavLink>
        {type !== "enseignant" && (
          <>
            {type === "vice-doyen" && (
              <li className="nav-link collapsed" onClick={handleViceDoyenLogin}>
                <i className="bi bi-toggle-on"></i>
                <span>Se connecter en tant qu'un vice doyen</span>
              </li>
            )}
            {type === "président-du-CFD" && (
              <li
                className="nav-link collapsed"
                onClick={handlePresidentCFDLogin}
              >
                <i className="bi bi-toggle-on"></i>
                <span>Se connecter en tant qu'un président du CFD</span>
              </li>
            )}
          </>
        )}
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
