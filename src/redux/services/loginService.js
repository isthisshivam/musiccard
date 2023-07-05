import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const loginPost = async (payload) => {
  const response = await baseBackendApi.post(ApiConstant.LOGIN, payload);

  return response.data;
};
