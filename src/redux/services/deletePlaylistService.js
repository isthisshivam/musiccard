import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const deletePlaylist = async (payload) => {
  const response = await baseBackendApi.delete(
    ApiConstant.DEL_PLAYLIST + `` + payload
  );

  return response.data;
};
