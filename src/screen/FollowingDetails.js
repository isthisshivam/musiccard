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
import Separator from "../component/Ui/Seperator";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../utility/constant/Colors";
import ImageConstant from "../utility/constant/ImageConstant";
import DummyData from "../DummyData/DummyData";
import globalStyle from "../assets/styles/styles";
import BUTTON from "../component/Ui/button";
import APP_STRING from "../utility/constant/StringConstants";
import DialogView from "../component/Ui/dialog";
const FollowingDetails = () => {
  const navigation = useNavigation();
  const [isFollowing, setFollowing] = useState(true);
  const [isFollower, setFollower] = useState(false);
  const [isUploads, setUploads] = useState(false);
  const [willInflate, setWillInflate] = useState(false);
  useEffect(() => {});

  const onTouchOutside = () => {
    setWillInflate(!willInflate);
  };
  const Header = (props) => {
    const { onBackClick } = props;

    return (
      <View style={[globalStyle.editor_pick_headerView]}>
        <Pressable
          onPress={() => onBackClick()}
          style={globalStyle.alignItems_center}
        >
          <Image
            style={globalStyle.back_button}
            resizeMode="contain"
            source={ImageConstant.EDITOR_PICK.BACK}
          />
          <Text style={globalStyle.editor_pick_heading}>Ammy virk</Text>
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

  const UserPlace = () => {
    return (
      <View style={globalStyle.myDp_container}>
        <ImageBackground
          source={ImageConstant.MY_PROFILE.USER}
          style={globalStyle.profile_img}
          borderRadius={46}
        ></ImageBackground>
        <View style={globalStyle.day_list_container}>
          <Text
            style={[globalStyle.username_my_profile, globalStyle.muli_semiBold]}
          >
            Ammy Virk
          </Text>
          <View style={globalStyle.flexRow}>
            <Text style={[globalStyle.folle_, globalStyle.muli_Light]}>
              100 uploads,
            </Text>
            <Text style={[globalStyle.folle_, globalStyle.muli_Light]}>
              100k followers
            </Text>
            <Text style={[globalStyle.folle_, globalStyle.muli_Light]}>
              5k following
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const TabHeader = () => {
    return (
      <View style={[globalStyle.tab_header, globalStyle.marginTop_20]}>
        <View style={globalStyle.flexRow}>
          <Pressable
            onPress={() => [
              setFollowing(false),
              setFollower(false),
              setUploads(true),
            ]}
            style={[
              globalStyle.tabView,
              {
                borderBottomColor: isUploads ? COLORS.bottomTab : COLORS.white,
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
              setFollowing(false),
              setFollower(true),
              setUploads(false),
            ]}
            style={[
              globalStyle.tabView,
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
              Follower
            </Text>
          </Pressable>
          <Pressable
            onPress={() => [
              setFollowing(true),
              setFollower(false),
              setUploads(false),
            ]}
            style={[
              globalStyle.tabView,
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

  const Follower = () => (
    <View style={globalStyle.following_details}>
      <FlatList
        data={DummyData.EditorPickArray}
        numColumns={2}
        keyExtractor={(item) => item.SongName.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={globalStyle.contentContainerStyle_follower_FL}
        renderItem={(item) => renderItem(item)}
      />
    </View>
  );
  const Uploads = () => (
    <View style={globalStyle.following_details}>
      <FlatList
        data={DummyData.EditorPickArray}
        numColumns={2}
        keyExtractor={(item) => item.SongName.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={globalStyle.contentContainerStyle_follower_FL}
        renderItem={(item) => renderItem(item)}
      />
    </View>
  );

  const renderItem = (item) => {
    const { SongName, SingerName, rating, SongImage } = item.item;
    return (
      <View
        style={{
          width: "47%",
          margin: 6,
          paddingVertical: 5,
          paddingHorizontal: 3,
          backgroundColor: "transparent",
          borderRadius: 4,
        }}
      >
        <ImageBackground
          style={{
            height: 160,
            width: "100%",
            shadowColor: "white",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          resizeMode="cover"
          imageStyle={{ borderRadius: 4 }}
          source={SongImage}
        >
          <View
            style={{
              backgroundColor: "black",
              width: 62,
              paddingHorizontal: 10,
              paddingVertical: 4,
              flexDirection: "row",
              marginTop: 125,
              borderRadius: 10,
              marginLeft: 6,
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 15, width: 15 }}
              source={ImageConstant.HOME.STAR}
            />
            <Text style={{ color: "white", marginLeft: 5, fontSize: 15 }}>
              {rating}
            </Text>
          </View>
        </ImageBackground>
        <Text numberOfLines={2} style={{ marginTop: 6, fontWeight: "400" }}>
          {SongName}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            marginTop: 8,
            fontWeight: "400",
            color: "gray",
          }}
        >
          {SingerName}
        </Text>
      </View>
    );
  };
  const Following = () => (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <FlatList
        data={DummyData.EditorPickArray}
        numColumns={2}
        keyExtractor={(item) => item.SongName.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: "transparent",
          alignItems: "space-between",
          paddingVertical: 20,
          marginHorizontal: 10,
        }}
        renderItem={(item) => renderItem(item)}
      />
    </View>
  );
  const TabView = (props) => {
    if (isFollowing) {
      return <Following />;
    } else if (isFollower) {
      return <Follower />;
    } else {
      return <Uploads />;
    }
  };
  const Modal = () => {
    return (
      <DialogView
        onTouchOutside={() => onTouchOutside()}
        willInflate={willInflate}
        children={<ModalContent />}
      ></DialogView>
    );
  };
  const ModalContent = () => {
    return (
      <>
        <View style={globalStyle.connectEmail_wrapper}>
          <View style={globalStyle.alignItems_center}>
            <Text style={{ fontSize: 16 }}>Unfollow user</Text>
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
          <Text style={{ fontSize: 12 }}>Ammy virk</Text>
          <View
            style={[
              globalStyle.margin_30,
              globalStyle.flexRow,
              globalStyle.justifyContent_spaceBetween,
            ]}
          >
            <BUTTON
              buttonFormStyle={{
                backgroundColor: COLORS.primary2,
                shadowColor: COLORS.primary2,
              }}
              buttonType="SMALL"
              labelStyleForm={{ fontSize: 18 }}
              label={APP_STRING.NO}
              action={() => onTouchOutside()}
            />
            <BUTTON
              buttonFormStyle={{
                backgroundColor: COLORS.primary1,
                shadowColor: COLORS.primary1,
              }}
              buttonType="SMALL"
              labelStyleForm={{ fontSize: 18 }}
              label={APP_STRING.YES}
              action={() => onTouchOutside()}
            />
          </View>
        </View>
      </>
    );
  };

  const Content = () => {
    return (
      <View
        style={[
          globalStyle.flexRow,
          globalStyle.pad_10,
          globalStyle.justifyContent_spaceBetween,
        ]}
      >
        <View style={(globalStyle.margin_30, { alignSelf: "center" })}>
          <BUTTON
            buttonFormStyle={{
              backgroundColor: COLORS.primary2,
              shadowColor: COLORS.primary2,
            }}
            buttonType="LARGE"
            labelStyleForm={globalStyle.fontSize_18}
            label={APP_STRING.FOLLOW}
            action={() => onTouchOutside()}
          />
        </View>
        <View style={(globalStyle.flexRow, globalStyle.alignItems_center)}>
          <Pressable
            style={[globalStyle.req_song_container, globalStyle.marginRight_13]}
          >
            <Image
              source={ImageConstant.APP.REQUEST}
              style={globalStyle.req_img}
            ></Image>

            <Text style={globalStyle.songReq}>Request a song</Text>
          </Pressable>
          <Pressable style={[globalStyle.req_song_container]}>
            <Text
              style={[globalStyle.songReq, globalStyle.font_14]}
            >{`\u20A8 10`}</Text>
            <Text style={globalStyle.songReq}>Tip my artist</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  return (
    <>
      <View style={globalStyle.view_flex_one}>
        {<Header onBackClick={() => navigation.goBack()} />}
        {Modal()}
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
                source={ImageConstant.APP.SILVER}
              ></Image>
              <View style={globalStyle.main_follower_view}>
                <Text
                  style={[globalStyle.text_follower, globalStyle.muli_semiBold]}
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
                  style={[globalStyle.text_follower, globalStyle.muli_semiBold]}
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
                source={ImageConstant.APP.GOLD}
              ></Image>
              <View style={globalStyle.user_profile_child_container}>
                <Text
                  style={[globalStyle.text_follower, globalStyle.muli_semiBold]}
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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting
          </Text>
          <Content />
          <TabHeader />
          <TabView />
        </ScrollView>
      </View>
    </>
  );
};
export default FollowingDetails;
