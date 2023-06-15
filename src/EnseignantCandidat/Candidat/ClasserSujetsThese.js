import React, { useState, useEffect } from "react";
import CandidatAPI from "../../APIs/EnseignantCandidatAPIs/CandidatAPI";

import { Main } from "../../components/Main";

export const ClasserSujetsThese = () => {
  const [thesis, setThesis] = useState(null);
  const [display, setDisplay] = useState(null);
  const [selectedTheses, setSelectedTheses] = useState([]);

  useEffect(() => {
    getThesisList();
  }, []);

  const getThesisList = async () => {
    const data = await CandidatAPI.consulterListeThese();
    setThesis(data);
  };

  const classerSujetThese = async (id, data) => {
    const response = await CandidatAPI.classerSujetThese(id, data);
    setDisplay(response.choix);
  };

  const handleOrderChange = (e, theseId) => {
    const order = parseInt(e.target.value);
    const selectedThesisIndex = selectedTheses.findIndex(
      (thesis) => thesis.id_these === theseId
    );

    const userId = parseInt(localStorage.getItem('id'), 10);
    if (order === 0) {
      if (selectedThesisIndex !== -1) {
        setSelectedTheses((prevState) =>
          prevState.filter((thesis) => thesis.id_these !== theseId)
        );
      }
    } else {
      const updatedThesis = {
        id_these: theseId,
        order,
        id_candidat: userId,
      };

      if (selectedThesisIndex !== -1) {
        setSelectedTheses((prevState) =>
          prevState.map((thesis) =>
            thesis.id_these === theseId ? updatedThesis : thesis
          )
        );
      } else {
        setSelectedTheses((prevState) => [...prevState, updatedThesis]);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedTheses.length < 3) {
      setDisplay("Vous devez classer la totalité des thèses.");
    } else {
      const orderSet = new Set();
      let hasDuplicateOrder = false;

      for (const item of selectedTheses) {
        if (orderSet.has(item.order)) {
          hasDuplicateOrder = true;
          break;
        }
        orderSet.add(item.order);
      }

      if (hasDuplicateOrder) {
        setDisplay("Il y a des theses avec la même valeur de classification.");
      } else {
        const userId = parseInt(localStorage.getItem("id"), 10);
        classerSujetThese(userId, selectedTheses);
      }
    }
  };

  const displayConfirmation = () => {
    display ? setDisplay(null) : setDisplay();
  };

  return (
    <Main>
      <div className="pagetitle">
        <h1>Classer Sujets These</h1>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            {thesis &&
              (thesis.theses ? (
                <div className="card py-5">
                  <div className="container">
                    <section className="section d-flex align-items-center justify-content-center">
                      <h1 className="text-center px-4">{thesis.theses}</h1>
                    </section>
                  </div>
                </div>
              ) : (
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Classez les theses</h5>
                    {thesis.map((these) => (
                      <div className="row mb-3" key={these.id_these}>
                        <label className="col-sm-8 col-form-label">
                          Sujet : {these.sujet}
                        </label>
                        <label className="col-sm-8 col-form-label">
                          Description : {these.description}
                        </label>
                        <div className="col-sm-4">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={(e) =>
                              handleOrderChange(e, these.id_these)
                            }
                          >
                            <option value="0">Ordre</option>
                            <option value="1">1er choix</option>
                            <option value="2">2ème choix</option>
                            <option value="3">3ème choix</option>
                          </select>
                        </div>
                      </div>
                    ))}

                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={(e) => handleSubmit()}
                    >
                      Valider
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      {display && (
        <Confirmation
          displayConfirmation={displayConfirmation}
          confirmationText={display}
        />
      )}
    </Main>
  );
};

const Confirmation = ({ displayConfirmation, confirmationText }) => {
  const close = () => {
    displayConfirmation();
  };
  return (
    <div
      className="modal fade show d-block"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-sm"
        role="dialog"
      >
        <div className="modal-content">
          <div className="modal-body">
            <p className="d-flex px-3 justify-content-center fs-5">
              {confirmationText}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={() => close()}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
