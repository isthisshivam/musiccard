import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const getSongsRequests = async () => {
  const response = await baseBackendApi.get(ApiConstant.SONG_REQUEST);
  return response.data;
};
