import React, { useState, useEffect } from "react";
import PresidentCFDAPI from "../../APIs/AdministrativeStaffAPIs/PresidentCFDAPI";
import { Main } from "../../components/Main";

export const AffecterSujetTheses = () => {
  const [state, setState] = useState({
    candidats: [],
    loading: true,
  });
  const userId = parseInt(localStorage.getItem('id'), 10);

  useEffect(() => {
    const fetchData = async () => {
      const data = await PresidentCFDAPI.AffecterSujetThese(userId);
      setState({
        candidats: data.candidats,
        loading: false,
      });
    };

    fetchData();
  }, []);

  const { candidats, loading } = state;

  return (
    <Main>
      <div className="pagetitle">
        <h1>Affectation des sujet de thèse</h1>
      </div>
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Les informations des candidats réussite{" "}
                </h5>

                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <CandidatsList candidats={candidats} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};

const CandidatsList = ({ candidats }) => {
  return (
    <table className="table datatable">
      <thead>
        <tr>
          <th scope="col">Sujet</th>
          <th scope="col">Description</th>
          <th scope="col">Nom</th>
          <th scope="col">Prénom</th>
          <th scope="col">Université</th>
          <th scope="col">Faculté</th>
          <th scope="col">Spécialité</th>
          <th scope="col">Moyenne</th>
        </tr>
      </thead>
      <tbody>
        {candidats.map((candidat, index) => {
          const {
            nom,
            prenom,
            sujet,
            description,
            universite,
            faculte,
            specailite,
            moyenne,
          } = candidat[0];

          return (
            <tr key={index}>
              <th scope="row">{sujet}</th>
              <td>{description}</td>
              <td>{nom}</td>
              <td>{prenom}</td>
              <td>{universite}</td>
              <td>{faculte}</td>
              <td>{specailite}</td>
              <td>{moyenne}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
