import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  useColorScheme,
  Dimensions,
  View,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../utility/constant/Colors";
import BUTTON from "../component/Ui/button";
import APP_STRING from "../utility/constant/StringConstants";
import ImageConstant from "../utility/constant/ImageConstant";
import globalStyle from "../assets/styles/styles";
const ResetPassword = () => {
  const navigation = useNavigation();
  const Header = () => {
    return (
      <View style={globalStyle.header_view}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            style={globalStyle.back_button}
            resizeMode="contain"
            source={ImageConstant.EDITOR_PICK.BACK}
          />
        </Pressable>

        <Text style={globalStyle.complete_profile}>Reset Password</Text>
      </View>
    );
  };
  return (
    <>
      <View style={globalStyle.view_flex_one}>
        <Header />
        <View style={globalStyle.main_wrapper_no_center}>
          <Text style={globalStyle.email_text}>Password *</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="******"
            style={globalStyle.textInput}
          ></TextInput>
          <View style={globalStyle.margin_30}></View>
          <Text style={globalStyle.email_text}>Confirm Password *</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="******"
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
              label={APP_STRING.SUBMIT}
              action={() => [alert("Submit Clicked")]}
              achievement={APP_STRING.HOME}
            />
          </View>
        </View>
      </View>
    </>
  );
};
export default ResetPassword;
