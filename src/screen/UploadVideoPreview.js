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
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { RadioButton, Switch } from "react-native-paper";
import { useSelector, useDispatch, connect } from "react-redux";
import { userProfileGet } from "../redux/services/getUserProfileService";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loader from "../component/Ui/loader";
import { Colors } from "react-native/Libraries/NewAppScreen";
import COLORS from "../utility/constant/Colors";
import BUTTON from "../component/Ui/button";
import APP_STRING from "../utility/constant/StringConstants";
import ImageConstant from "../utility/constant/ImageConstant";
import CommonUtility from "../utility/constant/CommonUtility";
import globalStyle from "../assets/styles/styles";

const UploadVideoPreview = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const Header = (props) => {
    const { onBackClick } = props;
    return (
      <View style={globalStyle.home_header}>
        <Pressable
          onPress={() => onBackClick()}
          style={globalStyle.align_center}
        >
          <Image
            style={globalStyle.back_button}
            resizeMode="contain"
            source={ImageConstant.EDITOR_PICK.BACK}
          />

          <Text
            style={{ fontSize: RFValue(15), marginLeft: 15, fontWeight: "500" }}
          >
            Upload your video

          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <View style={globalStyle.view_flex_one}>
        <Header onBackClick={() => navigation.goBack()} />

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          extraScrollHeight={120}
          contentContainerStyle={[
            globalStyle.paddingHorizontal_15,
            globalStyle.paddingVertical_20,
          ]}
          style={[globalStyle.white_background]}
        >
          <ImageBackground
            source={ImageConstant.UPLOAD_VIDEO.VIDEO_VIEW}
            resizeMode="cover"
            style={[{ height: 230, width: "100%" }]}
          ></ImageBackground>
          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.textInput_margin,
              globalStyle.dark_text_color,
            ]}
          >
            Cover picture
          </Text>

          <ImageBackground
            source={ImageConstant.HOME.VIDEO1}
            resizeMode="contain"
            style={[globalStyle.upload_cover_image]}
          ></ImageBackground>

          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.textInput_margin,
              globalStyle.dark_text_color,
            ]}
          >
            Title
          </Text>
          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.black_text_color,
            ]}
          >
            Lagaya Dil (Punjabi mix cover)
          </Text>
          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.textInput_margin,
              globalStyle.dark_text_color,
            ]}
          >
            About
          </Text>
          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.black_text_color,
            ]}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>

          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.textInput_margin,
              globalStyle.dark_text_color,
            ]}
          >
            Dated
          </Text>
          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.black_text_color,
            ]}
          >
            14-Oct-2020
          </Text>

          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.textInput_margin,
              globalStyle.dark_text_color,
            ]}
          >
            Genre
          </Text>
          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.black_text_color,
            ]}
          >
            Classical
          </Text>

          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.textInput_margin,
              globalStyle.dark_text_color,
            ]}
          >
            Tags
          </Text>
          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.black_text_color,
            ]}
          >
            Tag name, Tag name
          </Text>

          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.textInput_margin,
              globalStyle.dark_text_color,
            ]}
          >
            Location
          </Text>
          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.black_text_color,
            ]}
          >
            Dehradun, Uttarakhand, India
          </Text>
          <View style={globalStyle.margin_30}>
            <BUTTON
              buttonFormStyle={{
                backgroundColor: COLORS.primary2,
                shadowColor: COLORS.primary2,
              }}

              buttonType="SMALL"
              labelStyleForm={{ fontSize: 18 }}

              label={APP_STRING.UPLOAD}
              action={() => [alert("In Progress")]}
              achievement={APP_STRING.HOME}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};
export default UploadVideoPreview;
