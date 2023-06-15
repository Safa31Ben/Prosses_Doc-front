import React, { useState, useEffect } from "react";
import ViceDoyenAPI from "../../APIs/AdministrativeStaffAPIs/ViceDoyenAPI";
import { Main } from "../../components/Main";

export const GenererCodeAnonymes = () => {
  const [data, setData] = useState();

  useEffect(() => {
    generCodesAnonyme();
  }, []);

  const generCodesAnonyme = async () => {
    const response = await ViceDoyenAPI.GenerCodesAnonyme();
    setData(response.candidats);
  };

  return (
    <Main>
      <div className="container">
        <div className="pagetitle">
          <h1>Les candidats</h1>
        </div>
        <section className="section d-flex align-items-center justify-content-center">
          {data && (
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Liste des candidat </h5>
                    <table className="table datatable">
                      <thead>
                        <tr>
                          <th scope="col">ID candidat</th>
                          <th scope="col">Code anonyme</th>
                          <th scope="col">Nom et prénom</th>
                          <th scope="col">Date de naissance</th>
                          <th scope="col">Faculte</th>
                          <th scope="col">Spécialité</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((candidat, index) => (
                          <tr key={`candidat-${index}`}>
                            <td>{candidat.id_candidat}</td>
                            <td>{candidat.code_anonyme}</td>
                            <td>
                              {candidat.nom} {candidat.prenom}
                            </td>
                            <td>{candidat.date_naissance}</td>
                            <td>{candidat.faculte}</td>
                            <td>{candidat.specailite}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </Main>
  );
};
