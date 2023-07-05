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
  TextInput,
} from "react-native";
import Secrets from "../utility/constant/Secrets";
import RazorPay from "../component/Ui/RazorPay";
import { useSelector, useDispatch, connect } from "react-redux";
import BUTTON from "../component/Ui/button";
import Separator from "../component/Ui/Seperator";
import ListEmptyComponent from "../component/Ui/listEmptyComponent";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../utility/constant/Colors";
import FollowerCard from "../component/Ui/FollowerCard";
import FollowingCard from "../component/Ui/FollowingCard";
import UploadCard from "../component/Ui/UploadsCard";
import ImageConstant from "../utility/constant/ImageConstant";
import DummyData from "../DummyData/DummyData";
import DialogView from "../component/Ui/dialog";
import Loader from "../component/Ui/loader";
import { followUserService } from "../redux/services/followUserService";
import { unFollowUserService } from "../redux/services/unfollowUserService";
import { getSingerProfileDetails } from "../redux/services/getSingerProfileDetailsService";
import globalStyle from "../assets/styles/styles";
import CommonUtility from "../utility/constant/CommonUtility";
import APP_STRING from "../utility/constant/StringConstants";
import { SongRequestPost } from "../redux/services/SongRequestService";
import { SaveTipDetails } from "../redux/services/saveTipDetailsService";
var songSingerDescription = "";
var userData = null;
var selectedPrice = 10;
const SingerProfile = (props) => {
  const navigation = useNavigation();
  const [followed, setFollowed] = useState(false);
  const [tipSong, setTipSong] = useState(false);
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollower, setIsFollower] = useState(false);
  const [isUploads, setIsUploads] = useState(true);
  const [willInflate, setWillInflate] = useState(false);
  const [requestSong, setRequestSong] = useState(false);
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [userDetails, setUserdetails] = useState({});
  const loggedInUserData = useSelector(
    (state) => state.loggedInUserReducer.userData
  );

  useEffect(async () => {
    let payload = props.route.params;
    getAllUserPickSongsCall(payload);
    getUserProfileInformation();
  }, []);

  const addTipDetails = async () => {
    try {
      let payload = {
        singer: userDetails?._id,
        amount: selectedPrice,
        currency: "Rupee",
      };
      console.log("addTipDetails.payload", JSON.stringify(payload));
      return;
      setShowLoader(true);
      const response = await SaveTipDetails(payload);
      console.log("addTipDetails", JSON.stringify(response));
      if (response) {
        setShowLoader(false);
        setTimeout(() => {
          CommonUtility.getInstance().inflateToast(APP_STRING.TIP_SAVED);
        }, 100);
      }
    } catch (e) {
      setShowLoader(false);
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };
  const getUserProfileInformation = async () => {
    let userInfo =
      await CommonUtility.getInstance().getUserPersonalInformation();
    console.log("getUserProfileInformation", JSON.stringify(userInfo));
    userId = userInfo._id;
    userData = userInfo;
  };

  const getAllUserPickSongsCall = async (data) => {
    console.log("getAllUserPickSongsCall.response", data);

    try {
      setShowLoader(true);
      const response = await getSingerProfileDetails(data);
      if (response) {
        console.log("getAllUserPickSongsCall.response", response._id);
        setUserdetails(response);
        setFollower(response.followers);
        setFollowing(response.followings);
        setFollowed(response.followStatus);
        setShowLoader(false);
      }
    } catch (e) {
      setShowLoader(false);
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };
  const followUser = async () => {
    try {
      let payload = { _id: props.route.params };
      setShowLoader(true);
      const response = await followUserService(payload);
      console.log("followUser", JSON.stringify(response));
      if (response) {
        setFollowed(true);
        setShowLoader(false);
      }
    } catch (e) {
      setShowLoader(false);
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };
  const unFollowUser = async () => {
    try {
      let payload = { _id: props.route.params };
      setShowLoader(true);
      const response = await unFollowUserService(payload);
      console.log("unfollow", JSON.stringify(response));

      setFollowed(false);
      setShowLoader(false);
    } catch (e) {
      setShowLoader(false);
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };
  const onTouchOutsideRequestModal = () => {
    setRequestSong(false);
  };
  const onRequestPress = async () => {
    if (!CommonUtility.getInstance().isEmpty(songSingerDescription)) {
      setRequestSong(true);
      try {
        let playlistPayload = {
          singer: props.route.params,
          description: songSingerDescription,
        };
        const response = await SongRequestPost(playlistPayload);
        if (response) {
          setTimeout(() => {
            CommonUtility.getInstance().inflateToast(
              APP_STRING.REQUEST_GENERATED_SUCCESS
            );
            setRequestSong(false);
          }, 500);
        }
      } catch (e) {
        setRequestSong(false);
        setTimeout(() => {
          CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
        }, 100);
      }
    } else {
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.ENTER_DESC);
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
          <Text style={globalStyle.editor_pick_heading}>
            {userDetails.firstname + "'s" + ` Profile`}
          </Text>
        </Pressable>

        <View style={globalStyle.alignItems_center}>
          <Image
            style={globalStyle.back_button}
            resizeMode="contain"
            source={ImageConstant.HOME.SEARCH}
          />
        </View>
      </View>
    );
  };

  const renderItem = (item) => {
    const { about, title, songUrl, coverPhotoUrl, averageRating, genre, _id } =
      item.item;
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("Player", { title, songUrl, coverPhotoUrl, _id })
        }
        style={globalStyle.EditorPick_imageView_container}
      >
        <ImageBackground
          style={globalStyle.image_view_editor_pick}
          resizeMode="cover"
          imageStyle={globalStyle.border_radius_4}
          source={{ uri: coverPhotoUrl }}
        >
          <View style={globalStyle.EditorPick_row_container}>
            <Image
              style={globalStyle.starImg}
              source={ImageConstant.HOME.STAR}
            />
            <Text style={globalStyle.rating_txt}>{averageRating}</Text>
          </View>
        </ImageBackground>
        <Text numberOfLines={1} style={globalStyle.songname}>
          {title}
        </Text>
        <Text numberOfLines={1} style={globalStyle.singerName}>
          {about}
        </Text>
      </Pressable>
    );
  };

  const HeaderUnon = () => {
    return (
      <View style={globalStyle.home_header_profile}>
        <View style={globalStyle.flexRow}>
          <Pressable
            onPress={() => [
              setIsUploads(true),
              setIsFollowing(false),
              setIsFollower(false),
              // getFollowingList(),
            ]}
            style={[
              globalStyle.tabView_profile,
              {
                borderBottomColor: isUploads
                  ? COLORS.bottomTab
                  : COLORS.transparent,
              },
            ]}
          >
            <Text
              style={[globalStyle.complete_profile, globalStyle.marginLeft_0]}
            >
              Uploads
            </Text>
          </Pressable>
          <Pressable
            onPress={() => [
              setIsUploads(false),
              setIsFollowing(false),
              setIsFollower(true),
              // getFollowerList(),
            ]}
            style={[
              globalStyle.tabView_profile,
              {
                borderBottomColor: isFollower
                  ? COLORS.bottomTab
                  : COLORS.transparent,
              },
            ]}
          >
            <Text
              style={[globalStyle.complete_profile, globalStyle.marginLeft_0]}
            >
              Followers
            </Text>
          </Pressable>
          <Pressable
            onPress={() => [
              setIsUploads(false),
              setIsFollowing(true),
              setIsFollower(false),
              // getFollowingList(),
            ]}
            style={[
              globalStyle.tabView_profile,
              {
                borderBottomColor: isFollowing
                  ? COLORS.bottomTab
                  : COLORS.transparent,
              },
            ]}
          >
            <Text
              style={[globalStyle.complete_profile, globalStyle.marginLeft_0]}
            >
              Following
            </Text>
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
            userDetails.profilePhotoUrl
              ? { uri: userDetails.profilePhotoUrl }
              : ImageConstant.MY_PROFILE.USER
          }
          style={globalStyle.profile_img}
          borderRadius={46}
        ></ImageBackground>
        <View style={globalStyle.day_list_container}>
          <Text
            style={[globalStyle.username_my_profile, globalStyle.muli_semiBold]}
          >
            {userDetails.firstname + ` ` + userDetails.lastname}
          </Text>
          <View style={globalStyle.flexRow}>
            <Text style={[globalStyle.folle_, globalStyle.muli_Light]}>
              {userDetails.uploadCount + ` uploads,`}
            </Text>
            <Text style={[globalStyle.folle_, globalStyle.muli_Light]}>
              {userDetails.followersCount + ` followers,`}
            </Text>
            <Text style={[globalStyle.folle_, globalStyle.muli_Light]}>
              {userDetails.followingsCount + ` following`}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const Follower = () => (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <FlatList
        data={follower}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          (globalStyle.white_background, globalStyle.paddingHorizontal_20)
        }
        ListEmptyComponent={<ListEmptyComponent title={"No Followers."} />}
        style={[globalStyle.Flex_1, globalStyle.marginTop_20]}
        renderItem={(item) => (
          <FollowerCard
            item={item}
            onClick={(id) => getAllUserPickSongsCall(id)}
          />
        )}
      />
    </View>
  );
  const Following = () => (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <FlatList
        data={following}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          (globalStyle.white_background, globalStyle.paddingHorizontal_20)
        }
        ListEmptyComponent={
          <ListEmptyComponent title={"You haven't Following anyone yet."} />
        }
        style={[globalStyle.Flex_1, globalStyle.marginTop_20]}
        renderItem={(item) => (
          <FollowingCard
            item={item}
            onClick={(id) => getAllUserPickSongsCall(id)}
            //onClick={() => console.log("ss")}
            // onClick={() => navigation.navigate("FollowingDetails")}
          />
        )}
      />
    </View>
  );
  const Uploads = () => (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <FlatList
        data={userDetails.uploads && userDetails.uploads}
        showsHorizontalScrollIndicator={false}
        // contentContainerStyle={
        //   (globalStyle.white_background, globalStyle.paddingHorizontal_20)
        // }
        numColumns={2}
        ListEmptyComponent={
          <ListEmptyComponent title={"You haven't Following anyone yet."} />
        }
        style={[globalStyle.Flex_1, globalStyle.marginTop_20]}
        renderItem={(item) => uploadItem(item)}
      />
    </View>
  );
  const uploadItem = (item) => {
    const { about, title, songUrl, coverPhotoUrl, averageRating, genre, _id } =
      item.item;
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("Player", { title, songUrl, coverPhotoUrl, _id })
        }
        style={globalStyle.EditorPick_imageView_container}
      >
        <ImageBackground
          style={globalStyle.image_view_editor_pick}
          resizeMode="cover"
          imageStyle={globalStyle.border_radius_4}
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
          ) : (
            <></>
          )}
        </ImageBackground>
        <Text numberOfLines={1} style={globalStyle.songname}>
          {title}
        </Text>
        <Text numberOfLines={1} style={globalStyle.singerName}>
          {about}
        </Text>
      </Pressable>
    );
  };
  const TabView = (props) => {
    if (isFollowing) {
      return <Following />;
    } else if (isUploads) {
      return <Uploads />;
    } else {
      return <Follower />;
    }
  };
  const RequestSongModal = () => {
    return (
      <DialogView
        onBackPress={() => onTouchOutsideRequestModal()}
        onTouchOutside={() => onTouchOutsideRequestModal()}
        willInflate={requestSong}
        children={RequestSongModalContent()}
      ></DialogView>
    );
  };
  const RequestSongModalContent = () => {
    return (
      <>
        <View style={globalStyle.connectEmail_wrapper}>
          <View style={globalStyle.alignItems_center}>
            <Text>Request a song</Text>
          </View>
          <Pressable onPress={() => [onTouchOutsideRequestModal()]}>
            <Image
              style={globalStyle.closeDialog}
              resizeMode="contain"
              source={ImageConstant.LOG_IN.CLOSE}
            />
          </Pressable>
        </View>
        <View style={globalStyle.mainContainer}>
          <TextInput
            onChangeText={(text) => (songSingerDescription = text)}
            placeholder="Enter description"
            textAlignVertical={"top"}
            multiline={true}
            style={globalStyle.textInputDesc}
          ></TextInput>
          <View style={globalStyle.margin_30}>
            <BUTTON
              buttonFormStyle={{
                backgroundColor: COLORS.primary2,
                shadowColor: COLORS.primary2,
              }}
              buttonType="SMALL"
              labelStyleForm={globalStyle.fontSize_18}
              label={APP_STRING.DONE}
              action={() => onRequestPress()}
            />
          </View>
        </View>
      </>
    );
  };
  const onTouchOutsideTipSong = () => {
    setTipSong(false);
  };
  const payToSinger = async () => {
    setTipSong(false);
    let config = {
      ...Secrets.RazorPayConfig,
      amount: parseInt(selectedPrice * 100),
      prefill: {
        email: userData?.email ? userData?.email : "TestMusicCard@gmail.com",
        contact: userData?.phone ? userData?.phone : "9990365899",
        name: userData ? userData?.firstname : "Razorpay Software",
      },
      amount: parseInt(selectedPrice * 100),
    };
    console.log("selectedPrice.config", JSON.stringify(config));

    await RazorPay(config, onPaymentSuccess, onPaymentFailed);
  };
  const onPaymentSuccess = async (resolve) => {
    console.log(`onPaymentSuccess: `, JSON.stringify(resolve));
    addTipDetails();
    // setTimeout(() => {
    //   CommonUtility.getInstance().inflateToast(
    //     "Thanks for your support. Payment has been Successfull."
    //   );
    // }, 300);
  };

  const onPaymentFailed = async (error) => {
    console.log(`onPaymentFailed: `, JSON.stringify(error));
    console.log(`Error: ${error.code} | ${error.description}`);

    // setTimeout(() => {
    //   CommonUtility.getInstance().inflateToast(
    //     "Thanks for your support. But due to some reasons Payment has been Failed."
    //   );
    // }, 300);
  };
  const TipList = () => {
    return (
      <FlatList
        numColumns={3}
        data={DummyData.Tips}
        renderItem={renderTipListItem}
      ></FlatList>
    );
  };
  const renderTipListItem = ({ index, item }) => {
    return (
      <Pressable
        onPress={() => [(selectedPrice = item), setSelectedPriceIndex(index)]}
        style={{
          backgroundColor:
            selectedPriceIndex == index ? COLORS.gray : COLORS.border_Color,
          padding: 10,
          width: 70,
          borderRadius: 10,
          margin: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={[globalStyle.songReqNew, globalStyle.font_14]}>
          {`\u20A8 ` + item}
        </Text>
      </Pressable>
    );
  };
  const TipModal = () => {
    return (
      <DialogView
        onBackPress={() => onTouchOutsideTipSong()}
        onTouchOutside={() => onTouchOutsideTipSong()}
        willInflate={tipSong}
        children={TipModalContent()}
      ></DialogView>
    );
  };
  const TipModalContent = () => {
    return (
      <>
        <View style={globalStyle.connectEmail_wrapper}>
          <View style={globalStyle.alignItems_center}>
            <Text style={{ marginRight: 40 }}>
              Thank you for pledge to support
              <Text style={{ fontWeight: "700" }}>
                {` ` + userDetails?.firstname}
              </Text>
            </Text>
          </View>
          <Pressable onPress={() => [onTouchOutsideTipSong()]}>
            <Image
              style={globalStyle.closeDialog}
              resizeMode="contain"
              source={ImageConstant.LOG_IN.CLOSE}
            />
          </Pressable>
        </View>
        <View style={globalStyle.mainContainer}>
          {TipList()}
          <View style={globalStyle.margin_30}>
            <BUTTON
              buttonFormStyle={{
                backgroundColor: COLORS.primary2,
                shadowColor: COLORS.primary2,
              }}
              buttonType="SMALL"
              labelStyleForm={globalStyle.fontSize_18}
              label={APP_STRING.DONE}
              action={() => payToSinger()}
            />
          </View>
        </View>
      </>
    );
  };
  return (
    <View style={globalStyle.view_flex_one}>
      {<Header onBackClick={() => navigation.goBack()} />}
      {RequestSongModal()}
      {TipModal()}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[globalStyle.white_background]}
      >
        {UserPlace()}

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
                style={[globalStyle.text_follower, globalStyle.muli_semiBold]}
              >
                05
              </Text>
              <Text style={[globalStyle.text_follower, globalStyle.muli_Light]}>
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
                style={[globalStyle.text_follower, globalStyle.muli_semiBold]}
              >
                05
              </Text>
              <Text style={[globalStyle.text_follower, globalStyle.muli_Light]}>
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
                style={[globalStyle.text_follower, globalStyle.muli_semiBold]}
              >
                05
              </Text>
              <Text style={[globalStyle.text_follower, globalStyle.muli_Light]}>
                Daily
              </Text>
            </View>
          </View>
        </View>
        <Separator></Separator>
        <Text
          style={[
            globalStyle.singerName,
            globalStyle.paddingHorizontal_20,
            { marginTop: 20 },
            { marginBottom: loggedInUserData._id === userDetails._id ? 10 : 0 },
          ]}
        >
          {userDetails.about}
        </Text>
        {loggedInUserData._id !== userDetails._id && (
          <View
            style={[
              globalStyle.flexRow,
              globalStyle.pad_10,
              globalStyle.justifyContent_spaceBetween,
            ]}
          >
            <Pressable
              onPress={followed ? unFollowUser : followUser}
              style={[
                globalStyle.flexRow,
                globalStyle.alignItems_center,
                globalStyle.follow_btn,
              ]}
            >
              <Text style={{ color: COLORS.white, fontFamily: "Muli-Bold" }}>
                {followed ? "UNFOLLOW" : "FOLLOW"}
              </Text>
            </Pressable>

            <View style={(globalStyle.flexRow, globalStyle.alignItems_center)}>
              <Pressable
                onPress={() => setRequestSong(true)}
                style={[
                  globalStyle.req_song_container,
                  globalStyle.marginRight_13,
                ]}
              >
                <Image
                  source={ImageConstant.APP.REQUEST}
                  style={globalStyle.req_img}
                ></Image>

                <Text style={globalStyle.songReq}>Request a song</Text>
              </Pressable>
              <Pressable
                onPress={() => setTipSong(true)}
                style={[globalStyle.req_song_container]}
              >
                <Text
                  style={[globalStyle.songReq, globalStyle.font_14]}
                >{`\u20A8 10`}</Text>
                <Text style={globalStyle.songReq}>Tip to artist</Text>
              </Pressable>
            </View>
          </View>
        )}
        {HeaderUnon()}
        {TabView()}
      </ScrollView>
      <Loader isLoading={showLoader}></Loader>
    </View>
  );
};
export default SingerProfile;
