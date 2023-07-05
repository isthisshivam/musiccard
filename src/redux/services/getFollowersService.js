import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const getFollowersService = async () => {
  const response = await baseBackendApi.get(ApiConstant.FOLLOWERS);
  return response.data;
};
