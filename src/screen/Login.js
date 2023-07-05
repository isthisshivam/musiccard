import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginPost } from "../redux/services/loginService";
import { loggedInUserGet } from "../redux/services/getLoggedInUserProfile";
import { setGlobalAuthentication } from "../redux/webservice/baseBackendApi";
import { useSelector, useDispatch, connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  LOGIN_SUCCESS,
  LOGGED_IN_USER_DETAILS,
} from "../reduxThunk/action/actions";
import Loader from "../component/Ui/loader";
import globalStyle from "../assets/styles/styles";
import APP_STRING from "../utility/constant/StringConstants";
import CommonUtility from "../utility/constant/CommonUtility";
import BUTTON from "../component/Ui/button";
import COLORS from "../utility/constant/Colors";

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [email, setEmail] = useState(APP_STRING.EMPTY);
  const [password, setPassword] = useState(APP_STRING.EMPTY);

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
    }
    if (message == "") {
      return true;
    }
    CommonUtility.getInstance().inflateToast(message);
    return false;
  };
  const onLoginPress = async () => {
    if (validateFields()) {
      try {
        setShowLoader(true);
        let loginPayload = {
          email: email,
          password: password,
          policy: "password",
        };
        const response = await loginPost(loginPayload);
        if (response && response.access_token) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              login: true,
              access_token: response.access_token,
            },
          });

          setGlobalAuthentication(response.access_token);
          saveUserAccessToken(response.access_token);
        }
      } catch (e) {
        setShowLoader(false);
        setTimeout(() => {
          CommonUtility.getInstance().inflateToast(
            APP_STRING.INCORRECT_DETAILS
          );
        }, 100);
      }
    }
  };

  const saveUserAccessToken = async (response) => {
    await CommonUtility.getInstance()
      .setStoreData(APP_STRING.USER_TOKEN, response)
      .then(() => {
        setShowLoader(false);
        navigation.reset({
          routes: [{ name: "Home" }],
        });
      });
  };

  return (
    <>
      <View style={[globalStyle.main_wrapper]}>
        <Loader isLoading={showLoader} />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={true}
          showsVerticalScrollIndicator={false}
          enableOnAndroid={false}
          contentContainerStyle={globalStyle.keyboard_Container}
          style={[globalStyle.KeyboardAwareScrollView_center]}
        >
          <Text style={[globalStyle.login_heading, globalStyle.muli_bold]}>
            Login
          </Text>
          <Text
            style={[
              globalStyle.email_text,
              globalStyle.email_margin,
              globalStyle.muli_bold,
            ]}
          >
            Email
          </Text>
          <TextInput
            onChangeText={(email) => setEmail(email)}
            keyboardType="email-address"
            placeholder="Enter your email"
            style={[globalStyle.textInput, globalStyle.muli]}
            value={email}
          ></TextInput>
          <View style={globalStyle.margin_20}></View>
          <Text style={(globalStyle.email_text, globalStyle.muli_bold)}>
            Password
          </Text>
          <TextInput
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
            placeholder="******"
            value={password}
            maxLength={15}
            style={globalStyle.textInput}
          ></TextInput>
          <View style={globalStyle.margin_30}>
            <BUTTON
              buttonFormStyle={{
                backgroundColor: COLORS.primary2,
                shadowColor: COLORS.primary2,
              }}
              buttonType="SMALL"
              labelStyleForm={globalStyle.button_font_18}
              label={APP_STRING.LOGIN}
              action={onLoginPress}
              achievement={APP_STRING.REGISTER}
            />
          </View>

          <Text
            onPress={() => navigation.navigate("ForgotPassword")}
            style={[
              globalStyle.margin_60,
              globalStyle.muli,
              { textDecorationLine: "underline" },
            ]}
          >
            {APP_STRING.FORGOT_PASSWORD}
          </Text>
          <View style={globalStyle.flexRow_width_100}>
            <Text
              onPress={() => navigation.navigate("Register")}
              style={[
                globalStyle.margin_30,
                globalStyle.margin_30_center,
                globalStyle.muli,
              ]}
            >
              New User?
            </Text>
            <Text
              onPress={() => navigation.navigate("Register")}
              style={[
                globalStyle.margin_30,
                globalStyle.margin_30_center,
                globalStyle.muli,
                { textDecorationLine: "underline" },
              ]}
            >
              {APP_STRING.REGISTER_USER}
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};
export default Login;
