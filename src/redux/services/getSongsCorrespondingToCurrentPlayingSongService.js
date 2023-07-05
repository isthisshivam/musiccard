import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const getSongsCorrespondingToCurrentPlayingSong = async (uid) => {
  const response = await baseBackendApi.get(ApiConstant.NEXT_SONGS_LIST + uid);

  return response.data;
};
