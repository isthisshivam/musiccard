import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const getIndiaLocation = async () => {
  const response = await baseBackendApi.get(ApiConstant.INDIA_LOCATION);
  return response.data;
};
