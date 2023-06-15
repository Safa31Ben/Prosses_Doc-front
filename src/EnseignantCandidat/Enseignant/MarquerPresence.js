import React, { useState, useEffect } from "react";
import EnseignantAPI from "../../APIs/EnseignantCandidatAPIs/EnseignantAPI";
import { Main } from "../../components/Main";

export const MarquerPresence = () => {
  const [candidats, setCandidats] = useState([]);
  const [display, setDisplay] = useState(null);
  const userId = parseInt(localStorage.getItem("id"), 10);

  useEffect(() => {
    const fetchData = async () => {
      const response = await EnseignantAPI.ConsulterCandidatList(userId);
      setCandidats(response);
    };

    fetchData();
  }, []);

  const handlePresenceSubmit = async () => {
    const presenceData = candidats.map((candidat) => ({
      id_candidat: candidat.id,
      etat_presence: document.getElementById(`gridCheck${candidat.id}`).checked,
    }));

    const response = await EnseignantAPI.MarquerPresence(userId, presenceData);
    setDisplay(response);
  };

  return (
    <Main>
      <div className="pagetitle">
        <h1>Marquer Présence</h1>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            {display ? (
              <div className="card mt-3 py-5">
                <div className="container">
                  <section className="section d-flex align-items-center justify-content-center">
                    <h1 className="text-center px-4">{display.Etat}</h1>
                  </section>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Liste des candidats</h5>
                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Prénom</th>
                        <th scope="col">Date de naissance</th>
                        <th scope="col">Présence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidats.map((candidat) => (
                        <tr key={candidat.id}>
                          <th scope="row">{candidat.id}</th>
                          <td>{candidat.nom}</td>
                          <td>{candidat.prenom}</td>
                          <td>{candidat.date_naissance}</td>
                          <td>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`gridCheck${candidat.id}`}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="col-12">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={handlePresenceSubmit}
                    >
                      Valider Présence
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Main>
  );
};
