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
  Pressable,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-material-dropdown-v2";
import csc from "country-state-city";
import ImagePicker from "react-native-image-crop-picker";
import { useSelector, useDispatch, connect } from "react-redux";
import { setGlobalAuthenticationFormData } from "../redux/webservice/baseBackendApiFormData";
import Loader from "../component/Ui/loader";
import COLORS from "../utility/constant/Colors";
import BUTTON from "../component/Ui/button";
import APP_STRING from "../utility/constant/StringConstants";
import ImageConstant from "../utility/constant/ImageConstant";
import CommonUtility from "../utility/constant/CommonUtility";
import globalStyle from "../assets/styles/styles";
import BottomSheet from "../component/Ui/bottomSheet";
import { uploadProfilePicPatch } from "../redux/services/uploadProfilePicService";
import { uploadUserLocation } from "../redux/services/uploadUserLocation";
import { getIndiaLocation } from "../redux/services/getIndiaLocation";
import { editUserInformation } from "../redux/services/editUserPersonalInformationService";
import { Colors } from "react-native/Libraries/NewAppScreen";
var country = "India";
var ONE = 1;
var cityTemp = null;
const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const loggedInUserData = useSelector((state) => state.loggedInUserReducer);
  const [showLoader, setShowLoader] = useState(false);
  const [statesArray, setStatesArray] = useState([]);
  const [cityArray, setCityArray] = useState([]);
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [city, setCity] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  useEffect(() => {
    getLocationData();
    getUserProfileInformation();
  }, []);

  const getUserProfileInformation = async () => {
    let userInfo =
      await CommonUtility.getInstance().getUserPersonalInformation();

    setAllUserDetails(userInfo);
  };
  const setAllUserDetails = async (loggedInUserData) => {
    const { location, phone } = loggedInUserData;
    if (location) {
      setCity(location.city);
      setStateValue(location.state);
    }
    if (phone) {
      setContactNumber(phone.replace(/[^0-9]/g, ""));
    }
    setUserPicture(loggedInUserData.profilePhotoUrl);
    const fullName = `${loggedInUserData.firstname} ${loggedInUserData.lastname}`;
    setName(fullName);
    setAbout(loggedInUserData.about);
  };

  const getLocationData = async () => {
    try {
      setShowLoader(true);
      const response = await getIndiaLocation();
      if (response) {
        setStates(response);
        setShowLoader(false);
      }
    } catch (e) {
      setShowLoader(false);
    }
  };

  const setStates = async (array) => {
    var newArrayData = [];
    for (var i = 0; i < array.length; i++) {
      let obj = {
        value: array[i].name,
        id: array[i].id,
        cities: array[i].cities,
      };
      newArrayData.push(obj);
    }
    setStatesArray(newArrayData);
  };
  const setCities = async (id) => {
    const result = statesArray.filter((item) => item.id == id + ONE);
    var array = result[0].cities;
    var newArrayData = [];
    for (var i = 0; i < array.length; i++) {
      let obj = {
        value: array[i].name,
        id: array[i].id,
        zone: array[i].zone,
      };
      newArrayData.push(obj);
    }
    setCityArray(newArrayData);
  };
  const Header = (props) => {
    const { onBackClick } = props;
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
          justifyContent: "space-between",
          borderBottomColor: Colors.lighter,
        }}
      >
        <Pressable
          onPress={() => onBackClick()}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Image
            style={{ height: 22, width: 22 }}
            resizeMode="contain"
            source={ImageConstant.EDITOR_PICK.BACK}
          />
          <Text
            style={{ fontSize: RFValue(15), marginLeft: 15, fontWeight: "500" }}
          >
            Edit Profile
          </Text>
        </Pressable>
      </View>
    );
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

    let fileType = data.mime;
    const newData = {
      uri: localUri,
      name: filename,
      type: fileType,
    };
    setUserPicture(localUri);
    let token = await CommonUtility.getInstance().getUserToken();
    setGlobalAuthenticationFormData(token);
    setTimeout(() => {
      uploadProfilePic(newData);
    }, 1000);
  };

  const uploadProfilePic = async (imageIs) => {
    try {
      setShowLoader(true);
      const formData = new FormData();
      formData.append("image", imageIs);
      const response = await uploadProfilePicPatch(formData);
      if (response) {
        setShowLoader(false);
        setTimeout(() => {
          CommonUtility.getInstance().inflateToast(
            APP_STRING.PROFILE_PIC_UPDATED
          );
        }, 100);
      }
    } catch (e) {
      setShowLoader(false);
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 1000);
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
          updateUserPersonalInformation();
          // CommonUtility.getInstance().inflateToast(APP_STRING.LOCATION_UPDATED);
        }, 300);
      }
    } catch (e) {
      setShowLoader(false);
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 1000);
    }
  };
  const validateFields = () => {
    var tempContactNum = contactNumber.split(" ").join("");
    var message = "";
    if (CommonUtility.getInstance().isEmpty(name)) {
      message = APP_STRING.ENTER_F_NAME + ` ` + APP_STRING.ENTER_L_NAME;
    } else if (CommonUtility.getInstance().isEmpty(contactNumber)) {
      message = APP_STRING.ENTER_CO_NUM;
    } else if (tempContactNum.length < 10) {
      message = APP_STRING.ENTER_VALID_CO_NUM;
    } else if (CommonUtility.getInstance().isEmpty(about)) {
      message = APP_STRING.ENTER_ABOUT;
    } else if (CommonUtility.getInstance().isEmpty(city)) {
      message = APP_STRING.CITY_ERROR;
    }

    if (message == "") {
      return true;
    }
    CommonUtility.getInstance().inflateToast(message);
    return false;
  };
  const updateUserPersonalInformation = async () => {
    if (validateFields()) {
      var lastName = "";
      var firstName = "";
      try {
        setShowLoader(true);
        if (name.indexOf(" ") >= 0) {
          let data = name.trim().split(" ");
          let [fname, ...lname] = data;
          firstName = fname;
          lastName = lname.join(" ");
        } else {
          firstName = name;
          lastName = "";
        }

        let payload = {
          firstname: firstName,
          lastname: lastName,
          phone: contactNumber,
          about: about,
        };

        const response = await editUserInformation(payload);
        if (response) {
          setShowLoader(false);
          setTimeout(() => {
            CommonUtility.getInstance().inflateToast(
              APP_STRING.USER_INFORMATION_UPDATED
            );
            navigation.goBack();
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
  return (
    <>
      <View style={globalStyle.view_flex_one}>
        <Header onBackClick={() => navigation.goBack()} />
        <Loader isLoading={showLoader} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          extraScrollHeight={120}
          contentContainerStyle={globalStyle.paddingHorizontal_20}
          style={[globalStyle.white_background]}
        >
          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.textInput_margin,
            ]}
          >
            Profile picture *
          </Text>
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={globalStyle.editImage}
          >
            <ImageBackground
              source={
                userPicture
                  ? { uri: userPicture }
                  : ImageConstant.MY_PROFILE.RESTUSER
              }
              style={globalStyle.profile_img_edit}
              borderRadius={60}
            ></ImageBackground>
          </TouchableOpacity>
          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.textInput_margin,
            ]}
          >
            Full name *
          </Text>
          <TextInput
            value={name}
            onChangeText={(value) => setName(value)}
            secureTextEntry={false}
            placeholder="Full name"
            keyboardType="default"
            style={globalStyle.textInput}
            maxLength={40}
          ></TextInput>
          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.textInput_margin,
            ]}
          >
            Mobile *
          </Text>
          <TextInput
            value={contactNumber}
            maxLength={10}
            onChangeText={(value) =>
              setContactNumber(value.replace(/[^0-9]/g, ""))
            }
            secureTextEntry={false}
            placeholder="Mobile"
            keyboardType="number-pad"
            style={globalStyle.textInput}
          ></TextInput>
          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.textInput_margin,
            ]}
          >
            State *
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
              setCities(index),
              setStateValue(value),
              setCity(""),
            ]}
          />
          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.textInput_margin,
            ]}
          >
            City *
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
              (cityTemp = value),
            ]}
          />
          <Text
            style={[
              globalStyle.email_text,
              globalStyle.muli_bold,
              globalStyle.textInput_margin,
            ]}
          >
            Tell us about yourself *
          </Text>
          <TextInput
            multiline
            value={about}
            onChangeText={(value) => setAbout(value)}
            secureTextEntry={false}
            keyboardType="default"
            textAlignVertical={"top"}
            style={[globalStyle.textInput, globalStyle.text_top]}
          ></TextInput>
          <View style={[globalStyle.margin_30, globalStyle.marginBottom_30]}>
            <BUTTON
              buttonFormStyle={{
                backgroundColor: COLORS.primary2,
                shadowColor: COLORS.primary2,
              }}
              buttonType="SMALL"
              labelStyleForm={globalStyle.button_font_18}
              label={APP_STRING.SAVE}
              action={() => [uploadUserLocationCall(cityTemp)]}
              achievement={APP_STRING.REGISTER}
            />
          </View>
        </ScrollView>
        <BottomSheet
          openCamera={() => pickAndCapture("CAMERA")}
          openFiles={() => pickAndCapture("GALLERY")}
          reference={refRBSheet}
        ></BottomSheet>
      </View>
    </>
  );
};
export default EditProfile;
