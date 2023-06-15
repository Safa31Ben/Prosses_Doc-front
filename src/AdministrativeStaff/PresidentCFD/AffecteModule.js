import React, { useState, useEffect } from "react";
import PresidentCFDAPI from "../../APIs/AdministrativeStaffAPIs/PresidentCFDAPI";

import { Main } from "../../components/Main";
export const AffecteModule = () => {
  const [data, setData] = useState(null);
  const [validInput, setValidInput] = useState(null);
  const [formData, setFormData] = useState({});
  const userId = parseInt(localStorage.getItem('id'), 10);

  useEffect(() => {
    getDisponibleEmplacementEnseignants(userId);
  }, []);

  const getDisponibleEmplacementEnseignants = async (id) => {
    const response =
      await PresidentCFDAPI.ConsulterEnseignantsSujets(id);
    setData(response);
  };
  const AffecterAuxEnsignantsSujet = async (id, formData) => {
    const response =
      await PresidentCFDAPI.AffecterAuxEnsignantsSujet(
        id,
        formData
      );
    setValidInput(response.Etat);
  };
  const validateFormData = () => {
    let isValid = true;
    console.log(formData);
    let sujetSum = {};

    if (Object.keys(formData).length !== 0) {
      Object.entries(formData).forEach(([key, value]) => {
        const nbCopie = value.nb_copie || 0;
        const nbCorr = value.nb_corr || 0;
        if (sujetSum[value.sujet] && nbCorr === 1) {
          sujetSum[value.sujet][0] += nbCopie;
        } else if (sujetSum[value.sujet] && nbCorr === 2) {
          sujetSum[value.sujet][1] += nbCopie;
        } else if (nbCorr === 1) {
          sujetSum[value.sujet] = [nbCopie, 0];
        } else if (nbCorr === 2) {
          sujetSum[value.sujet] = [0, nbCopie];
        }
      });

      for (const [sujet, [nbCopie1, nbCopie2]] of Object.entries(sujetSum)) {
        if (nbCopie1 !== data["nb total copie"]) {
          isValid = `Le nombre total de copies affectées pour le sujet ${sujet} pour la 1ère correction est ${nbCopie1}`;
        } else if (nbCopie2 !== data["nb total copie"]) {
          isValid = `Le nombre total de copies affectées pour le sujet ${sujet} pour la 2ème correction est ${nbCopie2}`;
        }
      }
    } else {
      isValid =
        "Vous devez affecter au moins 2 enseignants pour corriger toutes les copies de chaque sujet.";
    }
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateFormData();
    isValid === true
      ? AffecterAuxEnsignantsSujet(userId, formData)
      : setValidInput(isValid);
  };

  const handleSujetChange = (event, enseignantId) => {
    const { value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [`${enseignantId}`]: {
        ...prevFormData[`${enseignantId}`],
        sujet: Number(value),
      },
    }));
  };

  const handleCorrectionChange = (event, enseignantId) => {
    const { value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [`${enseignantId}`]: {
        ...prevFormData[`${enseignantId}`],
        nb_corr: Number(value),
      },
    }));
  };

  const handleCopieChange = (event, enseignantId) => {
    const { value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [`${enseignantId}`]: {
        ...prevFormData[`${enseignantId}`],
        nb_copie: Number(value),
      },
    }));
  };
  const displayConfirmation = () => {
    validInput ? setValidInput(null) : setValidInput();
  };
  return (
    <Main>
      <div className="pagetitle">
        <h1>Affecter les enseignants pour la correction</h1>
      </div>
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                {data && (
                  <form onSubmit={handleSubmit}>
                    <h5 className="card-title">
                      Nombre total de copies:
                      <span className="fs-5 text-dark">
                        {` ${data["nb total copie"]} copies`}
                      </span>
                    </h5>
                    <table className="table datatable">
                      <thead>
                        <tr>
                          <th scope="col">Enseignant</th>
                          <th scope="col">Depertement / Spécialite</th>
                          <th scope="col">Sujet informations</th>
                          <th scope="col">Number de correction</th>
                          <th scope="col">Number de copie</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.enseignants.map((enseignant) => (
                          <tr scope="row" key={enseignant.id_enseignant}>
                            <td>
                              {`${enseignant.nom} ${enseignant.prenom} (${enseignant.grade})`}
                            </td>
                            <td>
                              {`${enseignant.depertement} / ${enseignant.specialite}`}
                            </td>

                            <td>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                name="sujet"
                                value={
                                  formData[enseignant.id_enseignant]?.sujet ||
                                  ""
                                }
                                onChange={(event) =>
                                  handleSujetChange(
                                    event,
                                    enseignant.id_enseignant
                                  )
                                }
                              >
                                <option value="">Séléctionner un sujet</option>
                                {data.sujets.map((sujet) => (
                                  <option
                                    value={sujet.id_sujet}
                                    key={sujet.id_sujet}
                                  >
                                    {`${sujet.id_sujet}- ${sujet.description} ${
                                      sujet.type
                                        ? "(Spécialité)"
                                        : "(Tronc commun)"
                                    }`}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                name="Number de correction"
                                value={
                                  formData[enseignant.id_enseignant]?.nb_corr ||
                                  ""
                                }
                                onChange={(event) =>
                                  handleCorrectionChange(
                                    event,
                                    enseignant.id_enseignant
                                  )
                                }
                              >
                                <option value="">
                                  Sélectionner le nombre de correction
                                </option>
                                <option value={1}>1er</option>
                                <option value={2}>2ème</option>
                              </select>
                            </td>
                            <td>
                              <input
                                className="form-control"
                                name="Number de copie"
                                type="number"
                                value={
                                  formData[enseignant.id_enseignant]
                                    ?.nb_copie || ""
                                }
                                onChange={(event) =>
                                  handleCopieChange(
                                    event,
                                    enseignant.id_enseignant
                                  )
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button className="btn btn-primary" type="submit">
                      Valider l'affectation
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {validInput ? (
        <Confirmation
          displayConfirmation={displayConfirmation}
          confirmationText={validInput}
        />
      ) : null}
    </Main>
  );
};

const Confirmation = ({ displayConfirmation, confirmationText }) => {
  const close = () => {
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
            <p className="d-flex px-3 justify-content-center fs-5">
              {confirmationText}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn accept-btn"
              data-dismiss="modal"
              onClick={() => close()}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
