import http from "./http-common";

class tokenService {
  getUserTokenList() {
    return http.get("/getUserTokenList");
  }
  getContractInfo(blockTimeStamp) {
    return http.post("/getContractInfo", blockTimeStamp);
  }
  getContractMethods(data) {
    return http.post("/getContractMethods", data);
  }
  callMethod(data) {
    return http.post("/callMethod", data);
  }
}

export default new tokenService();
