import React, { useState, useEffect } from "react";
import PresidentCFDAPI from "../../APIs/AdministrativeStaffAPIs/PresidentCFDAPI";
import { Main } from "../../components/Main";

export const AffecterEmplacements = () => {
  const [emplacements, setEmplacements] = useState(null);
  const [enseignants, setEnseignants] = useState(null);
  const [data, setData] = useState(false);
  const [display, setDisplay] = useState(null);
  const userId = parseInt(localStorage.getItem('id'), 10);

  useEffect(() => {
    getDisponibleEmplacementEnseignants();
  }, [data]);

  const getDisponibleEmplacementEnseignants = async () => {
    const data =
      await PresidentCFDAPI.DisponibleEmplacementEnseignants(
        userId
      );
    setEmplacements(data.emplacements);
    setEnseignants(data.enseignants);
    setData(true);
  };

  const submit = async (id, data) => {
    try {
      const response =
        await PresidentCFDAPI.AffecterEmplacementEnseignantsCandidats(
          id,
          data
        );
      setDisplay(response.emplacements);
    } catch (error) {
      setDisplay("Tous les emplacements doivent avoir deux enseignants");
    }
  };

  const displayConfirmation = () => {
    display ? setDisplay(null) : setDisplay();
  };

  return (
    <Main>
      <div className="pagetitle">
        <h1>
          Affecter les enseignants pour la surveillance et les emplacement des
          candidats
        </h1>
      </div>

      {data && (
        <EmplacementsTable
          emplacements={emplacements}
          enseignants={enseignants}
          onSubmit={submit}
        />
      )}
      {display ? (
        <Confirmation
          displayConfirmation={displayConfirmation}
          confirmationText={display}
        />
      ) : null}
    </Main>
  );
};

function EmplacementsTable({ emplacements, enseignants, onSubmit }) {
  const [selectedIds, setSelectedIds] = useState(null);
  const [notSelectedenseignants, setnotSelectedEnseignants] =
    useState(enseignants);
  const [selectedIdSet, setSelectedIdSet] = useState(new Set());
  const initDic = () => {
    const initialSelectedIds = emplacements.reduce((acc, emplacement) => {
      return {
        ...acc,
        [emplacement.id_emplacement]: {
          id_enseignant_principal: null,
          id_enseignant_secondaire: null,
        },
      };
    }, {});
    setSelectedIds(initialSelectedIds);
  };

  useEffect(() => {
    initDic();
  }, []);

  const notSelected = () => {
    const test = enseignants.filter((e) => !selectedIdSet.has(e.id_enseignant));
    setnotSelectedEnseignants(test);
  };
  const handleSelectChange = (e, emplacementId, enseignantType) => {
    const value = parseInt(e.target.value);
    if (
      selectedIdSet.has(selectedIds[emplacementId].id_enseignant_principal) &&
      enseignantType === "id_enseignant_principal"
    )
      selectedIdSet.delete(selectedIds[emplacementId].id_enseignant_principal);
    else if (
      selectedIdSet.has(selectedIds[emplacementId].id_enseignant_secondaire) &&
      enseignantType === "id_enseignant_secondaire"
    )
      selectedIdSet.delete(selectedIds[emplacementId].id_enseignant_secondaire);

    setSelectedIds((prevSelectedIds) => ({
      ...prevSelectedIds,
      [emplacementId]: {
        ...prevSelectedIds[emplacementId],
        [enseignantType]: value,
      },
    }));
    selectedIdSet.add(value);
    notSelected();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = parseInt(localStorage.getItem('id'), 10);
    onSubmit(userId, selectedIds);
  };

  return (
    <section className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {selectedIds && (
                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th scope="col">Id emplacement</th>
                        <th scope="col">Salle</th>
                        <th scope="col">Capacite</th>
                        <th scope="col">Enseignant principal</th>
                        <th scope="col">Enseignant secondaire</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emplacements.map((emplacement) => (
                        <tr key={emplacement.id_emplacement}>
                          <th scope="row">{emplacement.id_emplacement}</th>
                          <td>{emplacement.salle}</td>
                          <td>{emplacement.capacite}</td>
                          <td>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              required
                              value={
                                selectedIds[emplacement.id_emplacement]
                                  ?.id_enseignant_principal || ""
                              }
                              onChange={(e) =>
                                handleSelectChange(
                                  e,
                                  emplacement.id_emplacement,
                                  "id_enseignant_principal"
                                )
                              }
                            >
                              <option value="">
                                Sélectionnez un enseignant
                              </option>
                              {enseignants.map(
                                (enseignant) =>
                                  selectedIds[emplacement.id_emplacement]
                                    .id_enseignant_principal ===
                                    enseignant.id_enseignant && (
                                    <option
                                      key={enseignant.id_enseignant}
                                      value={enseignant.id_enseignant}
                                    >
                                      {`${enseignant.nom} ${enseignant.prenom} (${enseignant.grade})`}
                                    </option>
                                  )
                              )}
                              {notSelectedenseignants.map((enseignant) => (
                                <option
                                  key={enseignant.id_enseignant}
                                  value={enseignant.id_enseignant}
                                >
                                  {`${enseignant.nom} ${enseignant.prenom} (${enseignant.grade})`}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              required
                              value={
                                selectedIds[emplacement.id_emplacement]
                                  ?.id_enseignant_secondaire || ""
                              }
                              onChange={(e) =>
                                handleSelectChange(
                                  e,
                                  emplacement.id_emplacement,
                                  "id_enseignant_secondaire"
                                )
                              }
                            >
                              <option value="">
                                Sélectionnez un enseignant
                              </option>
                              {enseignants.map(
                                (enseignant) =>
                                  selectedIds[emplacement.id_emplacement]
                                    .id_enseignant_secondaire ===
                                    enseignant.id_enseignant && (
                                    <option
                                      key={enseignant.id_enseignant}
                                      value={enseignant.id_enseignant}
                                    >
                                      {`${enseignant.nom} ${enseignant.prenom} (${enseignant.grade})`}
                                    </option>
                                  )
                              )}

                              {notSelectedenseignants.map((enseignant) => (
                                <option
                                  key={enseignant.id_enseignant}
                                  value={enseignant.id_enseignant}
                                >
                                  {`${enseignant.nom} ${enseignant.prenom} (${enseignant.grade})`}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <div className="col-12" onClick={handleSubmit}>
                  <button className="btn btn-primary" type="submit">
                    Valider l'affectations
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
              className="btn btn-primary"
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
