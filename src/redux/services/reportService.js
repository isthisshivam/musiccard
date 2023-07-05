import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const reportPostService = async (songId, payload) => {
  const response = await baseBackendApi.post(
    ApiConstant.SONG_DETAIL + songId + "/" + ApiConstant.REPORT,
    payload
  );
  return response.data;
};
