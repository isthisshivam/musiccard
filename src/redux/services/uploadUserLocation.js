import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
import CommonUtility from "../../utility/constant/CommonUtility";
export const uploadUserLocation = async (payload) => {
  const response = await baseBackendApi.patch(
    ApiConstant.UPLOAD_USER_LOCATION,
    payload
  );

  return response.data;
};
