import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const userProfileGet = async () => {
  const response = await baseBackendApi.get(`users`);
  return response.data;
};
