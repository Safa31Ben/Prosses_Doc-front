import React, { useState, useEffect } from "react";
import PresidentCFDAPI from "../../APIs/AdministrativeStaffAPIs/PresidentCFDAPI";
import { Main } from "../../components/Main";

export const Reclamations = () => {
  const [reclamation, setReclamation] = useState(null);
  const [displayTable, setDisplayTable] = useState(false);

  useEffect(() => {
    getReclamationList();
  }, [displayTable]);

  const getReclamationList = async () => {
    const data = await PresidentCFDAPI.ConsulterReclamations();
    setReclamation(data);
    setDisplayTable(true);
  };

  return (
    <Main>
      <div className="container-fluid">
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Liste des réclamations</h5>

                  <div className="accordion" id="accordionExample">
                    { displayTable ? (
                     reclamation.map((r) => (
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id={`heading${r.id_reclamation}`}
                          >
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse${r.id_reclamation}`}
                              aria-expanded="false"
                              aria-controls={`collapse${r.id_reclamation}`}
                            >
                              Réclamation N° {r.id_reclamation}
                            </button>
                          </h2>
                          <div
                            id={`collapse${r.id_reclamation}`}
                            className="accordion-collapse collapse show"
                            aria-labelledby={`heading${r.id_reclamation}`}
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <p>{new Date(r.date).toLocaleString()}</p>
                              {r.contenu}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="container p-3 my-3 table-con">
                        <h2 className="d-flex justify-content-center">
                          Pas de réclamation{" "}
                        </h2>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Main>
  );
};
