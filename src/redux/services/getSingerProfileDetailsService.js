import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const getSingerProfileDetails = async (payload) => {
  const response = await baseBackendApi.get(
    ApiConstant.SINGER_PROFILE + payload
  );

  return response.data;
};
