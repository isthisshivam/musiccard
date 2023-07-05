import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const SaveTipDetails = async (payload) => {
  const response = await baseBackendApi.post(ApiConstant.TIPS, payload);

  return response.data;
};
