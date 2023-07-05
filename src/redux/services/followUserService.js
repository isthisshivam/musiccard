import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const followUserService = async (payload) => {
  const response = await baseBackendApi.patch(ApiConstant.FOLLLOW, payload);

  return response.data;
};
