import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
import CommonUtility from "../../utility/constant/CommonUtility";
export const editUserInformation = async (payload) => {
  const response = await baseBackendApi.patch(
    ApiConstant.LOGGED_IN_USER,
    payload
  );

  return response.data;
};
