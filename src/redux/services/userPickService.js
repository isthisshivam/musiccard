import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const getUsersPickService = async () => {
  const response = await baseBackendApi.get(ApiConstant.USER_PICK);
  return response.data;
};
