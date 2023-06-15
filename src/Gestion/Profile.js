import React, { useState, useEffect } from "react";
import GestionAPI from "../APIs/GestionAPIs/GestionAPI";

import { Main } from "../components/Main";

export const Profile = () => {
  const userId = parseInt(localStorage.getItem("id"), 10);
  const [userDetail, setUserDetail] = useState(null);
  const [enseignantDetail, setEnseignantDetail] = useState(null);
  const [candidatDetail, setCandidatDetail] = useState(null);

  const [nom, setNom] = useState(null);
  const [prenom, setPrenom] = useState(null);
  const [dateNaissance, setDateNaissance] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [renewPassword, setRenewPassword] = useState(null);

  const [display, setDisplay] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getUtilisateurDetail();
  }, [update]);

  const getUtilisateurDetail = async () => {
    setNewPassword(null);
    setRenewPassword(null);
    const response = await GestionAPI.userDetail(userId);
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
    if (newPassword && renewPassword) {
      if (newPassword === renewPassword && newPassword.length >= 8) {
        updatedData.password = newPassword;
        updateUtilisateur(updatedData);
        setUpdate(true);
      } else {
        setDisplay(true);
      }
    } else if (newPassword | renewPassword) {
      setDisplay(true);
    } else {
      updateUtilisateur(updatedData);
      setUpdate(true);
    }
  };

  const updateUtilisateur = async (data) => {
    await GestionAPI.updateUser(userId, data);
  };

  return (
    <Main>
      <div className="pagetitle">
        <h1>Profile</h1>
      </div>

      <section className="section profile">
        <div className="row">
          <div className="card">
            <div className="card-body pt-3">
              <ul className="nav nav-tabs nav-tabs-bordered">
                <li className="nav-item">
                  <button
                    className="nav-link active"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-overview"
                  >
                    Overview
                  </button>
                </li>

                <li className="nav-item">
                  <button
                    className="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-edit"
                  >
                    Edit Profile
                  </button>
                </li>
              </ul>
              <div className="tab-content pt-2">
                <div
                  className="tab-pane fade show active profile-overview"
                  id="profile-overview"
                >
                  {userDetail && (
                    <>
                      <h5 className="card-title">
                        Type{" "}
                        <span className="label fs-6">{userDetail.type}</span>
                      </h5>

                      <h5 className="card-title">Détails personnels</h5>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">
                          Nom d'utilisateur
                        </div>
                        <div className="col-lg-9 col-md-8">
                          {userDetail.username}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Email</div>
                        <div className="col-lg-9 col-md-8">
                          {userDetail.email}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Nom</div>
                        <div className="col-lg-9 col-md-8">
                          {" "}
                          {userDetail.nom}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Prénom</div>
                        <div className="col-lg-9 col-md-8">
                          {userDetail.prenom}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">
                          Date de naissance
                        </div>
                        <div className="col-lg-9 col-md-8">
                          {userDetail.date_naissance}
                        </div>
                      </div>
                      {enseignantDetail && (
                        <>
                          <h5 className="card-title">Détails professionnels</h5>

                          <div className="row">
                            <div className="col-lg-3 col-md-4 label">
                              Université
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {enseignantDetail.universite}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-3 col-md-4 label">
                              Faculté
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {enseignantDetail.faculte}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-3 col-md-4 label">
                              Spécialité
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {enseignantDetail.specialite}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-3 col-md-4 label">
                              Département
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {enseignantDetail.depertement}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-3 col-md-4 label">Grade</div>
                            <div className="col-lg-9 col-md-8">
                              {enseignantDetail.grade}
                            </div>
                          </div>
                        </>
                      )}
                      {candidatDetail && (
                        <>
                          <h5 className="card-title">Détails professionnels</h5>

                          <div className="row">
                            <div className="col-lg-3 col-md-4 label">
                              Université
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {candidatDetail.universite}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-3 col-md-4 label">
                              Faculté
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {candidatDetail.faculte}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-3 col-md-4 label">
                              Spécialité
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {candidatDetail.specailite}
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>

                <div
                  className="tab-pane fade profile-edit pt-3"
                  id="profile-edit"
                >
                  <form>
                    {userDetail && (
                      <>
                        <div className="row mb-3">
                          <label className="col-md-4 col-lg-3 col-form-label">
                            Type
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              value={userDetail.type}
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label className="col-md-4 col-lg-3 col-form-label">
                            Nom d'utilisateur
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              value={userDetail.username}
                              readOnly
                            />
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
                              value={userDetail.email}
                              readOnly
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
                            />
                          </div>
                        </div>
                        {enseignantDetail && (
                          <>
                            <div className="row mb-3">
                              <label className="col-md-4 col-lg-3 col-form-label">
                                Université
                              </label>
                              <div className="col-md-8 col-lg-9">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={enseignantDetail.universite}
                                  readOnly
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
                                  value={enseignantDetail.faculte}
                                  readOnly
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
                                  value={enseignantDetail.specialite}
                                  readOnly
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
                                  value={enseignantDetail.depertement}
                                  readOnly
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
                                  value={enseignantDetail.grade}
                                  readOnly
                                />
                              </div>
                            </div>
                          </>
                        )}
                        {candidatDetail && (
                          <>
                            <div className="row mb-3">
                              <label className="col-md-4 col-lg-3 col-form-label">
                                Université
                              </label>
                              <div className="col-md-8 col-lg-9">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={candidatDetail.universite}
                                  readOnly
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
                                  value={candidatDetail.faculte}
                                  readOnly
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
                                  value={candidatDetail.specailite}
                                  readOnly
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    <div className="row mb-3">
                      <label className="col-md-4 col-lg-3 col-form-label">
                      Nouveau mot de passe
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="newpassword"
                          type="password"
                          className="form-control"
                          id="newPassword"
                          value={newPassword || ""}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-md-4 col-lg-3 col-form-label">
                      Ré-entrez le nouveau mot de passe
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="renewpassword"
                          type="password"
                          className="form-control"
                          id="renewPassword"
                          value={renewPassword || ""}
                          onChange={(e) => setRenewPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    {display && (
                      <div className="alert alert-danger" role="alert">
                        Les mots de passe ne correspondent pas ou mots de passe
                        de moins de 8 caractères. Veuillez réessayer.
                      </div>
                    )}
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        Sauvegarder
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};
