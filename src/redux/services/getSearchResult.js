import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const searchService = async (searchKeyword, payload) => {
  const response = await baseBackendApi.get(
    ApiConstant.SEARCH + searchKeyword,
    payload
  );

  return response.data;
};
