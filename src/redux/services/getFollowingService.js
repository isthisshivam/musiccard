import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const getFollowingService = async () => {
  const response = await baseBackendApi.get(ApiConstant.FOLLOWING);
  return response.data;
};
