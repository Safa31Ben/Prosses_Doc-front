import React, { useState } from "react";
import GestionAPI from "../APIs/GestionAPIs/GestionAPI";

import { Main } from "../components/Main";

const wilayaOptions = [
  { value: 1, label: "Adrar" },
  { value: 2, label: "Chlef" },
  { value: 3, label: "Laghouat" },
  { value: 4, label: "Oum El Bouaghi" },
  { value: 5, label: "Batna" },
  { value: 6, label: "Béjaïa" },
  { value: 7, label: "Biskra" },
  { value: 8, label: "Bechar" },
  { value: 9, label: "Blida" },
  { value: 10, label: "Bouira" },
  { value: 11, label: "Tamanrasset" },
  { value: 12, label: "Tbessa" },
  { value: 13, label: "Tlemcen" },
  { value: 14, label: "Tiaret" },
  { value: 15, label: "Tizi Ouzou" },
  { value: 16, label: "Alger" },
  { value: 17, label: "Djelfa" },
  { value: 18, label: "Jijel" },
  { value: 19, label: "Setif" },
  { value: 20, label: "Saida" },
  { value: 21, label: "Skikda" },
  { value: 22, label: "Sidi Bel Abbes" },
  { value: 23, label: "Annaba" },
  { value: 24, label: "Guelma" },
  { value: 25, label: "Constantine" },
  { value: 26, label: "Medea" },
  { value: 27, label: "Mostaganem" },
  { value: 28, label: "M'Sila" },
  { value: 29, label: "Mascara" },
  { value: 30, label: "Ouargla" },
  { value: 31, label: "Oran" },
  { value: 32, label: "El Bayadh" },
  { value: 33, label: "Illizi" },
  { value: 34, label: "Bordj Bou Arreridj" },
  { value: 35, label: "Boumerdes" },
  { value: 36, label: "El Tarf" },
  { value: 37, label: "Tindouf" },
  { value: 38, label: "Tissemsilt" },
  { value: 39, label: "El Oued" },
  { value: 40, label: "Khenchela" },
  { value: 41, label: "Souk Ahras" },
  { value: 42, label: "Tipaza" },
  { value: 43, label: "Mila" },
  { value: 44, label: "Ain Defla" },
  { value: 45, label: "Naama" },
  { value: 46, label: "Ain Temouchent" },
  { value: 47, label: "Ghardaia" },
  { value: 48, label: "Relizane" },
  { value: 49, label: "Timimoun" },
  { value: 50, label: "Bordj Baji Mokhtar" },
  { value: 51, label: "Ouled Djellal" },
  { value: 52, label: "Béni Abbès" },
  { value: 53, label: "In Salah" },
  { value: 54, label: "In Guezzam" },
  { value: 55, label: "Touggourt" },
  { value: 56, label: "Djanet" },
  { value: 57, label: "El M'ghair" },
  { value: 58, label: "El Menia" },
];

export const AjouterEmplacement = () => {
  const [formData, setFormData] = useState({
    wilaya: wilayaOptions[0].value,
    daira: "",
    commune: "",
    universite: "",
    faculte: "",
    salle: "",
    capacite: 0,
  });

  const [displayConfirmation, setDisplayConfirmation] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const ajouterEmplacement = async (data) => {
    const response = await GestionAPI.addEmplacement(data);
    response && response.ok
      ? setDisplayConfirmation("L'emplacement est ajouté avec succès")
      : setDisplayConfirmation("L'emplacement n'est pas ajouté avec succès");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.values(formData).some((value) => value === "") ||
      formData.capacite === 0
    ) {
      setDisplayConfirmation(
        "Veuillez remplir tous les champs et vous assurer que la capacité est supérieure à 0."
      );
    } else {
      ajouterEmplacement(formData);
      setFormData({
        wilaya: wilayaOptions[0].value,
        daira: "",
        commune: "",
        universite: "",
        faculte: "",
        salle: "",
        capacite: 0,
      });
    }
  };

  const handleConfirmationClose = () => {
    setDisplayConfirmation(null);
  };

  return (
    <Main>
      <div className="pagetitle">
        <h1>Ajouter une emplacement </h1>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title"> </h5>

                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-6">
                    <label htmlFor="wilaya">Wilaya:</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="wilaya"
                      name="wilaya"
                      value={formData.wilaya}
                      onChange={handleInputChange}
                    >
                      {wilayaOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="daira">Daira:</label>
                    <input
                      type="text"
                      id="daira"
                      name="daira"
                      value={formData.daira}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Daira"
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="commune">Commune:</label>
                    <input
                      type="text"
                      id="commune"
                      name="commune"
                      value={formData.commune}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Commune"
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="universite">Université:</label>
                    <input
                      type="text"
                      id="universite"
                      name="universite"
                      value={formData.universite}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Université"
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="faculte">Faculté:</label>
                    <input
                      type="text"
                      id="faculte"
                      name="faculte"
                      value={formData.faculte}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Faculté"
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="salle">Salle:</label>
                    <input
                      type="text"
                      id="salle"
                      name="salle"
                      value={formData.salle}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Salle"
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="capacite">Capacité:</label>
                    <input
                      type="number"
                      id="capacite"
                      name="capacite"
                      value={formData.capacite}
                      onChange={handleInputChange}
                      className="form-control"
                      min={0}
                      max={100}
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
