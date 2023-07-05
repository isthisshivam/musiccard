import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const getAllEditorPickSongs = async () => {
  const response = await baseBackendApi.get(ApiConstant.GET_ALL_EDITOR_PICK);
  return response.data;
};
