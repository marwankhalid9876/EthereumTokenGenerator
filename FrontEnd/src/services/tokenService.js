import http from "./http-common";

class tokenService {
  getUserTokenList() {
    return http.get("/getUserTokenList");
  }
  getContractInfo(blockTimeStamp) {
    return http.post("/getContractInfo", blockTimeStamp);
  }
}

export default new tokenService();
