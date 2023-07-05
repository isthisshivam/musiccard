import axios from "axios";
//import NetInfo from "@react-native-community/netinfo";

const requestTime = 15000;

class RequestCreator {
  static async postRequest(url, param) {
    const instance = axios({
      method: "POST",
      url: url,
      timeout: requestTime,

      data: param,
    });

    return new Promise(function (resolve, reject) {
      instance
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          if (error.response != null) {
            reject(error.response.data);
          } else {
            reject({ message: "Internet not found" });
          }
        });
    });
  }
  static async getRequest(url, param) {
    const instance = axios({
      method: "GET",
      url: url + `?uid=` + param,
      timeout: requestTime,
    });

    return new Promise(function (resolve, reject) {
      instance
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          if (error.response != null) {
            reject(error.response.data);
          } else {
            reject({ message: "Internet not found" });
          }
        });
    });
  }

  static async patchRequest(url, param) {
    const instance = axios({
      method: "PATCH",
      url: url,
      timeout: requestTime,

      data: param,
    });

    return new Promise(function (resolve, reject) {
      instance
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          if (error.response != null) {
            reject(error.response.data);
          } else {
            reject({ message: "Internet not found" });
          }
        });
    });
  }
}

export default RequestCreator;
