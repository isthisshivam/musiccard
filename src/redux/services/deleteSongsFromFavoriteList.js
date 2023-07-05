import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const deleteSongsFromFavoriteService = async (payload) => {
  console.log("payload", JSON.stringify(payload));
  const response = await baseBackendApi.delete(
    ApiConstant.DELETE_MULTI_FROM_FAVORITES,
    { data: { ...payload } }
  );

  return response.data;
};
