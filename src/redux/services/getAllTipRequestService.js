import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const getAllTipsRecord = async () => {
  const response = await baseBackendApi.get(ApiConstant.TIPS);
  return response.data;
};
