import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const loggedInUserGet = async () => {
  const response = await baseBackendApi.get(ApiConstant.LOGGED_IN_USER);

  return response.data;
};
