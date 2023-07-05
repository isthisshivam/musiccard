import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const forgotPasswordPatch = async (payload) => {
  const response = await baseBackendApi.patch(
    ApiConstant.FORGOT_PASSWORD,
    payload
  );
  return response.data;
};
