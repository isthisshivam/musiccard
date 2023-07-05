import axios from "axios";
import ApiConstant from "../../utility/constant/ApiConstants";
const baseBackendApi = new axios.create({
  baseURL: ApiConstant.BASE_URL_DEV,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const setGlobalAuthentication = (token) => {
  baseBackendApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

//export default { baseBackendApi, baseBackendApiFormData };
export default baseBackendApi;
