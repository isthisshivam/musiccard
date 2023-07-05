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
import { useSelector, useDispatch, connect } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import ImageConstant from "../utility/constant/ImageConstant";
import globalStyle from "../assets/styles/styles";
import APP_STRING from "../utility/constant/StringConstants";
const UploadVideo = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onUploadClick = async () => {
    ImagePicker.openPicker({
      mediaType: "video",
      compressVideoPreset: "MediumQuality",
    }).then((video) => {
      let videoFile = {
        type: video.mime,
        uri: video.path,
        name: JSON.stringify(+new Date() + APP_STRING.VIDEO_TYPE),
      };
      navigation.navigate("UploadVideoThroughFile", videoFile);
    });
  };

  const onRecordClick = async () => {
    ImagePicker.openCamera({
      mediaType: "video",
    }).then((image) => {});
  };
  const Header = () => {
    return (
      <View style={globalStyle.home_header}>
        <Text style={[globalStyle.complete_profile, globalStyle.marginLeft_0]}>
          Upload your video
        </Text>

        <View style={globalStyle.align_center}>
          <Pressable onPress={() => navigation.navigate("Search")}>
            <Image
              style={globalStyle.back_button}
              resizeMode="contain"
              source={ImageConstant.HOME.SEARCH}
            />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={globalStyle.view_flex_one}>
        <Header />

        <ScrollView
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          extraScrollHeight={120}
          style={[
            globalStyle.white_background,
            globalStyle.paddingVertical_15,
            globalStyle.paddingHorizontal_20,
          ]}
        >
          <Text style={(globalStyle.muli_semiBold, globalStyle.upload_desc)}>
            Upload your video song and{"\n"}share your talent with everyone
          </Text>
          <Text style={(globalStyle.muli_semiBold, globalStyle.ques_upload)}>
            How do you want share a video?
          </Text>

          <View
            style={[
              globalStyle.upload_container,
              globalStyle.justifyContent_spaceBetween,
            ]}
          >
            <Pressable
              onPress={onUploadClick}
              style={globalStyle.view_container}
            >
              <Image
                style={globalStyle.img_container}
                resizeMode="contain"
                source={ImageConstant.UPLOAD_VIDEO.UPLOAD}
              />
              <Text
                style={[
                  globalStyle.complete_profile,
                  globalStyle.fontSize_16,
                  globalStyle.marginLeft_0,
                  globalStyle.margin_top_8,
                ]}
              >
                Upload
              </Text>
            </Pressable>
            <Pressable
              onPress={() => onRecordClick()}
              style={globalStyle.view_container}
            >
              <Image
                style={globalStyle.img_container}
                resizeMode="contain"
                source={ImageConstant.UPLOAD_VIDEO.CAMERA}
              />
              <Text
                style={[
                  globalStyle.complete_profile,
                  globalStyle.fontSize_16,
                  globalStyle.marginLeft_0,
                  globalStyle.margin_top_8,
                ]}
              >
                Record
              </Text>
            </Pressable>
          </View>
          <View style={[globalStyle.mainView_upload]}>
            <Pressable
              onPress={() => navigation.navigate("UploadVideoViaUrl")}
              style={[globalStyle.view_container]}
            >
              <Image
                style={globalStyle.img_container}
                resizeMode="contain"
                source={ImageConstant.UPLOAD_VIDEO.CAMERA}
              />
              <Text
                style={[
                  globalStyle.complete_profile,
                  globalStyle.fontSize_16,
                  globalStyle.marginLeft_0,
                  globalStyle.margin_top_8,
                ]}
              >
                Add video URL
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default UploadVideo;
