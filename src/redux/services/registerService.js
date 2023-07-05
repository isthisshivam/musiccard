import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const registerPost = async (payload) => {
  const response = await baseBackendApi.post(ApiConstant.CREATE_USER, payload);
  return response.data;
};
