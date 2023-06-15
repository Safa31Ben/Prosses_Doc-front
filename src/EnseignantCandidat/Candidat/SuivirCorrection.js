import React, { useState, useEffect } from "react";
import CandidatAPI from "../../APIs/EnseignantCandidatAPIs/CandidatAPI";

import { Main } from "../../components/Main";

export const SuivirCorrection = () => {
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState("");
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState(null);
  const [candidats, setCandidats] = useState(null);
  const userId = parseInt(localStorage.getItem("id"), 10);

  const suivirCorrection = async () => {
    try {
      const jsonData = await CandidatAPI.suiviCorrection(userId);
      setData(jsonData);

      if (jsonData.pasEncoreCorrige) {
        setPhase("pasEncoreCorrige");
      } else if (jsonData.pasEncoreValide) {
        setPhase("pasEncoreValide");
      } else if (jsonData.valide) {
        setPhase("valide");
      } else if (jsonData.candidats) {
        setCandidats(jsonData.candidats.reverse())
        setPhase("candidats");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    suivirCorrection();
  }, [loading]);

  useEffect(() => {
    switch (phase) {
      case "pasEncoreCorrige":
        setProgress(25);
        break;
      case "pasEncoreValide":
        setProgress(50);
        break;
      case "valide":
        setProgress(75);
        break;
      case "candidats":
        setProgress(100);
        break;
      default:
        setProgress(0);
        break;
    }
  }, [phase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Main>
      <div className="pagetitle">
        <h1> Suivir Correction</h1>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="progress-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="phase-marker" style={{ left: `${25}%` }}>
                        Pas encore corrigé
                      </div>
                      <div className="point" style={{ left: `${25}%` }}></div>

                      <div className="phase-marker" style={{ left: `${50}%` }}>
                        Pas encore validé
                      </div>
                      <div className="point" style={{ left: `${50}%` }}></div>

                      <div className="phase-marker" style={{ left: `${75}%` }}>
                        Validé
                      </div>
                      <div className="point" style={{ left: `${75}%` }}></div>

                      <div className="phase-marker" style={{ left: `${100}%` }}>
                        Résultat final
                      </div>
                      <div className="point" style={{ left: `${100}%` }}></div>
                    </div>
                  </div>
                  {data && (
                    <div>
                      {phase === "valide" && (
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">Moyenne: </h5>
                            {data.valide.moyenne}
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">Note Sujet 1: </h5>
                            {data.valide.note_sujet1}
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">Note Sujet 2: </h5>
                            {data.valide.note_sujet2}
                          </div>
                        </div>
                      )}
                      {phase === "candidats" && (
                        <div>
                          <h5 className="card-title">
                            La liste finale avec le classement
                          </h5>
                          <table className="table datatable">
                            <thead>
                              <tr>
                                <th scope="col">N°</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Prénom</th>
                                <th scope="col">Résultat</th>
                              </tr>
                            </thead>
                            <tbody>
                              {candidats.map((candidat, index) => (
                                <tr key={candidat.id_candidat_id}>
                                  <th scope="row">{index + 1}</th>
                                  <td>{candidat.nom}</td>
                                  <td>{candidat.prenom}</td>
                                  <td>{candidat.resultat}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {data.Etat && (
                        <div className="card py-5">
                          <div className="container">
                            <section className="section d-flex align-items-center justify-content-center">
                              <h1 className="text-center px-4">{data.Etat}</h1>
                            </section>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Main>
  );
};
