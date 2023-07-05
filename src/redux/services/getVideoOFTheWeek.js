import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const getVideoOfTheWeek = async (payload) => {
  const response = await baseBackendApi.get(
    ApiConstant.VIDEO_OF_THE_WEEK + "?showAll=" + payload
  );

  return response.data;
};
// ?startDate=2021-11-01&endDate=2021-12-04
