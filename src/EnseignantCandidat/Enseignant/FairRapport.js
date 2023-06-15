import React, { useState } from "react";
import EnseignantAPI from "../../APIs/EnseignantCandidatAPIs/EnseignantAPI";
import { Main } from "../../components/Main";

export const FairRapport = () => {
  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [display, setDisplay] = useState(null);
  const userId = parseInt(localStorage.getItem("id"), 10);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (titre.trim() === "" || contenu.trim() === "") {
      setDisplay("Le titre et le contenu ne peuvent pas être vides");
      return;
    }

    const data = {
      titre,
      contenu,
    };

    const response = await EnseignantAPI.FaireRapport(userId, data);
    setDisplay(response.Etat);
    setTitre("");
    setContenu("");
  };

  const handleReset = () => {
    setTitre("");
    setContenu("");
  };

  const displayConfirmation = () => {
    setDisplay(display ? null : "");
  };

  return (
    <Main>
      <div className="pagetitle">
        <h1>Fair Rapport</h1>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Remplissez les informations du rapport
                </h5>

                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Titre"
                      value={titre}
                      onChange={(e) => setTitre(e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Contenu"
                        id="floatingTextarea"
                        style={{ height: "200px" }}
                        value={contenu}
                        onChange={(e) => setContenu(e.target.value)}
                      ></textarea>
                      <label htmlFor="floatingTextarea">Contenu</label>
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
