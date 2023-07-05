import axios from "axios";
import ApiConstant from "../../utility/constant/ApiConstants";

const baseBackendApiFormData = new axios.create({
  baseURL: ApiConstant.BASE_URL_DEV,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

export const setGlobalAuthenticationFormData = (token) => {
  baseBackendApiFormData.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;
};

export default baseBackendApiFormData;
