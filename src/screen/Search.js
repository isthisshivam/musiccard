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
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import COLORS from "../utility/constant/Colors";
import BUTTON from "../component/Ui/button";
import APP_STRING from "../utility/constant/StringConstants";
import ImageConstant from "../utility/constant/ImageConstant";
import CommonUtility from "../utility/constant/CommonUtility";
import globalStyle from "../assets/styles/styles";
import { searchService } from "../redux/services/getSearchResult";
import { FlatList } from "react-native-gesture-handler";
const Search = () => {
  const navigation = useNavigation();
  const [showLoader, setShowLoader] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [songs, setSongs] = useState([]);
  const [users, setUsers] = useState([]);

  const [searchText, setSearchText] = useState("");
  const searchData = async (v) => {
    try {
      setShowLoader(true);
      let payload = {
        search: v,
      };
      const response = await searchService(v, payload);
      if (response) {
        const { songs, users } = response;
        setSongs(songs);
        setUsers(users);
        setShowLoader(false);
      }
    } catch (e) {
      setShowLoader(false);
    }
  };
  const Header = () => {
    return (
      <View style={globalStyle.search_view_header}>
        <Pressable onPress={() => [navigation.goBack()]}>
          <Image
            style={globalStyle.back_image}
            resizeMode="contain"
            source={ImageConstant.EDITOR_PICK.BACK}
          />
        </Pressable>

        <TextInput
          placeholder={`Search`}
          placeholderTextColor={COLORS.gray}
          value={searchText}
          keyboardType="web-search"
          onChangeText={(v) => [setSearchText(v), searchData(v)]}
          style={globalStyle.searchInput}
        ></TextInput>
      </View>
    );
  };
  const renderSongs = (item) => {
    const { title, coverPhotoUrl, _id, songUrl } = item.item;
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("Player", { title, songUrl, coverPhotoUrl, _id })
        }
        style={[
          globalStyle.follower_container,
          globalStyle.justifyContent_spaceBetween,
        ]}
      >
        <View style={[globalStyle.flexRow, globalStyle.alignItems_center]}>
          <Image
            style={globalStyle.following_img_container}
            source={{ uri: coverPhotoUrl }}
          ></Image>
          <Text
            numberOfLines={2}
            style={[
              globalStyle.playlist_item_name,
              globalStyle.muli_Light,
              globalStyle.marginLeft_13,
              { width: 280 },
            ]}
          >
            {title}
          </Text>
        </View>
        <Image
          style={globalStyle.img_container_row}
          source={ImageConstant.HOME.SEE_MORE}
        ></Image>
      </Pressable>
    );
  };

  const renderUsers = (item) => {
    const { firstname, profilePhotoUrl, _id, lastname } = item.item;
    return (
      <Pressable
        onPress={() => navigation.navigate("SingerProfile", _id)}
        style={[
          globalStyle.follower_container,
          globalStyle.justifyContent_spaceBetween,
        ]}
      >
        <View style={[globalStyle.flexRow, globalStyle.alignItems_center]}>
          <Image
            style={globalStyle.following_img_container}
            source={{ uri: profilePhotoUrl }}
          ></Image>
          <Text
            numberOfLines={2}
            style={[
              globalStyle.playlist_item_name,
              globalStyle.muli_Light,
              globalStyle.marginLeft_13,
              { width: 280 },
            ]}
          >
            {firstname + ` ` + lastname}
          </Text>
        </View>
        <Image
          style={globalStyle.img_container_row}
          source={ImageConstant.HOME.SEE_MORE}
        ></Image>
      </Pressable>
    );
  };
  return (
    <>
      <View style={globalStyle.view_flex_one}>
        {Header()}
        <ScrollView
          contentContainerStyle={globalStyle.searchContainer}
          style={[globalStyle.view_flex_one, globalStyle.white_background]}
        >
          {searchText != "" && (
            <Text style={{ color: COLORS.gray }}>
              {`Showing result for "` + searchText + `"`}
            </Text>
          )}
          {songs.length == 0 && users.length == 0 && searchText != "" && (
            <Text
              style={{
                color: COLORS.gray,
                marginTop: "70%",
                alignSelf: "center",
              }}
            >
              {"No result found"}
            </Text>
          )}
          <FlatList
            data={songs}
            ListHeaderComponentStyle={{ marginTop: 30 }}
            ListHeaderComponent={() =>
              songs.length != 0 && (
                <Text
                  numberOfLines={2}
                  style={[
                    globalStyle.playlist_item_name,
                    globalStyle.muli_Light,
                    globalStyle.marginLeft_13,
                    globalStyle.muli_bold,
                    globalStyle.fontSize_18,
                    { width: 280, color: COLORS.black },
                  ]}
                >
                  {"Songs"}
                </Text>
              )
            }
            renderItem={renderSongs}
          ></FlatList>
          <FlatList
            data={users}
            ListHeaderComponentStyle={{ marginTop: 30 }}
            ListHeaderComponent={() =>
              users.length != 0 && (
                <Text
                  numberOfLines={2}
                  style={[
                    globalStyle.playlist_item_name,
                    globalStyle.muli_Light,
                    globalStyle.marginLeft_13,
                    globalStyle.fontSize_18,
                    globalStyle.muli_bold,
                    { width: 280, color: COLORS.black },
                  ]}
                >
                  {"Users"}
                </Text>
              )
            }
            renderItem={renderUsers}
          ></FlatList>
        </ScrollView>
      </View>
    </>
  );
};
export default Search;
