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
  Linking,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch, connect } from "react-redux";
import { userProfileGet } from "../redux/services/getUserProfileService";
import { loggedInUserGet } from "../redux/services/getLoggedInUserProfile";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loader from "../component/Ui/loader";
import COLORS from "../utility/constant/Colors";
import * as ActionType from "../redux/action/index";
import BUTTON from "../component/Ui/button";
import APP_STRING from "../utility/constant/StringConstants";
import ImageConstant from "../utility/constant/ImageConstant";
import CommonUtility from "../utility/constant/CommonUtility";
import globalStyle from "../assets/styles/styles";
import Separator from "../component/Ui/Seperator";
import Options from "../component/Ui/options";
import { myUploadsGet } from "../redux/services/MyUploadsService";

//var userName = null;
var userEmail = null;
var userAbout = null;
var phoneNumber = "";
var userProfileUrl = null;
const MyProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [myUploadCount, setMyUploadCount] = useState(0);

  const openUrl = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getLoggedInUserProfile();
      getMyUploads();
    });

    return unsubscribe;
  }, []);

  const getLoggedInUserProfile = async () => {
    try {
      //setShowLoader(true);
      const response = await loggedInUserGet();
      if (response) {
        dispatch({
          type: "LOGGED_IN_USER_DETAILS",
          payload: response,
        });
        console.log("loggedinuserData=>", JSON.stringify(response));
        setAllUserDetails(response);
        saveUserPersonalInformation(response);
        //setShowLoader(false);
      }
    } catch (e) {
      setShowLoader(false);
    }
  };
  const saveUserPersonalInformation = async (response) => {
    await CommonUtility.getInstance().setStoreData(
      APP_STRING.USER_INFORMATION,
      response
    );
    getUserProfileInformation();
  };
  const getMyUploads = async () => {
    try {
      setShowLoader(true);
      const response = await myUploadsGet();
      if (response) {
        setMyUploadCount(response.length);
      }
      setShowLoader(false);
    } catch (e) {
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };

  const getUserProfileInformation = async () => {
    let userInfo =
      await CommonUtility.getInstance().getUserPersonalInformation();
    console.log("getUserProfileInformation", JSON.stringify(userInfo));
    setAllUserDetails(userInfo);
  };
  const setAllUserDetails = async (inheritedData) => {
    const { email, firstname, lastname, about, phone, profilePhotoUrl } =
      inheritedData;
    setUserName(`${firstname} ${lastname}`);
    userEmail = email;
    userAbout = about;
    if (phone) {
      phoneNumber = phone;
    }

    if (profilePhotoUrl) userProfileUrl = profilePhotoUrl;
  };

  const onLogoutPress = () => {
    CommonUtility.getInstance()
      .removeStoreData(APP_STRING.USER_TOKEN)
      .then(() => {
        navigation.reset({
          routes: [{ name: "Login" }],
        });
      });
  };
  const Header = () => {
    return (
      <View style={globalStyle.home_header}>
        <Text
          style={[globalStyle.complete_profile, globalStyle.marginLeft_0]}
        >{`My Profile`}</Text>

        <View style={globalStyle.align_center}>
          <Pressable onPress={onLogoutPress}>
            <Image
              style={globalStyle.margin_right_20}
              resizeMode="contain"
              source={ImageConstant.HOME.LOGOUT}
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Notification")}>
            <Image
              onPress={() => navigation.goBack()}
              style={globalStyle.back_button}
              resizeMode="contain"
              source={ImageConstant.HOME.NOTIFICATION}
            />
          </Pressable>
        </View>
      </View>
    );
  };

  const UserPlace = () => {
    return (
      <View style={globalStyle.myDp_container}>
        <ImageBackground
          source={
            userProfileUrl
              ? { uri: userProfileUrl }
              : ImageConstant.MY_PROFILE.RESTUSER
          }
          style={globalStyle.profile_img}
          borderRadius={46}
        ></ImageBackground>
        <View style={globalStyle.day_list_container}>
          <Text
            style={[globalStyle.username_my_profile, globalStyle.muli_semiBold]}
          >
            {userName}
          </Text>
          <Text style={[globalStyle.mobile, globalStyle.muli_Light]}>
            {phoneNumber}
          </Text>
          <Text
            style={[globalStyle.email_text_profile, globalStyle.muli_Light]}
          >
            {userEmail}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <View style={globalStyle.view_flex_one}>
        <Header />
        {showLoader ? (
          <>
            <Loader isLoading={showLoader} />
          </>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
            extraScrollHeight={120}
            style={[globalStyle.white_background]}
          >
            <UserPlace />
            <Separator></Separator>
            <View style={globalStyle.user_profile_main_container}>
              <View style={globalStyle.user_profile_main_container_flex_row}>
                <Image
                  borderRadius={20}
                  style={globalStyle.gift_img}
                  source={ImageConstant.APP.GOLD}
                ></Image>
                <View style={globalStyle.main_follower_view}>
                  <Text
                    style={[
                      globalStyle.text_follower,
                      globalStyle.muli_semiBold,
                    ]}
                  >
                    05
                  </Text>
                  <Text
                    style={[globalStyle.text_follower, globalStyle.muli_Light]}
                  >
                    Monthly
                  </Text>
                </View>
              </View>
              <View style={globalStyle.user_profile_main_container_flex_row}>
                <Image
                  borderRadius={20}
                  style={globalStyle.gift_img}
                  source={ImageConstant.APP.BURN}
                ></Image>
                <View style={globalStyle.main_follower_view}>
                  <Text
                    style={[
                      globalStyle.text_follower,
                      globalStyle.muli_semiBold,
                    ]}
                  >
                    05
                  </Text>
                  <Text
                    style={[globalStyle.text_follower, globalStyle.muli_Light]}
                  >
                    Weekly
                  </Text>
                </View>
              </View>
              <View style={globalStyle.user_profile_main_container_flex_row}>
                <Image
                  borderRadius={20}
                  style={globalStyle.gift_img}
                  source={ImageConstant.APP.SILVER}
                ></Image>
                <View style={globalStyle.user_profile_child_container}>
                  <Text
                    style={[
                      globalStyle.text_follower,
                      globalStyle.muli_semiBold,
                    ]}
                  >
                    05
                  </Text>
                  <Text
                    style={[globalStyle.text_follower, globalStyle.muli_Light]}
                  >
                    Daily
                  </Text>
                </View>
              </View>
            </View>
            <Separator></Separator>
            <Text
              style={[globalStyle.user_about_profile, globalStyle.muli_Light]}
            >
              {userAbout}
            </Text>
            <Pressable
              onPress={() => navigation.navigate("EditProfile")}
              style={[
                globalStyle.edit_profile_btn,
                globalStyle.justifyContent_spaceBetween,
              ]}
            >
              <Image
                style={globalStyle.img_container_row}
                source={ImageConstant.MY_PROFILE.EDIT}
              ></Image>
              <Text
                style={[
                  globalStyle.edit_profile_txt,
                  globalStyle.muli_semiBold,
                ]}
              >
                {`Edit Profile`}
              </Text>
            </Pressable>
            <Separator></Separator>

            <Options
              image={ImageConstant.APP.UPLOAD_NEW}
              title={`My Upload ` + `(` + myUploadCount + `)`}
              onClick={() => navigation.navigate("MyUploads")}
            />

            <Separator></Separator>
            <Options
              image={ImageConstant.APP.TIPS}
              title="Tips"
              onClick={() => navigation.navigate("Tips")}
            />
            <Separator></Separator>
            <Options
              image={ImageConstant.APP.REQUEST}
              title="Requests"
              onClick={() => navigation.navigate("Requests")}
            />

            <Separator></Separator>
            <Options
              image={require("../assets/images/insurance.png")}
              title="Privacy Policy"
              onClick={() => openUrl("https://musiccard.app/privacy-policy/")}
            />
            <Separator></Separator>
            <Options
              image={require("../assets/images/insurance.png")}
              title="Terms & Conditions"
              onClick={() =>
                openUrl("https://musiccard.app/terms-and-conditions/")
              }
            />
          </ScrollView>
        )}
      </View>
    </>
  );
};
export default MyProfile;
