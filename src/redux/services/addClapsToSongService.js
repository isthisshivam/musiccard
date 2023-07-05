import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const addClapsToSong = async (songId, payload) => {
  const response = await baseBackendApi.patch(
    ApiConstant.SONG_DETAIL + songId + "/claps?claped=" + payload
  );

  return response.data;
};
