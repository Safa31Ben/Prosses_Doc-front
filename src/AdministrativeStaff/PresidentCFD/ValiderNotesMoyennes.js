import React, { useState, useEffect } from "react";
import PresidentCFDAPI from "../../APIs/AdministrativeStaffAPIs/PresidentCFDAPI";
import { Main } from "../../components/Main";

export const ValiderNotesMoyennes = () => {
  const [data, setData] = useState();
  const userId = parseInt(localStorage.getItem('id'), 10);

  useEffect(() => {
    validerNotesMoyenne(userId);
  }, []);

  const validerNotesMoyenne = async (id) => {
    const response = await PresidentCFDAPI.ValiderNotesMoyenne(id);
    setData(response.Etat);
  };

  return (
    <Main>
      <div className="pagetitle">
        <h1>Validation final des notes et le calcul des moyennes</h1>
      </div>
      {data && (
        <div className="container">
          <section className="section d-flex align-items-center justify-content-center">
            <div className="card pt-4 pb-2">
              <h1 className="text-center px-4">{data}</h1>
            </div>
          </section>
        </div>
      )}
    </Main>
  );
};
