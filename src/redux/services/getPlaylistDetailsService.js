import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const getPlaylistDetails = async (payload) => {
  const response = await baseBackendApi.get(
    ApiConstant.PLAYLIST_DETAILS + payload
  );

  return response.data;
};
