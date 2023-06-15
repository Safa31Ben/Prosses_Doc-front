import React, { useState } from "react";
import GestionAPI from "../APIs/GestionAPIs/GestionAPI";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalide, setInvalide] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await GestionAPI.login({
      username,
      password,
    });
    if (response.ok) {
      const data = await response.json();
      handleLoginSuccess(data);
    } else {
      setInvalide("Nom d'utilisateur et mot de passe incorrects");
    }
  };

  const handleLoginSuccess = (data) => {
    const { refresh, access, full_name, id, type } = data;

    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("accessToken", access);
    localStorage.setItem("fullName", full_name);
    localStorage.setItem("id", id);
    localStorage.setItem("type", type);

    if (type === "admin") {
      window.location.href = "/Admin";
    } else if (type === "candidat") {
      window.location.href = "/Candidat";
    } else if (type === "enseignant") {
      window.location.href = "/Enseignant";
    } else if (type === "président-du-CFD") {
      window.location.href = "/PresidentCFD";
    } else if (type === "vice-doyen") {
      window.location.href = "/ViceDoyen";
    }
  };

  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <a
                    href="index.html"
                    className="logo d-flex align-items-center w-auto"
                  >
                    <img src="/logo b.png" alt="" />
                    <span className="d-none d-lg-block">PROSSES DOC </span>
                  </a>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Connectez-vous à votre compte
                      </h5>

                      {invalide ? (
                        <p className="text-center small text-danger">{invalide}</p>
                      ) : (
                        <p className="text-center small">
                          Entrez votre nom d'utilisateur et votre mot de passe
                          pour vous connecter
                        </p>
                      )}
                    </div>

                    <form
                      className="row g-3 needs-validation"
                      noValidate
                      onSubmit={handleSubmit}
                    >
                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">
                          Nom d'utilisateur
                        </label>
                        <div className="input-group has-validation">
                          <span className="input-group-text" id="inputGroupPrepend">
                            @
                          </span>
                          <input
                            type="text"
                            name="username"
                            className="form-control"
                            id="yourUsername"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                          <div className="invalid-feedback">
                            S'il vous plaît entrez votre nom d'utilisateur.
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">
                          Mot de passe
                        </label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          id="yourPassword"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="invalid-feedback">
                          S'il vous plait entrez votre mot de passe!
                        </div>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit">
                          Connexion
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
