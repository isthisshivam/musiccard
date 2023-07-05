/* eslint-disable eqeqeq */
import APP_STRING from "../../utility/constant/StringConstants";
import {
  ApiWorkerPost,
  ApiWorkerGet,
  ApiWorkerPatch,
} from "./api_manager/RequestGenerator";

////////////////////////////////////////////////////
export const postRequest = async (url, payload) => {
  return await new Promise((resolve, reject) => {
    ApiWorkerPost(this, url, payload)
      .then((success) => {
        resolve(success);
      })
      .catch((error) => {
        if (error.message) {
          reject(error.message);
        } else {
          reject(error);
        }
      });
  });
};
export const getRequest = async (url, payload) => {
  return await new Promise((resolve, reject) => {
    ApiWorkerGet(this, url, payload)
      .then((success) => {
        resolve(success);
        if (success.status_code == APP_STRING.SUCCESS) {
          resolve(success);
        } else if (success.status_code == APP_STRING.NOT_FOUND) {
          reject(success.message);
        }
      })
      .catch((error) => {
        if (error.message) {
          reject(error.message);
        } else {
          reject(error);
        }
      });
  });
};
export const patchRequest = async (url, payload) => {
  return await new Promise((resolve, reject) => {
    ApiWorkerPatch(this, url, payload)
      .then((success) => {
        resolve(success);
      })
      .catch((error) => {
        if (error.message) {
          reject(error.message);
        } else {
          reject(error);
        }
      });
  });
};
