export default class CandidatAPI {
  static consulterListeAnnonce() {
    return fetch(`http://127.0.0.1:8000/Enseignant_candidat/get-annonece/`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static consulterListeNotes(id) {
    return fetch(
      `http://127.0.0.1:8000/Enseignant_candidat/get-notes-con/${id}`
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static faireReclamation(data) {
    return fetch(
      `http://127.0.0.1:8000/Enseignant_candidat/faire_reclamation/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response)
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static consulterEmplacement(id) {
    return fetch(
      `http://127.0.0.1:8000/Enseignant_candidat/consulter_emplacement_con/${id}`
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static consulterListeThese() {
    return fetch(`http://127.0.0.1:8000/Enseignant_candidat/these_list/`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static classerSujetThese(id, data) {
    return fetch(
      `http://127.0.0.1:8000/Enseignant_candidat/post-these-ordre/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static suiviCorrection(id) {
    return fetch(
      `http://127.0.0.1:8000/Enseignant_candidat/suivi_correction/${id}`
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
}
