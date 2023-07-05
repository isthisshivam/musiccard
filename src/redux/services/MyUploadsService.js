import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const myUploadsGet = async () => {
  const response = await baseBackendApi.get(ApiConstant.MY_UPLOADS);
  return response.data;
};
