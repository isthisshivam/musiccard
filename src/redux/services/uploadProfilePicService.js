import baseBackendApiFormData from "../webservice/baseBackendApiFormData";
import ApiConstant from "../../utility/constant/ApiConstants";
import CommonUtility from "../../utility/constant/CommonUtility";
export const uploadProfilePicPatch = async (payload) => {
  const response = await baseBackendApiFormData.patch(
    ApiConstant.UPLOAD_PROFILE_PIC,
    payload
  );

  return response.data;
};
