import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const getVideoOfTheMonth = async (payload) => {
  const response = await baseBackendApi.get(
    ApiConstant.VIDEO_OF_THE_MONTH + "?showAll=" + payload
  );

  return response.data;
};
// ?startDate=2021-11-01&endDate=2021-12-04
