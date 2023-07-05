import React, { useState, useEffect, useRef } from "react";
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
import { Dropdown } from "react-native-material-dropdown-v2";
import csc from "country-state-city";
import ImagePicker from "react-native-image-crop-picker";
import { useNavigation } from "@react-navigation/native";
import { RadioButton, Switch } from "react-native-paper";
import { useSelector, useDispatch, connect } from "react-redux";
import { uploadUserLocation } from "../redux/services/uploadUserLocation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loader from "../component/Ui/loader";
import { Colors } from "react-native/Libraries/NewAppScreen";
import COLORS from "../utility/constant/Colors";
import BUTTON from "../component/Ui/button";
import { setGlobalAuthenticationFormData } from "../redux/webservice/baseBackendApiFormData";
import { uploadSongViaFile } from "../redux/services/uploadSongViaFileService";
import APP_STRING from "../utility/constant/StringConstants";
import ImageConstant from "../utility/constant/ImageConstant";
import CommonUtility from "../utility/constant/CommonUtility";
import globalStyle from "../assets/styles/styles";
import BottomSheet from "../component/Ui/bottomSheet";
var country = "India";
const UploadVideoThroughFile = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const [radioButtons, setGenres] = useState([
    { id: 1, txt: "Classical", isChecked: false, index: 0 },
    { id: 2, txt: "Bollywood", isChecked: false, index: 1 },
    { id: 3, txt: "Instrumental", isChecked: false, index: 2 },
    { id: 4, txt: "Light & Folk", isChecked: false, index: 3 },
    { id: 5, txt: "Western", isChecked: false, index: 4 },
    { id: 6, txt: "MusicCard Originals", isChecked: false, index: 5 },
  ]);
  const [statesArray, setStatesArray] = useState([]);
  const [cityArray, setCityArray] = useState([]);
  const [stateValue, setStateValue] = useState("");
  const [city, setCity] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const loggedInUserData = useSelector(
    (state) => state.loggedInUserReducer.userData
  );
  const [selectedGenre, setSelectedGenre] = useState("Classical");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [isCompete, setIsCompete] = useState(false);
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");

  const onToggleCompete = () => setIsCompete(!isCompete);

  useEffect(() => {
    setVideoFile(props.route.params);
    setToken();
    getStates();
  }, []);
  const setToken = async () => {
    let token = await CommonUtility.getInstance().getUserToken();
    setGlobalAuthenticationFormData(token);
  };
  const getStates = async () => {
    var arrayData = [];
    var newArrayData = [];
    arrayData = csc.getStatesOfCountry("101");
    var i;
    for (i = 0; i < arrayData.length; i++) {
      let obj = {
        value: arrayData[i].name,
        id: arrayData[i].id,
        country_id: arrayData[i].country_id,
      };
      newArrayData.push(obj);
    }
    setStatesArray(newArrayData);
  };
  const getCities = async (id) => {
    var incrementedId = id + 1;
    var arrayData = [];
    var newArrayData = [];
    arrayData = csc.getCitiesOfState(incrementedId.toString());

    var i;
    for (i = 0; i < arrayData.length; i++) {
      let obj = {
        value: arrayData[i].name,
        id: arrayData[i].id,
        state_id: arrayData[i].state_id,
      };
      newArrayData.push(obj);
    }
    setCityArray(newArrayData);
  };

  const pickAndCapture = async (TYPE) => {
    refRBSheet.current.open();
    if (TYPE == "CAMERA") {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        mediaType: "photo",
        cropping: true,
        compressImageQuality: 0.8,
      })
        .then((image) => {
          refRBSheet.current.close();
          generateImage(image);
        })
        .catch((e) => {
          Utils.getInstance().inflateToast(JSON.stringify(e.message));
        });
    } else if (TYPE == "GALLERY") {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        mediaType: "photo",
        cropping: true,
        compressImageQuality: 0.8,
      })
        .then((image) => {
          generateImage(image);
          refRBSheet.current.close();
        })
        .catch((e) => {});
    }
  };

  const generateImage = async (data) => {
    const localUri = data.path;
    const filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let fileType = data.mime;
    const newData = {
      uri: localUri,
      name: filename,
      type: fileType,
    };
    setCoverPhoto(newData);
  };

  const validateFields = () => {
    var message = "";
    if (CommonUtility.getInstance().isEmpty(coverPhoto)) {
      message = "Please choose cover photo";
    } else if (CommonUtility.getInstance().isEmpty(title)) {
      message = "Please enter Video title";
    } else if (CommonUtility.getInstance().isEmpty(about)) {
      message = "Please enter about video";
    }
    if (message == "") {
      return true;
    }
    CommonUtility.getInstance().inflateToast(message);
    return false;
  };

  const uploadSong = async () => {
    if (validateFields()) {
      try {
        setShowLoader(true);
        const formData = new FormData();
        formData.append("name", title);
        formData.append("about", about);
        formData.append("genre", selectedGenre);
        formData.append("competeForVideoContest", isCompete);
        formData.append("files", videoFile);
        formData.append("files", coverPhoto);
        const response = await uploadSongViaFile(formData);
        if (response) {
          setShowLoader(false);
          setTimeout(() => {
            CommonUtility.getInstance().inflateToast(
              APP_STRING.SONG_HAS_UPLOADED
            );
          }, 100);
          setTimeout(() => {
            navigation.navigate("MyUploads");
          }, 1000);
        }
      } catch (e) {
        setShowLoader(false);
        setTimeout(() => {
          CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
        }, 1000);
      }
    }
  };

  const uploadUserLocationCall = async (cityFrom) => {
    try {
      setShowLoader(true);
      let payload = {
        country: country,
        state: stateValue,
        city: cityFrom,
      };
      const response = await uploadUserLocation(payload);
      if (response) {
        setShowLoader(false);
        setTimeout(() => {
          CommonUtility.getInstance().inflateToast(APP_STRING.LOCATION_UPDATED);
        }, 300);
      }
    } catch (e) {
      setShowLoader(false);
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 1000);
    }
  };

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
  const renderRadioButton = (item) => {
    const { txt, isChecked, id } = item.item;
    return (
      <View style={globalStyle.view_row_radio_btn}>
        <RadioButton
          value={txt}
          status={selectedGenre == txt ? "checked" : "unchecked"}
          onPress={() => setSelectedGenre(txt)}
          color={COLORS.red}
        />
        <Text style={[{ color: COLORS.black, fontSize: 13 }, globalStyle.muli]}>
          {txt}
        </Text>
      </View>
    );
  };
  return (
    <>
      <View style={globalStyle.view_flex_one}>
        <Header onBackClick={() => navigation.goBack()} />
        <Loader isLoading={showLoader} />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          extraScrollHeight={120}
          contentContainerStyle={[
            globalStyle.paddingHorizontal_15,
            globalStyle.paddingVertical_40,
          ]}
          style={[globalStyle.white_background]}
        >
          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.textInput_margin,
            ]}
          >
            Cover picture *
          </Text>
          {coverPhoto == null ? (
            <Pressable
              onPress={() => refRBSheet.current.open()}
              style={[globalStyle.view_container, globalStyle.marginTop_20]}
            >
              <ImageBackground
                source={ImageConstant.UPLOAD_VIDEO.COVER_ICON}
                style={[globalStyle.cover_img_placeholder]}
              ></ImageBackground>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => refRBSheet.current.open()}
              style={[globalStyle.view_container, globalStyle.marginTop_20]}
            >
              <ImageBackground
                borderRadius={10}
                resizeMode="cover"
                source={{ uri: coverPhoto.uri }}
                style={[globalStyle.view_container, globalStyle.marginTop_20]}
              ></ImageBackground>
            </Pressable>
          )}

          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.textInput_margin,
            ]}
          >
            Tittle *
          </Text>
          <TextInput
            value={title}
            maxLength={50}
            onChangeText={(text) => setTitle(text)}
            secureTextEntry={false}
            placeholder="Enter title"
            keyboardType="default"
            style={[globalStyle.textInput]}
          ></TextInput>
          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.textInput_margin,
            ]}
          >
            About *
          </Text>
          <TextInput
            multiline
            value={about}
            maxLength={50}
            onChangeText={(text) => setAbout(text)}
            secureTextEntry={false}
            keyboardType="default"
            textAlignVertical={"top"}
            style={[globalStyle.textInput, globalStyle.textInput_sec]}
          ></TextInput>
          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.textInput_margin,
            ]}
            maxLength={20}
          >
            Genre *
          </Text>
          <FlatList
            numColumns={3}
            data={radioButtons}
            contentContainerStyle={globalStyle.Flex_1}
            renderItem={renderRadioButton}
          ></FlatList>
          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.textInput_margin,
            ]}
          >
            Add tags
          </Text>
          <TextInput
            secureTextEntry={false}
            placeholder="Enter tags"
            keyboardType="default"
            style={[globalStyle.textInput]}
          ></TextInput>
          {!CommonUtility.getInstance().isEmpty(loggedInUserData.location) ? (
            <>
              <Text
                style={[
                  globalStyle.email_text,
                  globalStyle.muli_bold,
                  globalStyle.textInput_margin,
                ]}
              >
                Location
              </Text>
              <TextInput
                secureTextEntry={false}
                placeholderTextColor="black"
                placeholder={
                  `India -` +
                  loggedInUserData.location.state +
                  ` - ` +
                  loggedInUserData.location.city
                }
                editable={false}
                keyboardType="default"
                style={[globalStyle.textInput]}
              ></TextInput>
            </>
          ) : (
            <>
              <Text
                style={[
                  globalStyle.email_text,
                  globalStyle.muli_bold,
                  globalStyle.textInput_margin,
                ]}
              >
                State
              </Text>
              <Dropdown
                value={stateValue}
                fontSize={12}
                itemPadding={15}
                placeholder="State"
                underlineColor={"transparent"}
                style={globalStyle.dropdown_container}
                data={statesArray}
                onChangeText={(value, index, data) => [
                  getCities(index),
                  setStateValue(value),
                ]}
              />
              <Text
                style={[
                  globalStyle.email_text,
                  globalStyle.muli_bold,
                  globalStyle.textInput_margin,
                ]}
              >
                City
              </Text>
              <Dropdown
                value={city}
                placeholder="City"
                fontSize={12}
                itemPadding={15}
                underlineColor={"transparent"}
                style={globalStyle.dropdown_container}
                data={cityArray}
                onChangeText={(value, index, data) => [
                  setCity(value),
                  uploadUserLocationCall(value),
                ]}
              />
            </>
          )}

          <View
            style={[
              globalStyle.upload_switch,
              globalStyle.paddingHorizontal_15,
            ]}
          >
            <Switch
              color={COLORS.primary3}
              value={isCompete}
              onValueChange={onToggleCompete}
            />
            <Text
              style={{
                color: COLORS.black,
                marginLeft: 10,
                fontSize: 14,
              }}
            >
              Compete for the video contest
            </Text>
          </View>
          <View style={[globalStyle.margin_30, globalStyle.marginBottom_20]}>
            <BUTTON
              buttonFormStyle={{
                backgroundColor: COLORS.primary2,
                shadowColor: COLORS.primary2,
              }}
              buttonType="SMALL"
              labelStyleForm={{ fontSize: 18 }}
              label={APP_STRING.SUBMIT}
              action={() => uploadSong()}
              achievement={APP_STRING.HOME}
            />
          </View>
          <BottomSheet
            openCamera={() => pickAndCapture("CAMERA")}
            openFiles={() => pickAndCapture("GALLERY")}
            reference={refRBSheet}
          ></BottomSheet>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};
export default UploadVideoThroughFile;
