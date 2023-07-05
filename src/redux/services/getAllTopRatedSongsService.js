import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const getAllTopRatedSongs = async () => {
  const response = await baseBackendApi.get(
    ApiConstant.GET_ALL_TOP_RATED_SONGS
  );
  return response.data;
};
