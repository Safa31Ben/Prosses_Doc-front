import React from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const fullName = localStorage.getItem("fullName");
  const type = localStorage.getItem("type");

  const logout = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("fullName");
    localStorage.removeItem("id");
    localStorage.removeItem("type");
  }
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <NavLink to={"/"} className="logo d-flex align-items-center">
          <span className="d-none d-lg-block">PROSSES DOC</span>
        </NavLink>
        <i className="bi bi-list toggle-sidebar-btn"></i>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <NavLink to={"#"} className="nav-link nav-icon search-bar-toggle ">
            <li className="nav-item d-block d-lg-none">
              <i className="bi bi-search"></i>
            </li>
          </NavLink>

          <li className="nav-item dropdown">
            <NavLink
              to={"#"}
              className="nav-link nav-icon"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-bell"></i>
              <span className="badge bg-primary badge-number">4</span>
            </NavLink>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                You have 4 new notifications
                <NavLink to={"#"}>
                  <span className="badge rounded-pill bg-primary p-2 ms-2">
                    View all
                  </span>
                </NavLink>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="notification-item">
                <i className="bi bi-exclamation-circle text-warning"></i>
                <div>
                  <h4>Lorem Ipsum</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>30 min. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="notification-item">
                <i className="bi bi-x-circle text-danger"></i>
                <div>
                  <h4>Atque rerum nesciunt</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>1 hr. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="notification-item">
                <i className="bi bi-check-circle text-success"></i>
                <div>
                  <h4>Sit rerum fuga</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>2 hrs. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="notification-item">
                <i className="bi bi-info-circle text-primary"></i>
                <div>
                  <h4>Dicta reprehenderit</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>4 hrs. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>
              <NavLink to={"#"}>
                Show all notifications
                <li className="dropdown-footer"></li>
              </NavLink>
            </ul>
          </li>

          <li className="nav-item dropdown pe-3">
            <NavLink
              to={"#"}
              className="nav-link nav-profile d-flex align-items-center pe-0"
              data-bs-toggle="dropdown"
            >
              <span className="d-none d-md-block dropdown-toggle ps-2">
                {fullName}
              </span>
            </NavLink>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{fullName}</h6>
                <span>{type}</span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <NavLink
                to={"/"}
                className="dropdown-item d-flex align-items-center"
                onClick={logout} 
              >
                <li>
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Se déconnecter</span>
                </li>
              </NavLink>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};
