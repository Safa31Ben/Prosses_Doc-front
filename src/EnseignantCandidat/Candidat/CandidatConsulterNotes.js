import React, { useState, useEffect } from "react";
import CandidatAPI from "../../APIs/EnseignantCandidatAPIs/CandidatAPI";

import { Main } from "../../components/Main";

export const CandidatConsulterNotes = () => {
  const [notes, setNotes] = useState(null);
  const [display, setDisplay] = useState(false);
  const userId = parseInt(localStorage.getItem("id"), 10);

  useEffect(() => {
    getNotes(userId);
  }, []);

  const getNotes = async (id) => {
    const data = await CandidatAPI.consulterListeNotes(id);
    setNotes(data);
  };

  const submitReclamation = async (data) => {
    await CandidatAPI.faireReclamation(data);
  };

  const reclamationForm = () => {
    display ? setDisplay(false) : setDisplay(true);
  };

  return (
    <Main>
      <div className="pagetitle">
        <h1>Consulter Notes</h1>
      </div>
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                {notes &&
                  (notes.etat ? (
                    <div className="container">
                      <section className="section d-flex align-items-center justify-content-center">
                        <h1 className="text-center p-4">{notes.etat}</h1>
                      </section>
                    </div>
                  ) : (
                    <>
                      <h5 className="card-title">Liste des notes </h5>
                      <table className="table datatable">
                        <thead>
                          <tr>
                            <th scope="col">Note de sujet 1</th>
                            <th scope="col">Note de sujet 2</th>
                            <th scope="col">Moyenne</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{notes.note_sujet1}</td>
                            <td>{notes.note_sujet2}</td>
                            <td>{notes.moyenne}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="col-12">
                        <button
                          className="btn btn-primary"
                          type="submit"
                          onClick={() => reclamationForm()}
                        >
                          Faire reclamation
                        </button>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {display && (
        <ReclamationForm
          ReplayForm={reclamationForm}
          ReplayFormTite={"Reclamation"}
          submitReplay={submitReclamation}
        />
      )}
    </Main>
  );
};

export const ReclamationForm = ({
  ReplayForm,
  ReplayFormTite,
  submitReplay,
}) => {
  const [replay, setReplay] = useState(null);

  const Replay = () => {
    const userId = parseInt(localStorage.getItem("id"), 10);
    const data = { id_candidat: userId, contenu: replay };
    submitReplay(data);
    ReplayForm();
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
              {ReplayFormTite}
            </h4>
          </div>
          <div className="modal-body">
            <textarea
              className="form-control"
              id="Replay"
              rows="8"
              value={replay ? replay : ""}
              onChange={(e) => setReplay(e.target.value)}
              placeholder="Remplir les informations du réclamation ..."
            ></textarea>

            <div className="modal-footer text-center">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={ReplayForm}
              >
                Fermer
              </button>
              <button
                type="reset"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => setReplay("")}
              >
                Réinitialiser
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => Replay()}
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
