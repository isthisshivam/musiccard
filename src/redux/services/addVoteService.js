import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const addVoteToSong = async (songId, payload) => {
  // alert(JSON.stringify(ApiConstant.SONG_DETAIL + songId + `/vote`, payload));
  const response = await baseBackendApi.patch(
    ApiConstant.SONG_DETAIL + songId + `/vote`
  );

  return response.data;
};
