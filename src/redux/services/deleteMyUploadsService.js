import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const deleteMyUploadsService = async (payload) => {
  console.log("deleteMyUploadsService.payload", JSON.stringify(payload));
  const response = await baseBackendApi.delete(
    ApiConstant.DELETE_MULTI_FROM_MYUPLOADS,
    { data: { ...payload } }
  );

  console.log("deleteMyUploadsService.response", JSON.stringify(response.data));

  return response.data;
};
