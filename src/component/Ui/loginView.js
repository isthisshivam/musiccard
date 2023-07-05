import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  Pressable,
  TextInput,
  ImageBackground,
  View,
} from "react-native";
import Dialog, {
  DialogContent,
  FadeAnimation,
} from "react-native-popup-dialog";
import { useNavigation } from "@react-navigation/native";
import ImageConstant from "../../utility/constant/ImageConstant";
import COLORS from "../../utility/constant/Colors";
import APP_STRING from "../../utility/constant/StringConstants";
import globalStyle from "../../assets/styles/styles";
import BUTTON from "./button";

const LoginView = (props) => {
  const { isModal, onTouchOutside } = props;
  const [isLoginSetup, setLoginSetup] = useState(true);
  const [isConnectEmail, setConnectEmail] = useState(false);
  const [isVerifyEmail, setVerifyEMail] = useState(false);
  const [isLoginForm, setLoginForm] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    setConnectEmail(false);
    setLoginSetup(true);
    setVerifyEMail(false);
    setLoginForm(false);
  }, []);

  return (
    <Dialog
      visible={isModal}
      dialogAnimation={
        new FadeAnimation({
          initialValue: 0,
          animationDuration: 150,
          useNativeDriver: true,
        })
      }
      onTouchOutside={() => {
        onTouchOutside();
      }}
    >
      <DialogContent style={globalStyle.dialog_Container}>
        <View style={globalStyle.dialog_wrapper_view}>
          {isLoginSetup && (
            <>
              <View style={globalStyle.flexRow}>
                <Text style={globalStyle.heading_text}>
                  How should we remind you of your pledge?
                </Text>
                <Pressable onPress={() => onTouchOutside()}>
                  <Image
                    style={globalStyle.closeDialog}
                    resizeMode="contain"
                    source={ImageConstant.LOG_IN.CLOSE}
                  />
                </Pressable>
              </View>
              <View style={globalStyle.content_wrapper}>
                <>
                  <Pressable onPress={() => alert("google")}>
                    <ImageBackground
                      style={{
                        height: 70,
                        width: "100%",
                        alignSelf: "center",
                        backgroundColor: "transparent",
                        elevationLow: {
                          ...Platform.select({
                            ios: {
                              shadowColor: "#000",
                              shadowOffset: { width: 0, height: 2 },
                              shadowOpacity: 0.8,
                              shadowRadius: 2,
                            },
                            android: {
                              elevation: 5,
                            },
                          }),
                        },
                      }}
                      resizeMode="contain"
                      source={ImageConstant.LOG_IN.GOOGLE}
                    ></ImageBackground>
                  </Pressable>
                  <Text style={globalStyle.or}>OR</Text>

                  <BUTTON
                    buttonFormStyle={{
                      backgroundColor: COLORS.primary2,
                      shadowColor: COLORS.primary2,
                    }}
                    buttonType={"LARGE"}
                    label={APP_STRING.CONNECT_EMAIL}
                    labelStyleForm={globalStyle.white_l}
                    action={() => [setLoginSetup(false), setConnectEmail(true)]}
                    achievement={APP_STRING.HOME}
                  />
                  <BUTTON
                    buttonFormStyle={{
                      backgroundColor: COLORS.primary1,
                      shadowColor: COLORS.primary1,
                    }}
                    buttonType={"LARGE"}
                    label={APP_STRING.LOGIN_USERNAME}
                    labelStyleForm={globalStyle.gray_l}
                    action={() => [setLoginSetup(false), setLoginForm(true)]}
                    achievement={APP_STRING.HOME}
                  />
                </>
              </View>
            </>
          )}
          {isConnectEmail && (
            <>
              <View style={globalStyle.connectEmail_wrapper}>
                <View style={globalStyle.alignItems_center}>
                  <Pressable
                    onPress={() => [
                      setLoginSetup(true),
                      setConnectEmail(false),
                    ]}
                  >
                    <Image
                      style={globalStyle.back_image}
                      resizeMode="contain"
                      source={ImageConstant.EDITOR_PICK.BACK}
                    />
                  </Pressable>

                  <Text style={{ marginLeft: 20 }}>Login with email</Text>
                </View>
                <Pressable onPress={() => [onTouchOutside()]}>
                  <Image
                    style={globalStyle.closeDialog}
                    resizeMode="contain"
                    source={ImageConstant.LOG_IN.CLOSE}
                  />
                </Pressable>
              </View>
              <View style={globalStyle.mainContainer}>
                <Text style={globalStyle.email_text}>Email *</Text>
                <TextInput
                  keyboardType="email-address"
                  placeholder="john@gmail.com"
                  style={globalStyle.textInput}
                ></TextInput>
                <View style={globalStyle.margin_30}>
                  <BUTTON
                    buttonFormStyle={{
                      backgroundColor: COLORS.primary2,
                      shadowColor: COLORS.primary2,
                    }}
                    buttonType={"SMALL"}
                    labelStyleForm={{ fontSize: 18 }}
                    label={APP_STRING.NEXT}
                    action={() => [
                      setConnectEmail(false),
                      setVerifyEMail(true),
                    ]}
                    achievement={APP_STRING.HOME}
                  />
                </View>
              </View>
            </>
          )}
          {isVerifyEmail && (
            <>
              <View style={globalStyle.connectEmail_wrapper}>
                <Pressable
                  onPress={() => [setConnectEmail(true), setVerifyEMail(false)]}
                  style={globalStyle.alignItems_center}
                >
                  <Image
                    style={globalStyle.back_image}
                    resizeMode="contain"
                    source={ImageConstant.EDITOR_PICK.BACK}
                  />
                  <Text style={globalStyle.marginLeft_20}>Verify email</Text>
                </Pressable>
                <Pressable onPress={() => onTouchOutside()}>
                  <Image
                    style={globalStyle.closeDialog}
                    resizeMode="contain"
                    source={ImageConstant.LOG_IN.CLOSE}
                  />
                </Pressable>
              </View>
              <Text style={globalStyle.sent_text}>
                We have sent a verification code {"\n"} to your registered email
              </Text>
              <Text style={globalStyle.email_sre}>john@gmail.com</Text>
              <View style={globalStyle.mainContainer}>
                <Text style={globalStyle.enter_code}>Enter Code *</Text>
                <TextInput
                  keyboardType="email-address"
                  placeholder="654204"
                  style={globalStyle.textInput}
                ></TextInput>
                <Text style={{ textAlign: "center", marginTop: 30 }}>
                  RESEND CODE
                </Text>
                <View style={{ marginTop: 30 }}>
                  <BUTTON
                    buttonFormStyle={{
                      backgroundColor: COLORS.primary2,
                      shadowColor: COLORS.primary2,
                    }}
                    buttonType={"SMALL"}
                    labelStyleForm={{ fontSize: 18 }}
                    label={APP_STRING.VERIFY}
                    action={() => [
                      setConnectEmail(false),
                      setVerifyEMail(true),
                    ]}
                    achievement={APP_STRING.HOME}
                  />
                </View>
              </View>
            </>
          )}
          {isLoginForm && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Pressable
                  onPress={() => [setLoginSetup(true), setLoginForm(false)]}
                  style={{ alignItems: "center", flexDirection: "row" }}
                >
                  <Image
                    style={globalStyle.back_image}
                    resizeMode="contain"
                    source={ImageConstant.EDITOR_PICK.BACK}
                  />
                  <Text style={globalStyle.marginLeft_20}>
                    Login with username
                  </Text>
                </Pressable>
                <Pressable onPress={() => onTouchOutside()}>
                  <Image
                    style={globalStyle.closeDialog}
                    resizeMode="contain"
                    source={ImageConstant.LOG_IN.CLOSE}
                  />
                </Pressable>
              </View>
              <View style={globalStyle.mainContainer}>
                <Text style={globalStyle.username}>Username *</Text>
                <TextInput
                  keyboardType="email-address"
                  placeholder="john"
                  style={globalStyle.textInput}
                ></TextInput>
                <Text style={[globalStyle.username, { marginTop: 18 }]}>
                  Password *
                </Text>
                <TextInput
                  keyboardType="twitter"
                  placeholder="******"
                  secureTextEntry={true}
                  style={globalStyle.textInput}
                ></TextInput>
                <Text
                  onPress={() => [
                    navigation.navigate("ResetPassword"),
                    onTouchOutside(),
                  ]}
                  style={globalStyle.margin_20}
                >
                  FORGOT PASSWORD
                </Text>
                <View style={globalStyle.margin_30}>
                  <BUTTON
                    buttonFormStyle={{
                      backgroundColor: COLORS.primary2,
                      shadowColor: COLORS.primary2,
                    }}
                    buttonType={"SMALL"}
                    labelStyleForm={{ fontSize: 18 }}
                    label={APP_STRING.SUBMIT}
                    action={() => [
                      navigation.navigate("Home"),
                      onTouchOutside(),
                    ]}
                    achievement={APP_STRING.HOME}
                  />
                </View>
                <Text
                  onPress={() => [
                    navigation.navigate("CompleteProfile"),
                    onTouchOutside(),
                  ]}
                  style={[
                    globalStyle.margin_30,
                    { marginTop: 20, textAlign: "center" },
                  ]}
                >
                  NEW USER? REGISTER HERE
                </Text>
              </View>
            </>
          )}
        </View>
      </DialogContent>
    </Dialog>
  );
};
export default LoginView;
