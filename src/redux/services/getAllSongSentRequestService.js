import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const getAllSentSongsRequests = async () => {
  const response = await baseBackendApi.get(ApiConstant.SENT_SONG_REQUEST);
  return response.data;
};
