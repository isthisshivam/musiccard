import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  ImageBackground,
} from "react-native";
import { registerPost } from "../redux/services/registerService";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loader from "../component/Ui/loader";
import COLORS from "../utility/constant/Colors";
import BUTTON from "../component/Ui/button";
import APP_STRING from "../utility/constant/StringConstants";
import ImageConstant from "../utility/constant/ImageConstant";
import CommonUtility from "../utility/constant/CommonUtility";
import globalStyle from "../assets/styles/styles";
import {
  generateRegisterOtp,
  validateRegisterOtp,
} from "../redux/services/otpServices";

const Register = () => {
  const navigation = useNavigation();
  const [congrates, setCongrates] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [email, setEmail] = useState(APP_STRING.EMPTY);
  const [firstName, setFirstName] = useState(APP_STRING.EMPTY);
  const [lastName, setLastName] = useState(APP_STRING.EMPTY);
  const [password, setPassword] = useState(APP_STRING.EMPTY);
  const [confirmPassword, setConfirmPassword] = useState(APP_STRING.EMPTY);
  const [aboutInfo, setAboutInfo] = useState(APP_STRING.EMPTY);

  // state management for otp
  const [otp, setOtp] = useState("");
  const [showGenerateOtp, setShowGenerateOtp] = useState(true);
  const [showValidateOtp, setShowValidateOtp] = useState(false);
  const [disableValidateOtp, setDisableValidateOtp] = useState(false);
  const [otpValid, setOtpValid] = useState(false);

  const generateOtpFn = async () => {
    if (!CommonUtility.getInstance().isEmail(email)) {
      CommonUtility.getInstance().inflateToast(APP_STRING.ENTER_VALID_EMAIL);
      return;
    }
    // else call api to send otp to given email
    try {
      const response = generateRegisterOtp({ email: email.toLowerCase() });
      setShowGenerateOtp(false);
      setShowValidateOtp(true);
    } catch (e) {
      CommonUtility.getInstance().inflateToast(APP_STRING.OTP_GENERATION_FAIL);
    }
  };

  const validateOtpFn = async () => {
    if (!CommonUtility.getInstance().isEmail(email)) {
      CommonUtility.getInstance().inflateToast(APP_STRING.ENTER_VALID_EMAIL);
      return;
    }
    // else call api to send otp to given email
    try {
      const response = await validateRegisterOtp({
        email: email.toLowerCase(),
        otp,
      });
      setShowValidateOtp(true);
      setDisableValidateOtp(true);
      setOtpValid(true);
    } catch (e) {
      CommonUtility.getInstance().inflateToast(APP_STRING.OTP_VALIDATION_FAIL);
    }
  };

  const Header = () => {
    return (
      <View style={globalStyle.header_view}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            onPress={() => navigation.goBack()}
            style={globalStyle.back_button}
            resizeMode="contain"
            source={ImageConstant.EDITOR_PICK.BACK}
          />
        </Pressable>

        <Text style={globalStyle.complete_profile}>{`Register`}</Text>
      </View>
    );
  };

  const validateFields = () => {
    var message = "";
    if (CommonUtility.getInstance().isEmpty(firstName)) {
      message = APP_STRING.ENTER_F_NAME;
    } else if (CommonUtility.getInstance().isEmpty(lastName)) {
      message = APP_STRING.ENTER_L_NAME;
    } else if (CommonUtility.getInstance().isEmpty(email)) {
      message = APP_STRING.ENTER_USERNAME;
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
  const registerCall = async () => {
    if (validateFields()) {
      try {
        setShowLoader(true);
        let registerPayload = {
          firstname: firstName,
          lastname: lastName,
          email: email.toLowerCase(),
          password: password,
          about: aboutInfo,
        };

        const response = await registerPost(registerPayload);
        if (response) {
          setShowLoader(false);
          setTimeout(() => {
            CommonUtility.getInstance().inflateToast(
              APP_STRING.REGISTRATION_SUCCESS
            );
            setCongrates(true);
          }, 100);
          setTimeout(() => {
            setCongrates(false);
            navigation.navigate("Login");
          }, 3000);
        }
      } catch (e) {
        setShowLoader(false);
        setTimeout(() => {
          CommonUtility.getInstance().inflateToast(
            APP_STRING.USER_ALREADY_EXISTS
          );
          // make to initial state
          setShowGenerateOtp(true);
          setShowValidateOtp(false);
          setDisableValidateOtp(false);
          setOtpValid(false);

          // reset register form fields
          setEmail(APP_STRING.EMPTY);
          setFirstName(APP_STRING.EMPTY);
          setLastName(APP_STRING.EMPTY);
          setPassword(APP_STRING.EMPTY);
          setConfirmPassword(APP_STRING.EMPTY);
          setAboutInfo(APP_STRING.EMPTY);
        }, 100);
      }
    }
  };

  return (
    <>
      <View style={globalStyle.view_flex_one}>
        <Header />
        {congrates && (
          <ImageBackground
            resizeMode="contain"
            style={{ height: "100%", width: "100%" }}
            source={ImageConstant.SPLASH.CONGRATES}
          ></ImageBackground>
        )}
        <Loader isLoading={showLoader} />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          extraScrollHeight={120}
          contentContainerStyle={globalStyle.keyboard_Container}
          style={[globalStyle.white_background]}
        >
          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.textInput_margin,
            ]}
          >
            Email *
          </Text>
          <TextInput
            secureTextEntry={false}
            keyboardType="email-address"
            placeholder="Enter email"
            style={globalStyle.textInput}
            value={email}
            onChangeText={(value) => setEmail(value)}
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
              <Text
                style={[
                  globalStyle.email_text,
                  globalStyle.muli_bold,
                  globalStyle.textInput_margin,
                ]}
              >
                First name *
              </Text>
              <TextInput
                secureTextEntry={false}
                placeholder="Enter First name"
                keyboardType="default"
                style={globalStyle.textInput}
                value={firstName}
                onChangeText={(firstName) => setFirstName(firstName)}
              ></TextInput>
              <Text
                style={[
                  globalStyle.email_text,
                  globalStyle.muli_bold,
                  globalStyle.textInput_margin,
                ]}
              >
                Last name *
              </Text>
              <TextInput
                placeholder="Enter Last name"
                keyboardType="default"
                style={globalStyle.textInput}
                value={lastName}
                onChangeText={(lastName) => setLastName(lastName)}
              ></TextInput>
              <Text
                style={[
                  globalStyle.email_text,
                  globalStyle.muli_bold,
                  globalStyle.textInput_margin,
                ]}
              >
                Password *
              </Text>
              <TextInput
                maxLength={15}
                textContentType="newPassword"
                selectTextOnFocus={true}
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
              <Text
                style={[
                  globalStyle.email_text,
                  globalStyle.muli_bold,
                  globalStyle.textInput_margin,
                ]}
              >
                Tell us about yourself
              </Text>
              <TextInput
                secureTextEntry={true}
                multiline={true}
                value={aboutInfo}
                keyboardType="web-search"
                returnKeyType="done"
                onChangeText={(aboutInfo) => setAboutInfo(aboutInfo)}
                style={[globalStyle.textInput, globalStyle.input_align_justify]}
              ></TextInput>
              <View style={globalStyle.margin_30}>
                <BUTTON
                  buttonFormStyle={{
                    backgroundColor: COLORS.primary2,
                    shadowColor: COLORS.primary2,
                  }}
                  buttonType="SMALL"
                  labelStyleForm={globalStyle.button_font_18}
                  label={APP_STRING.REGISTER}
                  action={registerCall}
                  achievement={APP_STRING.HOME}
                />
              </View>
            </React.Fragment>
          )}
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};
export default Register;
