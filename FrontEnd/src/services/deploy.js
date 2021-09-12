import http from "./http-common";

class deploy {
  send(data) {
    return http.post("/deploy", data);
  }
}

export default new deploy();
