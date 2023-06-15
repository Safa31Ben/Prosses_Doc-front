export default class GestionAPI {
  static userList() {
    return fetch(`http://127.0.0.1:8000/Gestion/user_List`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static userDetail(id) {
    return fetch(`http://127.0.0.1:8000/Gestion/User_detail/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static login(data) {
    return fetch(`http://127.0.0.1:8000/Gestion/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response)
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static addUser(data) {
    return fetch(`http://127.0.0.1:8000/Gestion/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response)
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static deleteUser(id) {
    return fetch(`http://127.0.0.1:8000/Gestion/DeleteUser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response)
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static updateUser(id, data) {
    return fetch(`http://127.0.0.1:8000/Gestion/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response)
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static addEmplacement(data) {
    return fetch(`http://127.0.0.1:8000/Gestion/AddEmplacement/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response)
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static addConcoursAndSujet(data) {
    return fetch(`http://127.0.0.1:8000/Gestion/AddConcoursAndSujet/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response)
      .then((data) => data)
      .catch((err) => console.log(err));
  }
}
