import React, { useState } from "react";
import GestionAPI from "../APIs/GestionAPIs/GestionAPI";
import { Main } from "../components/Main";
import Papa from "papaparse";

export const AjouterCandidats = () => {
  const [csvData, setCsvData] = useState(null);
  const [display, setDisplay] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rows = csvData.slice(1);
    rows.map((row) => {
      if (row.length > 1) {
        const dateParts = row[3].split("/");
        const date = `${dateParts[2]}-${dateParts[0].padStart(
          2,
          "0"
        )}-${dateParts[1].padStart(2, "0")}`;
        const formattedDate = date.replaceAll("-", "");
        const password = formattedDate;
        const username = `${row[2].replaceAll(" ", "")}${formattedDate}`;
        const data = {
          type: "candidat",
          username: username,
          email: row[0],
          nom: row[1],
          prenom: row[2],
          date_naissance: date,
          password: password,
          universite: row[4],
          faculte: row[5],
          specialite: row[6],
        };
        ajouterCandidat(data);
      }
    });
    setCsvData(null);
    setDisplay(true);
  };

  const ajouterCandidat = async (data) => {
    await GestionAPI.addUser(data);
  };

  const handleCSVUpload = (data) => {
    setCsvData(data);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvString = event.target.result;
      const results = Papa.parse(csvString);
      const data = results?.data || [];
      handleCSVUpload(data);
    };
    reader.readAsText(file);
  };

  return (
    <Main>
      <div className="pagetitle">
        <h1> Ajouter les candidats </h1>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              {display && (
                <div className="alert alert-success m-3" role="alert">
                  Les candidats sont ajoutées avec succès
                </div>
              )}
              <div className="card-body">
                <h5 className="card-title">Télécharger le fichier CSV qui contient les informations des candidats</h5>
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <label className="col-md-5 col-lg-4 col-form-label">
                    Sélectionnez le fichier CSV
                    </label>
                    <div className="col-md-7 col-lg-8">
                      <input
                        type="file"
                        id="csv-upload"
                        accept=".csv"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary mx-1">
                      Ajouter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};
