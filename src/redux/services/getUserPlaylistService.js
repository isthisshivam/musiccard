import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const getUserPlaylist = async () => {
  const response = await baseBackendApi.get(ApiConstant.USER_PLAYLIST);
  return response.data;
};
