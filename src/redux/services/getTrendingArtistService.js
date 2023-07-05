import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const getAllTrendingArtist = async () => {
  const response = await baseBackendApi.get(
    ApiConstant.GET_ALL_TRENDING_ARTIST
  );
  return response.data;
};
