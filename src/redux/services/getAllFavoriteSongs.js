import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const getFavoriteList = async () => {
  const response = await baseBackendApi.get(
    ApiConstant.FAVIOURITE_PLAYLIST_LIST
  );
  return response.data;
};
