import React, { useState, useEffect } from "react";
import EnseignantAPI from "../../APIs/EnseignantCandidatAPIs/EnseignantAPI";
import { Main } from "../../components/Main";

export const SaisirNotes = () => {
  const [candidats, setCandidats] = useState(null);
  const [display, setDisplay] = useState(null);
  const userId = parseInt(localStorage.getItem("id"), 10);

  useEffect(() => {
    getCandidats(userId);
  }, []);

  const getCandidats = async (id) => {
    const data = await EnseignantAPI.ConsulterCandidatNoteList(id);
    setCandidats(data);
  };

  const handleNoteChange = (index, value) => {
    const updatedData = [...candidats];
    updatedData[index].note = value;
    setCandidats(updatedData);
  };

  const handleSubmit = async () => {
    const newData = candidats.map((item) => ({
      ...item,
      etat: "pas valide",
    }));
    const data = await EnseignantAPI.SaisirNotes(userId, newData);
    setDisplay(data.Etat);
  };

  const displayConfirmation = () => {
    display ? setDisplay(null) : setDisplay();
  };

  return (
    <Main>
      <div className="pagetitle">
        <h1>Saisir Notes </h1>
      </div>
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Liste des candidats </h5>
                <table className="table datatable">
                  <thead>
                    <tr>
                      <th scope="col">Code Anonyme Candidat</th>
                      <th scope="col">Numéro de Correction</th>
                      <th scope="col">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidats &&
                      candidats.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{item.code_anonyme_candidat}</th>
                          <td>{item.numero_de_correction}</td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              value={item.note}
                              min={0}
                              max={20}
                              onChange={(e) =>
                                handleNoteChange(index, e.target.value)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Valider la saisit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {display && (
        <Confirmation
          displayConfirmation={displayConfirmation}
          confirmationText={display}
        />
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
