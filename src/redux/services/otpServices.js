import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";

export const generateOtp = async (payload) => {
  const response = await baseBackendApi.post(ApiConstant.GENERATE_OTP, payload);
  return response.data;
};

export const validateOtp = async (payload) => {
  const response = await baseBackendApi.post(ApiConstant.VALIDATE_OTP, payload);
  return response.data;
};

export const generateRegisterOtp = async (payload) => {
  const response = await baseBackendApi.post(
    ApiConstant.GENERATE_REGISTER_OTP,
    payload
  );
  return response.data;
};

export const validateRegisterOtp = async (payload) => {
  const response = await baseBackendApi.post(
    ApiConstant.VALIDATE_REGISTER_OTP,
    payload
  );
  return response.data;
};
