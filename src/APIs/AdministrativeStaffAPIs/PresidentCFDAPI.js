export default class PresidentCFDAPI {
  static ConsulterEnseignantsSujets(id) {
    return fetch(
      `http://127.0.0.1:8000/Administrative_staff/getEnseignantsEtSujet/${id}`
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static AffecterAuxEnsignantsSujet(id, data) {
    return fetch(
      `http://127.0.0.1:8000/Administrative_staff/setEnseignantsEtSujet/${id}`,
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

  static DisponibleEmplacementEnseignants(id) {
    return fetch(
      `http://127.0.0.1:8000/Administrative_staff/disponibleEmplacementEnseignants/${id}`
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static AffecterEmplacementEnseignantsCandidats(id, data) {
    return fetch(
      `http://127.0.0.1:8000/Administrative_staff/emplacementEnseignantsCandidats/${id}`,
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

  static AffecterSujetThese(id) {
    return fetch(
      `http://127.0.0.1:8000/Administrative_staff/affecterSujetThese/${id}`
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static consulterRapportsDeSaisir() {
    return fetch(
      `http://127.0.0.1:8000/Administrative_staff/getRapportsDeSaisir/`
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static ConsulterReclamations() {
    return fetch(
      `http://127.0.0.1:8000/Administrative_staff/consulterReclamations/`
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static ValiderNotes(id) {
    return fetch(
      `http://127.0.0.1:8000/Administrative_staff/validerNotes/${id}`
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static Affecter3emeCorrection(data) {
    return fetch(
      `http://127.0.0.1:8000/Administrative_staff/set3emeEnseignantsEtSujet/`,
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

  static ValiderNotesMoyenne(id) {
    return fetch(
      `http://127.0.0.1:8000/Administrative_staff/validerNotesMoyenne/${id}`
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
}
