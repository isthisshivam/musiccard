import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const removeSongFromPlaylist = async (payload) => {
  const response = await baseBackendApi.delete(
    ApiConstant.PLAYLIST_DETAILS +
      `` +
      payload +
      `` +
      ApiConstant.REMOVE_SONG_FROM_PLAYLIST
  );
  return response.data;
};
