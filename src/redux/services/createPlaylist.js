import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const createPlaylist = async (payload) => {
  const response = await baseBackendApi.post(
    ApiConstant.CREATE_PLAYLIST,
    payload
  );
  console.log("createPlaylist", JSON.stringify(response.data));
  return response.data;
};
