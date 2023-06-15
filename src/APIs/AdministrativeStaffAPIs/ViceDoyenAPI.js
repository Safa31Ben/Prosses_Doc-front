export default class ViceDoyenAPI {
  static consulterRessourcesHumains() {
    return fetch(
      `http://127.0.0.1:8000/Administrative_staff/consulterRessourcesHumains/`
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static ConsulterStats(id) {
    return fetch(
      `http://127.0.0.1:8000/Administrative_staff/consulterStats/${id}`
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static GenerCodesAnonyme() {
    return fetch(
      `http://127.0.0.1:8000/Administrative_staff/generCodesAnonyme/`
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static PartagerAnnonces(data) {
    return fetch(
      "http://127.0.0.1:8000/Administrative_staff/partagerAnnonces/",
      {
        method: "POST",
        body: data,
      }
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
}
