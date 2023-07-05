import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const SongRequestPost = async (payload) => {
  const response = await baseBackendApi.post(ApiConstant.SONG_REQUEST, payload);

  return response.data;
};
