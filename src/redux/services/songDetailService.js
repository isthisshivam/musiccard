import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const songDetailGet = async (payload) => {
  const response = await baseBackendApi.get(ApiConstant.SONG_DETAIL + payload);

  return response.data;
};
