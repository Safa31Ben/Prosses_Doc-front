import React, { useState } from "react";
import EnseignantAPI from "../../APIs/EnseignantCandidatAPIs/EnseignantAPI";

import { Main } from "../../components/Main";

export const ProposerSujetThese = () => {
  const [display, setDisplay] = useState(null);
  const [displayMsg, setDisplayMsg] = useState(null);
  const userId = parseInt(localStorage.getItem("id"), 10);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sujet = document.getElementById("floatingName").value;
    const description = document.getElementById("floatingTextarea").value;

    if (sujet.trim() === "" || description.trim() === "") {
      setDisplayMsg("Le sujet et la description ne peuvent pas être vides");
      return;
    }
    const data = {
      sujet,
      description,
    };

    const response = await EnseignantAPI.PropositionSujetTheses(userId, data);
    setDisplay(response);
    document.getElementById("floatingName").value = "";
    document.getElementById("floatingTextarea").value = "";
  };

  const handleReset = () => {
    document.getElementById("floatingName").value = "";
    document.getElementById("floatingTextarea").value = "";
  };

  const displayConfirmation = () => {
    setDisplayMsg(displayMsg ? null : "");
  };

  return (
    <Main>
      <div className="pagetitle">
        <h1>Proposer Sujet Thèse</h1>
      </div>
      {display ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">ID thèse: </h5>
            {display.id_these}
          </div>
          <div className="card-body">
            <h5 className="card-title">Sujet: </h5>
            {display.sujet}
          </div>
          <div className="card-body">
            <h5 className="card-title">Description: </h5>
            {display.description}
          </div>
        </div>
      ) : (
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Les informations de thèse</h5>

                  <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingName"
                          placeholder="Sujet"
                        />
                        <label htmlFor="floatingName">Sujet</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Description"
                          id="floatingTextarea"
                          style={{ height: "150px" }}
                        ></textarea>
                        <label htmlFor="floatingTextarea">Description</label>
                      </div>
                    </div>

                    <div className="text-center">
                      <button type="submit" className="mx-1 btn btn-primary">
                        Envoyer
                      </button>
                      <button
                        type="reset"
                        className="mx-1 btn btn-secondary"
                        onClick={handleReset}
                      >
                        Réinitialiser
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {displayMsg && (
        <Confirmation
          displayConfirmation={displayConfirmation}
          confirmationText={displayMsg}
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
