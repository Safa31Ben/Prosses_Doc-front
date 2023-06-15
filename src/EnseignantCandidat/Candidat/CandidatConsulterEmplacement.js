import React, { useState, useEffect } from "react";
import CandidatAPI from "../../APIs/EnseignantCandidatAPIs/CandidatAPI";

import { Main } from "../../components/Main";

export const CandidatConsulterEmplacement = () => {
  const [emplacement, setEmplacement] = useState(null);
  const userId = parseInt(localStorage.getItem('id'), 10);

  useEffect(() => {
    getEmplacement(userId);
  }, []);
  const getEmplacement = async (id) => {
    const data = await CandidatAPI.consulterEmplacement(id);
    setEmplacement(data);
  };

  return (
    <Main>
      <div className="pagetitle">
        <h1> Candidat Consulter Emplacement</h1>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              {emplacement &&
                (emplacement.candidat_emplacement ? (
                  <div className="card py-5">
                    <div className="container">
                      <section className="section d-flex align-items-center justify-content-center">
                        <h1 className="text-center px-4">
                          {emplacement.candidat_emplacement}
                        </h1>
                      </section>
                    </div>
                  </div>
                ) : (
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Wilaya: </h5>
                      {emplacement[0].wilaya}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Daira: </h5>
                      {emplacement[0].daira}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Commune: </h5>
                      {emplacement[0].commune}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Universite: </h5>
                      {emplacement[0].universite}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Faculte: </h5>
                      {emplacement[0].faculte}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Salle: </h5>
                      {emplacement[0].salle}
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
