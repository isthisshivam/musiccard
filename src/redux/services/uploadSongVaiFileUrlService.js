import baseBackendApiFormData from "../webservice/baseBackendApiFormData";
import ApiConstant from "../../utility/constant/ApiConstants";
import CommonUtility from "../../utility/constant/CommonUtility";
export const uploadSongViaUrl = async (payload) => {
  const response = await baseBackendApiFormData.post(
    ApiConstant.VIDEO_URL_UPLOAD,
    payload
  );

  return response.data;
};
