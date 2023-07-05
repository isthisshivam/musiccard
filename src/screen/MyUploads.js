import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ImageBackground,
  useColorScheme,
  Dimensions,
  View,
  FlatList,
  BackHandler,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { deleteMyUploadsService } from "../redux/services/deleteMyUploadsService";
import { myUploadsGet } from "../redux/services/MyUploadsService";
import Loader from "../component/Ui/loader";
import { setGlobalAuthentication } from "../redux/webservice/baseBackendApi";
import ImageConstant from "../utility/constant/ImageConstant";
import globalStyle from "../assets/styles/styles";
import CommonUtility from "../utility/constant/CommonUtility";
import APP_STRING from "../utility/constant/StringConstants";
const { width, height } = Dimensions.get("window");
const MyUploads = () => {
  const navigation = useNavigation();
  const routes = useNavigationState((state) => state.routes);
  const [showLoader, setShowLoader] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [myUploads, setUploads] = useState([]);
  const [isEditable, setEditable] = useState(false);
  const [isAllSongsSelected, setAllSongsSelected] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [isUpdating, setUpdating] = useState(false);
  // from upload process if it leads to myuploads section on press back button move it to home screen
  const handleBackButtonClick = () => {
    const prevRoute =
      routes && routes.length >= 1 ? routes[routes.length - 2].name : "";
    CommonUtility.getInstance().inflateToast(prevRoute);
    if (
      prevRoute === "UploadVideoThroughFile" ||
      prevRoute === "UploadVideoViaUrl"
    ) {
      navigation.goBack(null);
      navigation.navigate("Home");
      return false;
    } else {
      navigation.goBack();
      return true;
    }
  };

  useEffect(() => {
    getToken();
    // add event handler to handle device back button press
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  const getToken = async () => {
    let token = await CommonUtility.getInstance().getUserToken();
    setGlobalAuthentication(token);
    getMyUploads();
  };

  const getMyUploads = async () => {
    try {
      setShowLoader(true);
      const response = await myUploadsGet();
      if (response) {
        setUploads(response);
        setShowLoader(false);
        setLoaded(true);
      }
    } catch (e) {
      setShowLoader(false);
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };
  const onEditCancelClick = () => {
    setEditable(false);
    setAllSongsSelected(false);
    let newSongs = myUploads.map((v) => ({
      ...v,
      isSelected: false,
      isEditable: false,
    }));
    setUploads(newSongs);
    setSelectedSongs([]);
  };
  const onAllSongsSelection = (newValue) => {
    setAllSongsSelected(newValue);
    let newSongs = myUploads.map((v) => ({
      ...v,
      isSelected: newValue,
    }));
    setUploads(newSongs);
    if (newValue) {
      setSelectedSongs(myUploads);
    } else {
      setSelectedSongs([]);
    }
  };
  const onSelectSongs = (item) => {
    const { _id, isSelected } = item.item;
    const theUploads = myUploads.map((theList) => {
      if (theList._id === _id) {
        return {
          ...theList,
          isSelected: !theList.isSelected,
        };
      } else {
        return theList;
      }
    });

    if (!isSelected) {
      setSelectedSongs([...selectedSongs, _id]);
    } else {
      let updatedAfterRemovingSelected = selectedSongs.filter(
        (theSong) => theSong !== _id
      );
      setSelectedSongs(updatedAfterRemovingSelected);
    }

    setUploads(theUploads);
    setUpdating(!isUpdating);
  };
  const deleteUploadsCall = async () => {
    try {
      let payload = {
        songs: selectedSongs,
      };
      let response = await deleteMyUploadsService(payload);
      if (response) {
        setEditable(false);
        setUpdating(!isUpdating);
        setTimeout(() => {
          // CommonUtility.getInstance().inflateToast(
          //   APP_STRING.SONG_HAS_REMOVED_IN_PLAYLIST
          // );
          getMyUploads();
        }, 1000);
      }
    } catch (e) {
      setEditable(false);
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };

  const Header = (props) => {
    const { onBackClick } = props;
    return (
      <View style={globalStyle.editor_pick_headerView}>
        <Pressable
          onPress={() => onBackClick()}
          style={globalStyle.alignItems_center}
        >
          <Image
            style={globalStyle.back_button}
            resizeMode="contain"
            source={ImageConstant.EDITOR_PICK.BACK}
          />
          <Text style={globalStyle.editor_pick_heading}>My Uploads</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Search")}
          style={globalStyle.alignItems_center}
        >
          <Image
            style={globalStyle.back_button}
            resizeMode="contain"
            source={ImageConstant.HOME.SEARCH}
          />
        </Pressable>
      </View>
    );
  };

  const emptyContainer = () => {
    return (
      <View style={globalStyle.emptyContainer}>
        <Text style={{ color: "black" }}>No Uploads Yet</Text>
      </View>
    );
  };
  const VideoContent = () => {
    return (
      <View style={[globalStyle.video_content_view, globalStyle.Flex_1]}>
        <FlatList
          data={myUploads}
          numColumns={2}
          keyExtractor={(item) => item.title.toString()}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => emptyContainer()}
          renderItem={(item) => renderItem(item)}
        />
      </View>
    );
  };
  const renderItem = (item) => {
    const {
      title,
      about,
      genre,
      coverPhotoUrl,
      songUrl,
      _id,
      isSelected,
      averageRating,
    } = item.item;
    console.log("averageRating", averageRating);
    // var rating = `4.7`;
    if (isEditable) {
      return (
        <Pressable
          onPress={() => onSelectSongs(item)}
          style={[globalStyle.EditorPick_imageView_container]}
        >
          <ImageBackground
            resizeMode="cover"
            style={globalStyle.image_my_upload}
            imageStyle={{ borderRadius: 4 }}
            source={
              coverPhotoUrl
                ? { uri: coverPhotoUrl }
                : ImageConstant.HOME.IMAGE_PLACEHOLDER
            }
          >
            <View
              style={{
                height: 160,
                width: width / 2.2,
                borderRadius: 5,
                position: "absolute",
                //backgroundColor: isSelected ? "#FAF9F6" : "transparent",
              }}
            >
              <CheckBox
                style={{
                  position: "absolute",
                  margin: 10,
                  height: 24,
                  width: 24,
                }}
                disabled={false}
                value={isSelected}
                //onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />
            </View>
            {averageRating && averageRating != 0 ? (
              <View style={globalStyle.EditorPick_row_container}>
                <Image
                  style={globalStyle.starImg}
                  source={ImageConstant.HOME.STAR}
                />
                <Text style={globalStyle.rating_txt}>{averageRating}</Text>
              </View>
            ) : null}
          </ImageBackground>
          <Text numberOfLines={1} style={globalStyle.songname}>
            {title}
          </Text>
          <Text numberOfLines={1} style={globalStyle.about}>
            {about}
          </Text>
        </Pressable>
      );
    } else {
      return (
        <Pressable
          onPress={() => navigation.navigate("Player", { title, songUrl, _id })}
          style={globalStyle.EditorPick_imageView_container}
        >
          <ImageBackground
            resizeMode="cover"
            style={globalStyle.image_my_upload}
            imageStyle={{ borderRadius: 4 }}
            source={{ uri: coverPhotoUrl }}
          >
            {averageRating && averageRating != 0 ? (
              <View style={globalStyle.EditorPick_row_container}>
                <Image
                  style={globalStyle.starImg}
                  source={ImageConstant.HOME.STAR}
                />
                <Text style={globalStyle.rating_txt}>{averageRating}</Text>
              </View>
            ) : null}
          </ImageBackground>
          <Text numberOfLines={2} style={globalStyle.songname}>
            {title}
          </Text>
          <Text numberOfLines={1} style={globalStyle.about}>
            {about}
          </Text>
        </Pressable>
      );
    }
  };

  return (
    <>
      <View style={[globalStyle.EditorPick_container, globalStyle.Flex_1]}>
        {/* <Header onBackClick={() => navigation.navigate("Home")} /> */}
        {isEditable ? (
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
            <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable onPress={onEditCancelClick}>
                <Image
                  style={{ height: 22, width: 22 }}
                  resizeMode="contain"
                  source={ImageConstant.APP.REMOVE}
                />
              </Pressable>

              {selectedSongs.length > 0 ? (
                <Text
                  style={{
                    fontSize: RFValue(15),
                    marginLeft: 15,
                    fontWeight: "500",
                  }}
                >
                  {selectedSongs.length + ` Item Selected`}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: RFValue(15),
                    marginLeft: 15,
                    fontWeight: "500",
                  }}
                >
                  {`No Item Selected`}
                </Text>
              )}
            </Pressable>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  height: 35,
                  width: 35,
                  marginRight: 10,
                }}
              >
                <CheckBox
                  style={{ height: 24, width: 24 }}
                  disabled={false}
                  value={isAllSongsSelected}
                  onValueChange={(newValue) => onAllSongsSelection(newValue)}
                />
              </View>

              {selectedSongs.length > 0 && (
                <Pressable
                  onPress={() => deleteUploadsCall()}
                  style={{
                    height: 35,
                    width: 35,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Image
                    style={{ height: 20, width: 20 }}
                    resizeMode="contain"
                    source={ImageConstant.APP.DELETE}
                  />
                </Pressable>
              )}
            </View>
          </View>
        ) : (
          <View
            style={{
              height: 55,
              //backgroundColor: Colors.lighter,
              width: "100%",
              borderBottomWidth: 1,
              paddingHorizontal: 18,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomColor: Colors.lighter,
            }}
          >
            <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable onPress={() => navigation.goBack()}>
                <Image
                  style={{ height: 22, width: 22 }}
                  resizeMode="contain"
                  source={ImageConstant.EDITOR_PICK.BACK}
                />
              </Pressable>

              <Text
                style={{
                  fontSize: RFValue(15),
                  marginLeft: 15,
                  fontWeight: "500",
                }}
              >
                My Uploads
              </Text>
            </Pressable>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Pressable
                onPress={() => [setEditable(true)]}
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  height: 35,
                  width: 35,
                  marginRight: 0,
                }}
              >
                <Image
                  style={{ height: 20, width: 20 }}
                  resizeMode="contain"
                  source={ImageConstant.MY_PROFILE.EDIT}
                />
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("Search")}
                style={globalStyle.alignItems_center}
              >
                <Image
                  style={globalStyle.back_button}
                  resizeMode="contain"
                  source={ImageConstant.HOME.SEARCH}
                />
              </Pressable>
            </View>
          </View>
        )}

        <Loader isLoading={showLoader} />
        {loaded && VideoContent()}
      </View>
    </>
  );
};
export default MyUploads;
