import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const allSongsGet = async (token) => {
  baseBackendApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await baseBackendApi.get(ApiConstant.ALL_SONGS);
  return response.data;
};
