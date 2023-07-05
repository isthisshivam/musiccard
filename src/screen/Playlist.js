import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  FlatList,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../utility/constant/Colors";
import ImageConstant from "../utility/constant/ImageConstant";
import globalStyle from "../assets/styles/styles";
import Separator from "../component/Ui/Seperator";
import DialogView from "../component/Ui/dialog";
import Loader from "../component/Ui/loader";
import CommonUtility from "../utility/constant/CommonUtility";
import BUTTON from "../component/Ui/button";
import ListEmptyComponent from "../component/Ui/listEmptyComponent";
import { createPlaylist } from "../redux/services/createPlaylist";
import { getUserPlaylist } from "../redux/services/getUserPlaylistService";
import APP_STRING from "../utility/constant/StringConstants";
var playlistName = APP_STRING.EMPTY;

const Playlist = () => {
  const navigation = useNavigation();
  const [willInflate, setWillInflate] = useState(false);
  const [PlaylistList, setPlaylistList] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [congrates, setCongrates] = useState(false);
  const [FavoritesSongsCount, SetFavCount] = useState(0);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserPlaylistList();
    });
    return unsubscribe;
  }, []);
  const getUserPlaylistList = async () => {
    try {
      setShowLoader(true);
      const response = await getUserPlaylist();
      if (response) {
        //alert(JSON.stringify(response));
        setPlaylistList(response.playlists);
        SetFavCount(response.favCount);
        setShowLoader(false);
      }
    } catch (e) {
      setShowLoader(false);
    }
  };
  const Header = () => {
    return (
      <View style={globalStyle.home_header}>
        <Text
          style={[globalStyle.complete_profile, globalStyle.marginLeft_0]}
        >{`Playlist`}</Text>

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

  const MyPlayList = () => {
    return (
      <FlatList
        data={PlaylistList}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          (globalStyle.white_background, globalStyle.paddingHorizontal_20)
        }
        ListEmptyComponent={<ListEmptyComponent title={"No Songs yet"} />}
        style={[globalStyle.Flex_1, globalStyle.marginTop_20]}
        renderItem={(item) => renderPlaylist(item)}
      />
    );
  };

  const renderPlaylist = ({ item }) => {
    const { _id, name } = item;
    return (
      <Pressable
        onPress={() => navigation.navigate("PlaylistList", { _id, name })}
        style={[
          globalStyle.playlist_container,
          globalStyle.justifyContent_spaceBetween,
        ]}
      >
        <View style={[globalStyle.flexRow, globalStyle.alignItems_center]}>
          <Text
            style={[globalStyle.playlist_item_name, globalStyle.muli_Light]}
          >
            {name}
          </Text>
        </View>
        <Image
          style={globalStyle.img_container_row}
          source={ImageConstant.HOME.SEE_MORE}
        ></Image>
      </Pressable>
    );
  };

  const onTouchOutside = () => {
    setWillInflate(!willInflate);
  };
  const isPlayListExists = () => {
    const found = PlaylistList.some((el) => el.name === playlistName);
    return found;
  };
  const onCreatePlaylistPress = async () => {
    var tempPlaylistName = playlistName.split(" ").join("");
    if (tempPlaylistName == "") {
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(
          APP_STRING.ENTER_PLAYLIST_NAME
        );
      }, 100);
    } else if (isPlayListExists()) {
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(
          APP_STRING.CANT_HAVE_SAME_NAME_PLAYLIST
        );
      }, 100);
    } else {
      onTouchOutside();
      try {
        setShowLoader(true);
        let playlistPayload = {
          name: playlistName,
        };
        const response = await createPlaylist(playlistPayload);
        if (response) {
          setTimeout(() => {
            CommonUtility.getInstance().inflateToast(
              APP_STRING.PLAYLIST_CREATED_SUCCESSFULLY
            );
            setCongrates(true);
          }, 500);
          setTimeout(() => {
            setCongrates(false);
            getUserPlaylistList();
          }, 3000);
          setShowLoader(false);
          playlistName = APP_STRING.EMPTY;
        }
      } catch (e) {
        setShowLoader(false);
        setTimeout(() => {
          CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
        }, 100);
      }
    }
  };

  const Modal = () => {
    return (
      <DialogView
        onTouchOutside={() => onTouchOutside()}
        willInflate={willInflate}
        onBackPress={() => setWillInflate(false)}
        children={<ModalContent />}
      ></DialogView>
    );
  };
  const ModalContent = () => {
    return (
      <>
        <View style={globalStyle.connectEmail_wrapper}>
          <View style={globalStyle.alignItems_center}>
            <Pressable onPress={() => onTouchOutside()}>
              <Image
                style={globalStyle.back_image}
                resizeMode="contain"
                source={ImageConstant.EDITOR_PICK.BACK}
              />
            </Pressable>

            <Text style={{ marginLeft: 20 }}>Create new Playlist</Text>
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
          <TextInput
            onChangeText={(text) => (playlistName = text)}
            placeholder="enter name"
            maxLength={22}
            style={globalStyle.textInput}
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
              action={onCreatePlaylistPress}
            />
          </View>
        </View>
      </>
    );
  };
  return (
    <>
      <View style={globalStyle.view_flex_one}>
        <Header />
        {congrates && (
          <ImageBackground
            resizeMode="contain"
            style={{ height: "100%", width: "100%" }}
            source={ImageConstant.SPLASH.CONGRATES}
          ></ImageBackground>
        )}

        <Loader isLoading={showLoader} />
        <ScrollView
          contentContainerStyle={[
            globalStyle.searchContainer,
            globalStyle.paddingHorizontal_0,
          ]}
          style={[globalStyle.view_flex_one, globalStyle.white_background]}
        >
          <Pressable
            onPress={() => onTouchOutside()}
            style={[
              {
                height: 55,
                flexDirection: "row",
                paddingHorizontal: 20,
                alignItems: "center",
              },
              globalStyle.justifyContent_spaceBetween,
            ]}
          >
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                },
              ]}
            >
              <Image
                style={{ height: 22, width: 22, resizeMode: "contain" }}
                source={ImageConstant.APP.ADD_PLAYLIST}
              ></Image>
              <Text
                style={[
                  {
                    fontSize: 16,
                    marginTop: 0,
                    paddingHorizontal: 20,
                    color: COLORS.black,
                  },
                  globalStyle.muli_Light,
                ]}
              >
                Create a new playlist
              </Text>
            </View>
          </Pressable>
          <Separator></Separator>
          <Pressable
            onPress={() => navigation.navigate("Favorites")}
            style={[
              {
                height: 55,
                flexDirection: "row",
                paddingHorizontal: 20,
                alignItems: "center",
              },
              globalStyle.justifyContent_spaceBetween,
            ]}
          >
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                },
              ]}
            >
              <Image
                style={{ height: 22, width: 22, resizeMode: "contain" }}
                source={ImageConstant.APP.FAVIOURTE}
              ></Image>
              <Text
                style={[
                  {
                    fontSize: 16,
                    marginTop: 0,
                    paddingHorizontal: 20,
                    color: COLORS.black,
                  },
                  globalStyle.muli_Light,
                ]}
              >
                {`Favourites (` + FavoritesSongsCount + ")"}
              </Text>
            </View>
            <Image
              style={{ height: 18, width: 18, resizeMode: "contain" }}
              source={ImageConstant.HOME.SEE_MORE}
            ></Image>
          </Pressable>
          <Separator></Separator>
          <Text
            style={[
              {
                fontSize: 16,
                marginTop: 20,
                paddingHorizontal: 20,
                color: COLORS.black,
              },
              globalStyle.muli_semiBold,
            ]}
          >
            My Playlists
          </Text>
          <MyPlayList />
        </ScrollView>
        {Modal()}
      </View>
    </>
  );
};
export default Playlist;
