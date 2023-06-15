import React, { useState, useEffect } from "react";
import EnseignantAPI from "../../APIs/EnseignantCandidatAPIs/EnseignantAPI";

import { Main } from "../../components/Main";

export const ConsulterEmplacement = () => {
  const [emplacement, setEmplacement] = useState(null);
  const userId = parseInt(localStorage.getItem("id"), 10);

  useEffect(() => {
    getEmplacement(userId);
  }, []);

  const getEmplacement = async (id) => {
    const data = await EnseignantAPI.ConsulterEmplacement(id);
    setEmplacement(data);
  };
  
  return (
    <Main>
      <div className="pagetitle">
        <h1> Enseignant Consulter Emplacement</h1>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              {emplacement &&
                (emplacement.Etat ? (
                  <div className="card mt-3 py-5">
                    <div className="container">
                      <section className="section d-flex align-items-center justify-content-center">
                        <h1 className="text-center px-4">
                          {emplacement.Etat}
                        </h1>
                      </section>
                    </div>
                  </div>
                ) : (
                  <div className="card">
                    <div className="card-body">
                      {emplacement.is_principal ? (
                        <h4 className="card-title">Surveillant principale</h4>
                      ) : (
                        <h4 className="card-title">Surveillant secondaire</h4>
                      )}

                      <h4 className="card-title">
                        Universite:{" "}
                        <span className="text-dark fs-6">
                          {emplacement.emplacement[0].universite}
                        </span>
                      </h4>
                      <h4 className="card-title">
                        Faculte:{" "}
                        <span className="text-dark fs-6">
                          {emplacement.emplacement[0].faculte}
                        </span>
                      </h4>
                      <h4 className="card-title">
                        Salle:{" "}
                        <span className="text-dark fs-6">
                          {emplacement.emplacement[0].salle}
                        </span>
                      </h4>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </Main>
  );
};
