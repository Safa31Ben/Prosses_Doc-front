import React, { useState, useEffect } from "react";
import PresidentCFDAPI from "../../APIs/AdministrativeStaffAPIs/PresidentCFDAPI";
import { Main } from "../../components/Main";

export const ValiderNotes = () => {
  const [data, setData] = useState(null);
  const [selectedEnseignant, setSelectedEnseignant] = useState({});
  const [display, setDisplay] = useState(null);
  const [displayState, setDisplayState] = useState(null);
  const userId = parseInt(localStorage.getItem('id'), 10);

  useEffect(() => {
    validerNotes();
  }, []);

  const validerNotes = async () => {
    const response = await PresidentCFDAPI.ValiderNotes(userId);
    const newData = response.Etat ? null : response;
    setData(newData);
    setDisplayState(response.Etat);
  };

  const getAvailableEnseignants = (idSujet) => {
    const selectedIds = Object.values(selectedEnseignant)
      .filter(
        (enseignant) => enseignant && enseignant.id_enseignant !== undefined
      )
      .map((enseignant) => enseignant.id_enseignant);

    return (
      data?.CandidatSujet?.[idSujet]?.enseignants.filter(
        (enseignant) => !selectedIds.includes(enseignant.id_enseignant)
      ) || []
    );
  };

  const handleEnseignantChange = (event, idSujet) => {
    const value = event.target.value;
    const newEnseignant = value ? JSON.parse(value) : null;

    setSelectedEnseignant((prevState) => ({
      ...prevState,
      [idSujet]: newEnseignant,
    }));
  };

  const handleSubmit = async () => {
    const submitData = {};

    for (const idSujet in selectedEnseignant) {
      const enseignant = selectedEnseignant[idSujet];
      const sujet = data?.CandidatSujet?.[idSujet];

      submitData[idSujet] = {
        candidats: sujet?.candidats ?? [],
        enseignants: enseignant ? enseignant.id_enseignant : null,
      };
    }

    if (Object.keys(selectedEnseignant).length !== 0) {
      const state = await PresidentCFDAPI.Affecter3emeCorrection(submitData);
      setDisplay(state.Etat);
    } else {
      setDisplay("Error");
    }
  };

  const displayConfirmation = () => {
    setDisplay(display ? null : "");
  };

  return (
    <Main>
      <div className="pagetitle">
        <h1>
          Validation des notes et affectation d'une troisième correction si
          nécessaire
        </h1>
      </div>
      {data && (
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Les sujets qui nécessitent une 3ème correction{" "}
                  </h5>

                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th scope="col">ID Sujet</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type de Sujet</th>
                        <th scope="col">Nb Copies</th>
                        <th scope="col">Enseignants</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(data.CandidatSujet).map(
                        ([idSujet, sujet]) => (
                          <tr key={idSujet}>
                            <th scope="row">{idSujet}</th>
                            <td>{sujet.description}</td>
                            <td>
                              {sujet.type ? "Spécialité" : "Tronc commun"}
                            </td>
                            <td>{sujet.candidats.length}</td>
                            <td>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                required
                                value={
                                  selectedEnseignant[idSujet]
                                    ? JSON.stringify(
                                        selectedEnseignant[idSujet]
                                      )
                                    : ""
                                }
                                onChange={(event) =>
                                  handleEnseignantChange(event, idSujet)
                                }
                              >
                                <option value="">
                                  Sélectionnez un enseignant
                                </option>
                                {getAvailableEnseignants(idSujet).map(
                                  (enseignant) => (
                                    <option
                                      key={enseignant.id_enseignant}
                                      value={JSON.stringify(enseignant)}
                                    >
                                      {`${enseignant.nom} ${enseignant.prenom}`}
                                    </option>
                                  )
                                )}
                                {selectedEnseignant[idSujet] && (
                                  <option
                                    key={
                                      selectedEnseignant[idSujet].id_enseignant
                                    }
                                    value={JSON.stringify(
                                      selectedEnseignant[idSujet]
                                    )}
                                  >
                                    {`${selectedEnseignant[idSujet].nom} ${selectedEnseignant[idSujet].prenom}`}
                                  </option>
                                )}
                              </select>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>

                  <div className="col-12">
                    <button
                      onClick={handleSubmit}
                      className="btn btn-primary"
                      type="submit"
                    >
                      Valider les affectations
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {display && (
        <Confirmation
          displayConfirmation={displayConfirmation}
          confirmationText={display}
        />
      )}
      {displayState && (
        <div className="container">
          <section className="section d-flex align-items-center justify-content-center">
            <div className="card pt-4 pb-2">
              <h1 className="text-center px-4">{displayState}</h1>
            </div>
          </section>
        </div>
      )}
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
