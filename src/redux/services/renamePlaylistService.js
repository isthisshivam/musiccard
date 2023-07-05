import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const renamePlaylistPatch = async (playListId, payload) => {
  const response = await baseBackendApi.patch(
    ApiConstant.PLAYLIST_DETAILS +
      `` +
      playListId +
      `` +
      ApiConstant.RENAME_PLAYLIST,
    payload
  );

  return response.data;
};
