import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const getVideoOfTheDay = async (payload) => {
  const response = await baseBackendApi.get(
    ApiConstant.VIDEO_OF_THE_DAY + "?showAll=" + payload
  );
  //console.log("inresponse==", response);
  return response.data;
};
// ?startDate=2021-11-01&endDate=2021-12-04
