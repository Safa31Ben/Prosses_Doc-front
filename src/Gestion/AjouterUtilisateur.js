import React, { useState} from "react";
import GestionAPI from "../APIs/GestionAPIs/GestionAPI";

import { Main } from "../components/Main";

export const AjouterUtilisateur = () => {
  const [type, setType] = useState("vice-doyen");
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [universite, setUniversite] = useState("");
  const [faculte, setFaculte] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [grade, setGrade] = useState("");
  const [depertement, setDepartement] = useState("");
  const [display, setDisplay] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = dateNaissance.replaceAll("-", "");
    const password = formattedDate;
    const username = `${prenom.replaceAll(" ", "")}${formattedDate}`;

    const formData = {
      type: type,
      email: email,
      nom: nom,
      prenom: prenom,
      date_naissance: dateNaissance,
      universite: universite,
      faculte: faculte,
      specialite: specialite,
      grade: grade,
      depertement: depertement,
      username: username.toLowerCase(),
      password: password,
    };

    try {
      const response = await GestionAPI.addUser(formData);
      if (response.ok) {
        setDisplay(false);
        handleReset();
      } else {
        setDisplay(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setDisplay(false);
    setType("vice-doyen");
    setEmail("");
    setNom("");
    setPrenom("");
    setDateNaissance("");
    setUniversite("");
    setFaculte("");
    setSpecialite("");
    setGrade("");
    setDepartement("");
  };

  return (
    <Main>
      <div className="pagetitle">
        <h1> Ajouter Utilisateur </h1>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Remplez les inforamtions du compte</h5>
                {display && (
                  <div className="alert alert-danger" role="alert">
                    L'email ou le nom d'utilisateur existe déjà
                  </div>
                )}
                <form className="row g-3 mt-3" onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <label className="col-md-4 col-lg-3 col-form-label">
                      Type
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <select
                        className="form-control"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value="vice-doyen">Vice doyen</option>
                        <option value="président-du-CFD">
                          Président du CFD
                        </option>
                        <option value="enseignant">Enseignant</option>
                      </select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-md-4 col-lg-3 col-form-label">
                      Email
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-md-4 col-lg-3 col-form-label">
                      Nom
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        type="text"
                        className="form-control"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-md-4 col-lg-3 col-form-label">
                      Prénom
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        type="text"
                        className="form-control"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-md-4 col-lg-3 col-form-label">
                      Date de naissance
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        type="date"
                        className="form-control"
                        value={dateNaissance}
                        onChange={(e) => setDateNaissance(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-md-4 col-lg-3 col-form-label">
                      Université
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        type="text"
                        className="form-control"
                        value={universite}
                        onChange={(e) => setUniversite(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-md-4 col-lg-3 col-form-label">
                      Faculté
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        type="text"
                        className="form-control"
                        value={faculte}
                        onChange={(e) => setFaculte(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-md-4 col-lg-3 col-form-label">
                      Spécialité
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        type="text"
                        className="form-control"
                        value={specialite}
                        onChange={(e) => setSpecialite(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-md-4 col-lg-3 col-form-label">
                      Département
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        type="text"
                        className="form-control"
                        value={depertement}
                        onChange={(e) => setDepartement(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-md-4 col-lg-3 col-form-label">
                      Grade
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        type="text"
                        className="form-control"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary mx-1">
                      Ajouter
                    </button>
                    <button
                      type="reset"
                      className="btn btn-secondary mx-1"
                      onClick={handleReset}
                    >
                      Réinitialiser
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};
