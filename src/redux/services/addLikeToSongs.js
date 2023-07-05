import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const addLikeToSong = async (songId, payload) => {
  const response = await baseBackendApi.patch(
    ApiConstant.SONG_DETAIL + songId + "/like?liked=" + payload
  );

  return response.data;
};
