import { Outlet, Navigate, NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";

export const ViceDoyenApp = () => {
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
        <Navigate to="ViceDoyen/consulter-les-statistiques" replace={true} />
      )}
      <Outlet />
    </>
  );
};

const SideNavBar = () => {
  const sideBarItems = [
    {
      href: `ViceDoyen/Consulter-les-statistiques`,
      span_text: "Consulter les statistiques",
    },
    {
      href: `ViceDoyen/Conculter-ressources-humains`,
      span_text: "Consulter les ressources humains",
    },
    {
      href: `ViceDoyen/Partager-annonces`,
      span_text: "Partager les annonces",
    },

    {
      href: `ViceDoyen/Generer-code-anonymes`,
      span_text: "Generer les code anonymes",
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

        <NavLink to={"ViceDoyen/Profile"} className="nav-link collapsed">
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
