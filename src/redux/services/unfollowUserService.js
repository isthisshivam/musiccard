import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const unFollowUserService = async (payload) => {
  const response = await baseBackendApi.patch(ApiConstant.UNFOLLOW, payload);

  return response.data;
};
