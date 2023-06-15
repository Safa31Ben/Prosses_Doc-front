import React, { useState, useEffect } from "react";
import PresidentCFDAPI from "../../APIs/AdministrativeStaffAPIs/PresidentCFDAPI";
import { Main } from "../../components/Main";

export const ConsulterRapports = () => {
  const [rapports, setRapports] = useState(null);

  useEffect(() => {
    getReclamationList();
  }, []);

  const getReclamationList = async () => {
    const data = await PresidentCFDAPI.consulterRapportsDeSaisir();
    setRapports(data);
  };

  return (
    <Main>
      <div className="pagetitle">
        <h1>Consulter les rapport de saisir</h1>
      </div>
      {rapports &&
        (rapports.rapports ? (
          <div className="container">
            <section className="section d-flex align-items-center justify-content-center">
              <div className="card pt-4 pb-2">
                <h1 className="text-center px-4">{rapports.rapports}</h1>
              </div>
            </section>
          </div>
        ) : (
          <div>
            <RapportList rapports={rapports} />
          </div>
        ))}
    </Main>
  );
};

const RapportList = ({ rapports }) => {
  return (
    <section className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Rapports List</h5>
              <div className="accordion" id="accordionExample">
                {rapports.map((rapport) => (
                  <div key={rapport.id_rapport} className="accordion-item">
                    <h2
                      className="accordion-header"
                      id={`heading${rapport.id_rapport}`}
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${rapport.id_rapport}`}
                        aria-expanded="true"
                        aria-controls={`collapse${rapport.id_rapport}`}
                      >
                        {rapport.titre}
                      </button>
                    </h2>
                    <div
                      id={`collapse${rapport.id_rapport}`}
                      className="accordion-collapse collapse show"
                      aria-labelledby={`heading${rapport.id_rapport}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <p>
                          <strong>Enseignant:</strong> {rapport.enseignant_nom}{" "}
                          {rapport.enseignant_prenom}
                        </p>
                        <p>
                          <strong>Sujet de type:</strong>{" "}
                          {rapport.id_sujet__type
                            ? "Spécialité"
                            : "Tronc commun"}
                        </p>
                        <p>
                          <strong>Description:</strong>{" "}
                          {rapport.id_sujet__description}
                        </p>
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(rapport.date).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Contenu:</strong> {rapport.contenu}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
