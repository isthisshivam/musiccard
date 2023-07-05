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
} from "react-native";
import Skeletons from "../component/Ui/skelton";
import { useSelector, useDispatch } from "react-redux";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Loader from "../component/Ui/loader";
import { setGlobalAuthentication } from "../redux/webservice/baseBackendApi";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { allSongsGet } from "../redux/services/allSongService";
import { getAllTopRatedSongs } from "../redux/services/getAllTopRatedSongsService";
import { loggedInUserGet } from "../redux/services/getLoggedInUserProfile";
import { getAllEditorPickSongs } from "../redux/services/getAllEditorPickSongsService";
import { getAllTrendingArtist } from "../redux/services/getAllTrendingArtist";
import { getUsersPickService } from "../redux/services/userPickService";
import ImageConstant from "../utility/constant/ImageConstant";
import DummyData from "../DummyData/DummyData";
import CommonUtility from "../utility/constant/CommonUtility";
import globalStyle from "../assets/styles/styles";
import APP_STRING from "../utility/constant/StringConstants";

var userEmail = null;
var userAbout = null;
var phoneNumber = "";
var userProfileUrl = null;

const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [userName, setUserName] = useState("");
  // get sections data
  const [topRatedArray, setTopRatedArray] = useState([]);
  const [trendingArtistArray, setTrendingArtistArray] = useState([]);
  const [editorPickArray, setEditorsPickArray] = useState([]);
  const [userPickArray, setUserPickArray] = useState([]);

  // useEffect(() => {
  //   if (isFocused) {
  //     getUserToken();
  //   }
  // }, [isFocused]);
  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      getUserToken();
    });
    return () => {
      focus();
    };
  }, []);

  const getUserToken = async () => {
    const token = await CommonUtility.getInstance().getUserToken();
    setGlobalAuthentication(token);
    //await getAllSongs();
    await getUsersPickSongs();
    await getUserProfileInformation();
    await gteTopRatedSongsCall();
    await getAllEditorPickSongsCall();
    await getAllTrendingArtistCall();
  };

  const setAllUserDetails = async (inheritedData) => {
    const { email, firstname, lastname, about, phone, profilePhotoUrl } =
      inheritedData;
    setUserName(`${firstname}'s`);
    userEmail = email;
    userAbout = about;
    if (phone) {
      phoneNumber = phone;
    }
    if (profilePhotoUrl) userProfileUrl = profilePhotoUrl;
    saveUserPersonalInformation(inheritedData);
  };

  const saveUserPersonalInformation = async (response) => {
    await CommonUtility.getInstance().setStoreData(
      APP_STRING.USER_INFORMATION,
      response
    );
  };

  const gteTopRatedSongsCall = async () => {
    try {
      setShowLoader(true);
      const response = await getAllTopRatedSongs();
      if (response) {
        setTopRatedArray(response);
        setShowLoader(false);
      }
    } catch (e) {
      setShowLoader(false);
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };

  const getAllEditorPickSongsCall = async () => {
    try {
      setShowLoader(true);
      const response = await getAllEditorPickSongs();
      if (response) {
        setEditorsPickArray(response);
        setShowLoader(false);
      }
    } catch (e) {
      setShowLoader(false);
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };
  const getAllTrendingArtistCall = async () => {
    try {
      setShowLoader(true);
      const response = await getAllTrendingArtist();
      if (response) {
        setTrendingArtistArray(response);
        setShowLoader(false);
      }
    } catch (e) {
      setShowLoader(false);
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };

  const getUsersPickSongs = async () => {
    try {
      setShowLoader(true);
      const response = await getUsersPickService();
      // console.log("pickArray=>", response);
      if (response) {
        setUserPickArray(response);
        console.log("pickArray=>", userPickArray);
        setShowLoader(false);
      }
    } catch (e) {
      setShowLoader(false);
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };
  const getUserProfileInformation = async () => {
    try {
      setShowLoader(true);
      const response = await loggedInUserGet();
      if (response) {
        dispatch({
          type: "LOGGED_IN_USER_DETAILS",
          payload: response,
        });

        await setAllUserDetails(response);
        setShowLoader(false);
      }
    } catch (e) {
      setShowLoader(false);
    }
  };
  const Header = () => {
    return (
      <View style={globalStyle.home_header}>
        <Pressable onPress={() => navigation.navigate("MyProfile")}>
          <ImageBackground
            style={{
              height: 36,
              width: 36,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 18,
            }}
            imageStyle={{ borderRadius: 18 }}
            // resizeMode="contain"
            source={
              userProfileUrl
                ? { uri: userProfileUrl }
                : ImageConstant.MY_PROFILE.RESTUSER
            }
          />
        </Pressable>

        <Image
          style={globalStyle.music_card_logo}
          resizeMode="contain"
          source={ImageConstant.SPLASH.APP_LOGO_GRAY}
        />
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
  const VideoOfDay = () => {
    return (
      <Pressable
        onPress={() => navigation.navigate("VideoOfTheDay")}
        style={globalStyle.paddingVertical_15}
      >
        <ImageBackground
          source={ImageConstant.HOME.VIDEO_OF_DAY}
          borderRadius={7}
          style={globalStyle.VideoOfDay_image}
          imageStyle={globalStyle.image_resize_cover}
        >
          <Pressable style={globalStyle.VideoOfDay_Button}>
            <Text
              onPress={() => navigation.navigate("VideoOfTheDay")}
              style={globalStyle.VideoOfDay_text}
            >
              Videos of the Day
            </Text>
            <Image
              style={globalStyle.see_more_text}
              resizeMode="contain"
              source={ImageConstant.HOME.SEE_MORE}
            />
          </Pressable>
          <Text
            onPress={() => navigation.navigate("VideoOfTheDay")}
            numberOfLines={1}
            style={(globalStyle.video_of_day_desc, globalStyle.muli)}
          >
            Classical Bollywood Instrumental... +MoreInfo
          </Text>
        </ImageBackground>
      </Pressable>
    );
  };

  const Headings = (props) => {
    const { MT, BH, SH, onClickSH } = props;
    return (
      <View style={[globalStyle.video_content_heading, { marginTop: MT }]}>
        <Text
          style={[globalStyle.video_content_heading_BH, globalStyle.muli_bold]}
        >
          {BH}
        </Text>
        <Pressable onPress={() => onClickSH()} style={globalStyle.sh_button}>
          <Text style={[globalStyle.sh_text, globalStyle.muli_bold]}>{SH}</Text>
          <Image
            style={globalStyle.see_more_img}
            resizeMode="contain"
            source={ImageConstant.HOME.SEE_MORE}
          />
        </Pressable>
      </View>
    );
  };
  const VideoContent = (data) => {
    return (
      <FlatList
        data={data.slice(0, 7)}
        horizontal
        maxToRenderPerBatch={12}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={globalStyle.white_background}
        renderItem={(item) => renderItem(item)}
      />
    );
  };
  const renderItem = (item) => {
    const { title, about, coverPhotoUrl, songUrl, _id, averageRating } =
      item.item;
    //console.log("renderItem.Home", item);
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("Player", { title, songUrl, coverPhotoUrl, _id })
        }
        style={globalStyle.video_content_item_view}
      >
        <ImageBackground
          resizeMode="cover"
          borderRadius={8}
          style={globalStyle.image_item}
          source={
            coverPhotoUrl == null
              ? ImageConstant.HOME.VIDEO1
              : { uri: coverPhotoUrl }
          }
        >
          {averageRating && averageRating != 0 ? (
            <View style={globalStyle.star_rating_container}>
              <Image
                style={globalStyle.star_img}
                source={ImageConstant.HOME.STAR}
              />
              <Text style={globalStyle.rating_text}>{averageRating}</Text>
            </View>
          ) : (
            <></>
          )}
        </ImageBackground>
        <Text
          numberOfLines={1}
          style={[globalStyle.song_name, globalStyle.muli_bold]}
        >
          {title}
        </Text>
        <Text
          numberOfLines={1}
          style={[globalStyle.singer_name, globalStyle.muli]}
        >
          {about}
        </Text>
      </Pressable>
    );
  };
  const TrendingArtist = () => {
    return (
      <FlatList
        data={trendingArtistArray.slice(0, 5)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={globalStyle.white_background}
        renderItem={(item) => renderTrendingArtist(item)}
      />
    );
  };
  const renderTrendingArtist = (item) => {
    const { firstname, about, profilePhotoUrl, songUrl, _id } = item.item;
    return (
      <Pressable
        onPress={() => navigation.navigate("SingerProfile", _id)}
        style={globalStyle.trend_view_container}
      >
        <ImageBackground
          style={globalStyle.trend_image_view}
          resizeMode={profilePhotoUrl ? "cover" : "contain"}
          imageStyle={globalStyle.borderRadius_divide_2}
          source={
            profilePhotoUrl
              ? { uri: profilePhotoUrl }
              : ImageConstant.SPLASH.APP_LOGO_GRAY
          }
        />
        <Text
          numberOfLines={1}
          style={[globalStyle.trend_song_name, globalStyle.muli_bold]}
        >
          {firstname}
        </Text>
        <Text
          numberOfLines={1}
          style={[globalStyle.trend_song_desc, globalStyle.muli]}
        >
          {about}
        </Text>
      </Pressable>
    );
  };
  loadingView = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={(globalStyle.view_flex_one, globalStyle.white_background)}
        contentContainerStyle={globalStyle.margin_horizontal_content}
      >
        <Skeletons type="vtd" />
        <Headings
          MT={1}
          BH="Editors Pick"
          SH="SEE MORE"
          onClickSH={() => navigation.navigate("EditorPick")}
        />
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <Skeletons type="squares" />
          <Skeletons type="squares" />
          <Skeletons type="squares" />
        </ScrollView>
        <Headings
          MT={12}
          BH="Top Rated"
          SH="SEE MORE"
          onClickSH={() => alert("InProgress")}
        />
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <Skeletons type="squares" />
          <Skeletons type="squares" />
          <Skeletons type="squares" />
        </ScrollView>
      </ScrollView>
    );
  };
  return (
    <>
      <View style={globalStyle.home_main_view}>
        {Header()}
        {showLoader ? (
          loadingView()
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={(globalStyle.view_flex_one, globalStyle.white_background)}
            contentContainerStyle={globalStyle.margin_horizontal_content}
          >
            {/* <Loader isLoading={showLoader} /> */}
            {VideoOfDay()}
            <Headings
              MT={1}
              BH="Editors Pick"
              SH="SEE MORE"
              onClickSH={() => navigation.navigate("EditorPick")}
            />
            {VideoContent(editorPickArray)}

            <Headings
              MT={12}
              BH="Top Rated"
              SH="SEE MORE"
              onClickSH={() => navigation.navigate("TopRatedSongs")}
            />

            {VideoContent(topRatedArray)}

            <Headings
              MT={12}
              BH="Trending Artists"
              SH="SEE MORE"
              onClickSH={() => navigation.navigate("TrendingArtist")}
            />
            {TrendingArtist()}
            {userPickArray.length > 0 && (
              <>
                <Headings
                  MT={12}
                  BH={userName + ` Pick`}
                  SH="SEE MORE"
                  onClickSH={() => navigation.navigate("UserPickSong")}
                />
                {VideoContent(userPickArray)}
              </>
            )}
          </ScrollView>
        )}
      </View>
    </>
  );
};
export default Home;
