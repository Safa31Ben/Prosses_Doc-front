import React, { useState, useEffect } from "react";
import GestionAPI from "../APIs/GestionAPIs/GestionAPI";
import { Main } from "../components/Main";

export const ConsulterUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [selectedUtilisateur, setSelectedUtilisateur] = useState(null);
  const [displayForm, setDisplayForm] = useState(false);
  const [display, setDisplay] = useState(false);
  const [userDeleteID, setUserDeleteID] = useState(null);

  useEffect(() => {
    getUtilisateurs();
  }, [display, displayForm]);

  const getUtilisateurs = async () => {
    const data = await GestionAPI.userList();
    setUtilisateurs(data);
  };

  const updateUser = (userID) => {
    setSelectedUtilisateur(userID);
    setDisplayForm(true);
  };

  const deleteUser = async () => {
    displayConfirmation();
  };
  const displayConfirmation = () => {
    display ? setDisplay(false) : setDisplay(true);
  };

  const yesFunction = async () => {
    await GestionAPI.deleteUser(userDeleteID);
    getUtilisateurs();
    setUserDeleteID(null);
  };
  return (
    <Main>
      <div className="pagetitle">
        <h1>Gestion des comptes</h1>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <table className="table datatable">
                  <thead>
                    <tr>
                      <th scope="col">Nom d'utilisateur</th>
                      <th scope="col">Nom et Prénom</th>
                      <th scope="col">Email</th>
                      <th scope="col">Type</th>
                      <th scope="col">Modifier/Supprimer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {utilisateurs && utilisateurs.map((utilisateur) => (
                      <tr key={utilisateur.id}>
                        <th scope="row">{utilisateur.username}</th>
                        <td>{utilisateur.nom} {utilisateur.prenom}</td>
                        <td>{utilisateur.email}</td>
                        <td>{utilisateur.type}</td>
                        <td className="text-center">
                          <button
                            type="button"
                            className="btn btn-success mx-1"
                            onClick={() => updateUser(utilisateur.id)}
                          >
                            <i className="bi bi-check-circle"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger mx-1"
                            onClick={() => {
                              deleteUser();
                              setUserDeleteID(utilisateur.id);
                            }}
                          >
                            <i className="bi bi-exclamation-octagon"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      {displayForm && (
        <UpdateForm
          userData={selectedUtilisateur}
          setDisplayForm={setDisplayForm}
          setUtilisateurs={getUtilisateurs}
        />
      )}
      {display && (
        <Confirmation
          displayConfirmation={displayConfirmation}
          yesFunction={yesFunction}
        />
      )}
    </Main>
  );
};

export const Confirmation = ({ displayConfirmation, yesFunction }) => {
  const yes = () => {
    yesFunction();
    displayConfirmation();
  };
  return (
    <div
      className="modal fade show d-block"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-sm"
        role="dialog"
      >
        <div className="modal-content">
          <div className="modal-body">
            <i
              className="bi bi-x-circle m-3 d-flex justify-content-center text-danger"
              style={{ fontSize: "55px" }}
            ></i>
            <p className="d-flex px-3 justify-content-center fs-5">
              Êtes-vous sûr de vouloir supprimer cet utilisateur ?
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={displayConfirmation}
            >
              Non
            </button>
            <button
              type="button"
              className="btn btn-success"
              data-dismiss="modal"
              onClick={() => yes()}
            >
              Oui
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export const UpdateForm = ({ userData, setDisplayForm, setUtilisateurs }) => {
  const [userDetail, setUserDetail] = useState(null);
  const [enseignantDetail, setEnseignantDetail] = useState(null);
  const [candidatDetail, setCandidatDetail] = useState(null);

  const [nom, setNom] = useState(null);
  const [prenom, setPrenom] = useState(null);
  const [dateNaissance, setDateNaissance] = useState(null);
  const [grade, setGrade] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    getUtilisateurDetail();
  }, []);

  const getUtilisateurDetail = async () => {
    const response = await GestionAPI.userDetail(userData);
    if (response.candidat_detail) {
      setCandidatDetail(response.candidat_detail);
      setUserDetail(response.user_detail);
      setNom(response.user_detail.nom);
      setPrenom(response.user_detail.prenom);
      setDateNaissance(response.user_detail.date_naissance);
    } else if (response.enseignant_detail) {
      setEnseignantDetail(response.enseignant_detail);
      setUserDetail(response.user_detail);
      setNom(response.user_detail.nom);
      setPrenom(response.user_detail.prenom);
      setDateNaissance(response.user_detail.date_naissance);
      setGrade(response.enseignant_detail.grade);
      setType(response.user_detail.type);
    } else {
      setUserDetail(response);
      setNom(response.nom);
      setPrenom(response.prenom);
      setDateNaissance(response.date_naissance);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let updatedData = {
      nom: nom,
      prenom: prenom,
      date_naissance: dateNaissance,
    };

    if (grade) {
      updatedData.grade = grade;
    }

    if (type) {
      updatedData.type = type;
    }

    updateUtilisateur(updatedData);
    setDisplayForm(false);
    setUtilisateurs();
  };

  const updateUtilisateur = async (data) => {
    await GestionAPI.updateUser(userData, data);
  };

  return (
    <div
      className="modal fade show d-block"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="dialog"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="Ckeck Form">
              Modifier un compte
            </h4>
          </div>
          <div className="modal-body">
            <form className="row g-3" onSubmit={handleSubmit}>
              {userDetail && (
                <>
                  <div className="col-md-6">
                    <label className="form-label">Type</label>
                    {enseignantDetail ? (
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
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        value={userDetail.type || ""}
                        readOnly
                      />
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Nom d'utilisateur</label>
                    <input
                      type="text"
                      className="form-control"
                      value={userDetail.username || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={userDetail.email || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Prénom</label>
                    <input
                      type="text"
                      className="form-control"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Date de naissance</label>
                    <input
                      type="date"
                      className="form-control"
                      value={dateNaissance}
                      onChange={(e) => setDateNaissance(e.target.value)}
                    />
                  </div>
                  {enseignantDetail && (
                    <>
                      <div className="col-md-6">
                        <label className="form-label">Université</label>
                        <input
                          type="text"
                          className="form-control"
                          value={enseignantDetail.universite || ""}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Faculté</label>
                        <input
                          type="text"
                          className="form-control"
                          value={enseignantDetail.faculte || ""}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Spécialité</label>
                        <input
                          type="text"
                          className="form-control"
                          value={enseignantDetail.specialite || ""}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Département</label>
                        <input
                          type="text"
                          className="form-control"
                          value={enseignantDetail.depertement || ""}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Grade</label>
                        <input
                          type="text"
                          className="form-control"
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  {candidatDetail && (
                    <>
                      <div className="col-md-6">
                        <label className="form-label">Université</label>
                        <input
                          type="text"
                          className="form-control"
                          value={candidatDetail.universite || ""}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Faculté</label>
                        <input
                          type="text"
                          className="form-control"
                          value={candidatDetail.faculte || ""}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Spécialité</label>
                        <input
                          type="text"
                          className="form-control"
                          value={candidatDetail.specailite || ""}
                          readOnly
                        />
                      </div>
                    </>
                  )}
                </>
              )}
            </form>
          </div>
          <div className="modal-footer text-center">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => setDisplayForm(false)}
            >
              Fermer
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={handleSubmit}
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
