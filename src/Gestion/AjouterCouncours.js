import React, { useState } from "react";
import GestionAPI from "../APIs/GestionAPIs/GestionAPI";
import { Main } from "../components/Main";

export const AjouterCouncours = () => {
  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    date: getTomorrowDate(),
    annee_concours: new Date().getFullYear(),
    sujets: [
      {
        description: "",
        type: false,
      },
      {
        description: "",
        type: true,
      },
    ],
  });
  const [displayConfirmation, setDisplayConfirmation] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "sujets") {
      const index = e.target.id === "sujet0" ? 0 : 1;
      const updatedSujets = [...formData.sujets];
      updatedSujets[index].description = value;

      setFormData((prevData) => ({
        ...prevData,
        sujets: updatedSujets,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const ajouterCouncours = async (data) => {
    console.log(data);
    const response = await GestionAPI.addConcoursAndSujet(data);
    console.log(response);
    if (response) {
      response.ok
        ? setDisplayConfirmation("Le councours est ajouté avec succès")
        : setDisplayConfirmation("Le councours n'est pas ajouté avec succès");
      setFormData({
        date: getTomorrowDate(),
        annee_concours: new Date().getFullYear(),
        sujets: [
          {
            description: "",
            type: false,
          },
          {
            description: "",
            type: true,
          },
        ],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.values(formData).some(
        (value) =>
          Array.isArray(value) &&
          value.some((sujet) => sujet.description === "")
      )
    ) {
      setDisplayConfirmation("Veuillez remplir tous les champs.");
    } else {
      ajouterCouncours(formData);
    }
  };

  const handleConfirmationClose = () => {
    setDisplayConfirmation(null);
  };

  return (
    <Main>
      <div className="pagetitle">
        <h1>Ajouter une concours et ses sujets</h1>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title"> </h5>

                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-6">
                    <label>La date de concours:</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="form-control"
                      min={getTomorrowDate()}
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Année de concours:</label>
                    <input
                      type="number"
                      id="annee_concours"
                      name="annee_concours"
                      value={formData.annee_concours}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Année de concours"
                      min={new Date().getFullYear()}
                      max={new Date().getFullYear() + 1}
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Description de sujet de spécialité:</label>
                    <textarea
                      className="form-control"
                      id="sujet1"
                      name="sujets"
                      style={{ height: "200px" }}
                      value={formData.sujets[1].description}
                      onChange={handleInputChange}
                      placeholder="Description de sujet de spécialité"
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Description de sujet de tronc commun:</label>
                    <textarea
                      className="form-control"
                      id="sujet0"
                      name="sujets"
                      style={{ height: "200px" }}
                      value={formData.sujets[0].description}
                      onChange={handleInputChange}
                      placeholder="Description de sujet de tronc commun"
                    />
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Ajouter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {displayConfirmation && (
        <Confirmation
          displayConfirmation={handleConfirmationClose}
          confirmationText={displayConfirmation}
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
