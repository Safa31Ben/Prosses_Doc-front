export default class EnseignantAPI {
  static ConsulterEmplacement(id) {
    return fetch(
      `http://127.0.0.1:8000/Enseignant_candidat/cons_emplacement/${id}`
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static ConsulterCandidatNoteList(id) {
    return fetch(`http://127.0.0.1:8000/Enseignant_candidat/get-notes/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static SaisirNotes(id, data) {
    return fetch(
      `http://127.0.0.1:8000/Enseignant_candidat/saisit_notes/${id}`,
      {
        method: "POST",
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

  static FaireRapport(id, data) {
    return fetch(
      `http://127.0.0.1:8000/Enseignant_candidat/faire_rapport/${id}`,
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

  static ConsulterCandidatList(id) {
    return fetch(
      `http://127.0.0.1:8000/Enseignant_candidat/Condidat_list/${id}`
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static MarquerPresence(id, data) {
    return fetch(
      `http://127.0.0.1:8000/Enseignant_candidat/marquerPresence/${id}`,
      {
        method: "POST",
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

  static PropositionSujetTheses(id, data) {
    return fetch(`http://127.0.0.1:8000/Enseignant_candidat/prop_these/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
}
