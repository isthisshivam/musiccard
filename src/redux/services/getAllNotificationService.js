import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const getNotificationList = async () => {
  const response = await baseBackendApi.get(ApiConstant.NOTIFICATION);
  return response.data;
};
