import React, { useState, useEffect } from "react";
import ViceDoyenAPI from "../../APIs/AdministrativeStaffAPIs/ViceDoyenAPI";

import { Main } from "../../components/Main";

export const ConculterRessourcesHumains = () => {
  const [enseignants, setEnseignants] = useState(null);
  const [candidats, setCandidats] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    consulterRessourcesHumains();
  }, []);

  const consulterRessourcesHumains = async () => {
    try {
      const data = await ViceDoyenAPI.consulterRessourcesHumains();
      const { enseignants, candidats } = data;
      setEnseignants(enseignants);
      setCandidats(candidats);

      setDataLoaded(true);
    } catch (error) {
      console.error("Failed to fetch resource data:", error);
    }
  };

  return (
    <Main>
      {dataLoaded && (
        <>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Liste des enseignants </h5>
              <table className="table datatable">
                <thead>
                  <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Nom et prénom</th>
                    <th scope="col">Date de naissance</th>
                    <th scope="col">Grade</th>
                    <th scope="col">Faculté</th>
                    <th scope="col">Département</th>
                    <th scope="col">Spécialité</th>
                  </tr>
                </thead>
                <tbody>
                  {enseignants &&
                    enseignants.map((enseignant, index) => (
                      <tr key={`enseignant-${index}`}>
                        <td>{enseignant.email}</td>
                        <td>
                          {enseignant.nom} {enseignant.prenom}
                        </td>
                        <td>{enseignant.date_naissance}</td>
                        <td>{enseignant.enseignant__grade}</td>
                        <td>{enseignant.enseignant__faculte}</td>
                        <td>{enseignant.enseignant__depertement}</td>
                        <td>{enseignant.enseignant__specialite}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Liste des candidats </h5>
              <table className="table datatable">
                <thead>
                  <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Nom et prénom</th>
                    <th scope="col">Date de naissance</th>
                    <th scope="col">Spécialité</th>
                    <th scope="col">Université</th>
                    <th scope="col">Moyenne</th>
                    <th scope="col">Année Concours</th>
                  </tr>
                </thead>
                <tbody>
                  {candidats &&
                    candidats.map((candidat, index) => (
                      <tr key={`candidat-${index}`}>
                        <td>{candidat.email}</td>
                        <td>
                          {candidat.nom} {candidat.prenom}
                        </td>
                        <td>{candidat.date_naissance}</td>
                        <td>{candidat.candidat__universite}</td>
                        <td>{candidat.candidat__specailite}</td>
                        <td>{candidat.candidat__moyenne}</td>
                        <td>
                          {candidat.candidat__id_concours__annee_concours}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </Main>
  );
};
