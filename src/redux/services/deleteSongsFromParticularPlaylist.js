import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";

export const deleteSongsFromPlaylist = async (playListId, payload) => {
  let link = `${ApiConstant.PLAYLIST_DETAILS}${playListId}${ApiConstant.REMOVE_SONG_FROM_PARTICULAR_PLAYLIST}`;
  const response = await baseBackendApi.delete(link, { data: { ...payload } });
  return response.data;
};
