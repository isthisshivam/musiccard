import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { useSelector, useDispatch, connect } from "react-redux";
import { forgotPasswordPatch } from "../redux/services/forgotPasswordService";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { forgotPasswordRequest } from "../redux/action/ForgotPasswordAction";
import globalStyle from "../assets/styles/styles";
import Loader from "../component/Ui/loader";
import BUTTON from "../component/Ui/button";
import { Colors } from "react-native/Libraries/NewAppScreen";
import COLORS from "../utility/constant/Colors";
import APP_STRING from "../utility/constant/StringConstants";
import ImageConstant from "../utility/constant/ImageConstant";
import CommonUtility from "../utility/constant/CommonUtility";
import { generateOtp, validateOtp } from "../redux/services/otpServices";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [email, setEmail] = useState(APP_STRING.EMPTY);
  const [password, setPassword] = useState(APP_STRING.EMPTY);
  const [confirmPassword, setConfirmPassword] = useState(APP_STRING.EMPTY);

  const [otp, setOtp] = useState("");
  const [showGenerateOtp, setShowGenerateOtp] = useState(true);
  const [showValidateOtp, setShowValidateOtp] = useState(false);
  const [disableValidateOtp, setDisableValidateOtp] = useState(false);
  const [otpValid, setOtpValid] = useState(false);

  const validateFields = () => {
    var message = "";
    if (CommonUtility.getInstance().isEmpty(email)) {
      message = APP_STRING.ENTER_EMAIL;
    } else if (!CommonUtility.getInstance().isEmail(email)) {
      message = APP_STRING.ENTER_VALID_EMAIL;
    } else if (CommonUtility.getInstance().isEmpty(password)) {
      message = APP_STRING.ENTER_PASSWORD;
    } else if (password.length < 6) {
      message = APP_STRING.ENTER_SIX_DIGIT_PASSWORD;
    } else if (CommonUtility.getInstance().isEmpty(confirmPassword)) {
      message = APP_STRING.ENTER_CONFIRM_PASSWORD;
    } else if (confirmPassword.length < 6) {
      message = APP_STRING.ENTER_SIX_DIGIT_PASSWORD;
    } else if (password != confirmPassword) {
      message = APP_STRING.BOTHPASS_DOES_NOT_MATCH;
    }
    if (message == "") {
      return true;
    }
    CommonUtility.getInstance().inflateToast(message);
    return false;
  };

  const generateOtpFn = async () => {
    if (!CommonUtility.getInstance().isEmail(email)) {
      CommonUtility.getInstance().inflateToast(APP_STRING.ENTER_VALID_EMAIL);
    }
    // else call api to send otp to given email
    try {
      const response = generateOtp({ email: email.toLowerCase() });
      setShowGenerateOtp(false);
      setShowValidateOtp(true);
    } catch (e) {
      CommonUtility.getInstance().inflateToast(APP_STRING.OTP_GENERATION_FAIL);
    }
  };

  const validateOtpFn = async () => {
    if (!CommonUtility.getInstance().isEmail(email)) {
      CommonUtility.getInstance().inflateToast(APP_STRING.ENTER_VALID_EMAIL);
    }
    // else call api to send otp to given email
    try {
      const response = await validateOtp({ email: email.toLowerCase(), otp });
      setShowValidateOtp(true);
      setDisableValidateOtp(true);
      setOtpValid(true);
    } catch (e) {
      CommonUtility.getInstance().inflateToast(APP_STRING.OTP_VALIDATION_FAIL);
    }
  };

  const forgotPasswordCall = async () => {
    if (validateFields()) {
      try {
        setShowLoader(true);
        let forgotPasswordPayload = {
          email: email.toLowerCase(),
          password: password,
        };

        const response = await forgotPasswordPatch(forgotPasswordPayload);
        if (response) {
          setShowLoader(false);
          setTimeout(() => {
            CommonUtility.getInstance().inflateToast(
              APP_STRING.SUCCESSFULL_REQUEST
            );
          }, 100);

          setTimeout(() => {
            navigation.navigate("Login");
          }, 2000);
        }
      } catch (e) {
        setShowLoader(false);
        setTimeout(() => {
          CommonUtility.getInstance().inflateToast(APP_STRING.EMAIL_NOT_FOUND);
        }, 1000);
      }
    }
  };

  const Header = () => {
    return (
      <View
        style={{
          height: 55,
          backgroundColor: Colors.lighter,
          width: "100%",
          borderBottomWidth: 1,
          paddingHorizontal: 18,
          alignItems: "center",
          flexDirection: "row",
          borderBottomColor: COLORS.border_Color,
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            onPress={() => navigation.goBack()}
            style={{ height: 22, width: 22 }}
            resizeMode="contain"
            source={ImageConstant.EDITOR_PICK.BACK}
          />
        </Pressable>

        <Text
          style={{ marginLeft: 20, fontSize: 18, fontFamily: "Muli-SemiBold" }}
        >
          Forgot Password
        </Text>
      </View>
    );
  };
  return (
    <>
      <View style={globalStyle.view_flex_one}>
        <Header />
        <Loader isLoading={showLoader} />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraScrollHeight={120}
          contentContainerStyle={globalStyle.main_wrapper_no_center}
          style={[{ backgroundColor: "white" }]}
        >
          <Text style={[globalStyle.email_text, globalStyle.muli_bold]}>
            Email *
          </Text>
          <TextInput
            keyboardType="email-address"
            placeholder="Enter your email"
            style={globalStyle.textInput}
            value={email}
            onChangeText={(email) => setEmail(email)}
            editable={!disableValidateOtp}
          ></TextInput>
          {showValidateOtp && (
            <React.Fragment>
              <View style={globalStyle.margin_20}></View>
              <Text style={(globalStyle.email_text, globalStyle.muli_bold)}>
                OTP *
              </Text>
              <TextInput
                maxLength={15}
                secureTextEntry={true}
                style={globalStyle.textInput}
                value={otp}
                onChangeText={(value) => setOtp(value)}
                editable={!disableValidateOtp}
              ></TextInput>
            </React.Fragment>
          )}
          {showGenerateOtp && (
            <View style={globalStyle.margin_30}>
              <BUTTON
                buttonFormStyle={{
                  backgroundColor: COLORS.primary2,
                  shadowColor: COLORS.primary2,
                }}
                buttonType="LARGE"
                labelStyleForm={globalStyle.button_font_18}
                label={APP_STRING.GENERATE_OTP_LABEL}
                action={generateOtpFn}
                achievement={APP_STRING.GENERATE_OTP_LABEL}
                disabled={disableValidateOtp}
              />
            </View>
          )}
          {showValidateOtp && (
            <View style={globalStyle.margin_30}>
              <BUTTON
                buttonFormStyle={{
                  backgroundColor: COLORS.primary2,
                  shadowColor: COLORS.primary2,
                }}
                buttonType="LARGE"
                labelStyleForm={globalStyle.button_font_18}
                label={APP_STRING.VALIDATE_OTP_LABEL}
                action={validateOtpFn}
                achievement={APP_STRING.VALIDATE_OTP_LABEL}
                disabled={disableValidateOtp}
              />
            </View>
          )}
          <View style={globalStyle.margin_20}></View>
          {otpValid && (
            <React.Fragment>
              <Text style={(globalStyle.email_text, globalStyle.muli_bold)}>
                Password *
              </Text>
              <TextInput
                maxLength={15}
                secureTextEntry={true}
                placeholder="******"
                style={globalStyle.textInput}
                value={password}
                onChangeText={(password) => setPassword(password)}
              ></TextInput>
              <Text
                style={[
                  globalStyle.email_text,
                  globalStyle.muli_bold,
                  globalStyle.textInput_margin,
                ]}
              >
                Confirm Password *
              </Text>
              <TextInput
                textContentType="newPassword"
                selectTextOnFocus={true}
                secureTextEntry={true}
                placeholder="******"
                maxLength={15}
                style={globalStyle.textInput}
                value={confirmPassword}
                onChangeText={(confirmPassword) =>
                  setConfirmPassword(confirmPassword)
                }
              ></TextInput>
              <View style={globalStyle.margin_30}>
                <BUTTON
                  buttonFormStyle={{
                    backgroundColor: COLORS.primary2,
                    shadowColor: COLORS.primary2,
                  }}
                  buttonType="SMALL"
                  labelStyleForm={globalStyle.button_font_18}
                  label={APP_STRING.SUBMIT}
                  action={() => [forgotPasswordCall()]}
                  achievement={APP_STRING.LOGIN}
                />
              </View>
            </React.Fragment>
          )}
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};
export default ForgotPassword;
