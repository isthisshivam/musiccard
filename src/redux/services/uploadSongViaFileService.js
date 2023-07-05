import baseBackendApiFormData from "../webservice/baseBackendApiFormData";
import ApiConstant from "../../utility/constant/ApiConstants";
import CommonUtility from "../../utility/constant/CommonUtility";
export const uploadSongViaFile = async (payload) => {
  const response = await baseBackendApiFormData.post(
    ApiConstant.UPLOAD_SONG_FILE,
    payload
  );

  return response.data;
};
