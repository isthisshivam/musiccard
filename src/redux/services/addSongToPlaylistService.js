import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const addSongToPlaylistPost = async (payload, playListId) => {
  const response = await baseBackendApi.post(
    ApiConstant.PLAYLIST_DETAILS + `` + playListId + `` + ApiConstant.CGE,
    payload
  );

  return response.data;
};
