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
const { width, height } = Dimensions.get("window");
import CheckBox from "@react-native-community/checkbox";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import ImageConstant from "../utility/constant/ImageConstant";
import Loader from "../component/Ui/loader";
import globalStyle from "../assets/styles/styles";
import ListEmptyComponent from "../component/Ui/listEmptyComponent";
import { getFavoriteList } from "../redux/services/getAllFavoriteSongs";
import { deleteSongsFromFavoriteService } from "../redux/services/deleteSongsFromFavoriteList";

const Favorites = () => {
  const navigation = useNavigation();
  const [favoriteList, setFavoriteList] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [isEditable, setEditable] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [isAllSongsSelected, setAllSongsSelected] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState([]);

  useEffect(() => {
    getUserFavoriteList();
  }, []);

  const getUserFavoriteList = async () => {
    try {
      setShowLoader(true);
      const response = await getFavoriteList();
      if (response) {
        let newSongs = response[0].songs.map((v) => ({
          ...v,
          isSelected: false,
          isEditable: false,
        }));
        setFavoriteList(newSongs);
        setShowLoader(false);
      }
    } catch (e) {
      setShowLoader(false);
    }
  };
  const deleteSongsFromFavoritesCall = async () => {
    try {
      let payload = {
        songs: selectedSongs,
      };
      let response = await deleteSongsFromFavoriteService(payload);
      if (response.songs) {
        setEditable(false);
        setUpdating(!isUpdating);
        setTimeout(() => {
          // CommonUtility.getInstance().inflateToast(
          //   APP_STRING.SONG_HAS_REMOVED_IN_PLAYLIST
          // );
          getUserFavoriteList();
        }, 1000);
      }
    } catch (e) {
      setEditable(false);
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };
  const onSelectSongs = (item) => {
    const { _id, isSelected } = item.item;
    const theFav = favoriteList.map((theList) => {
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
    // update favorite list selection

    setFavoriteList(theFav);
    setUpdating(!isUpdating);
  };
  const onAllSongsSelection = (newValue) => {
    setAllSongsSelected(newValue);
    let newSongs = favoriteList.map((v) => ({
      ...v,
      isSelected: newValue,
    }));
    setFavoriteList(newSongs);
    if (newValue) {
      setSelectedSongs(favoriteList);
    } else {
      setSelectedSongs([]);
    }
  };
  const onEditCancelClick = () => {
    setEditable(false);
    setAllSongsSelected(false);
    let newSongs = favoriteList.map((v) => ({
      ...v,
      isSelected: false,
      isEditable: false,
    }));
    setFavoriteList(newSongs);
    setSelectedSongs([]);
  };
  // const Header = (props) => {
  //   const { onBackClick } = props;
  //   return (
  //     <View
  //       style={{
  //         height: 55,
  //         backgroundColor: Colors.lighter,
  //         width: "100%",
  //         borderBottomWidth: 1,
  //         paddingHorizontal: 18,
  //         alignItems: "center",
  //         flexDirection: "row",
  //         justifyContent: "space-between",
  //         borderBottomColor: Colors.lighter,
  //       }}
  //     >
  //       <Pressable
  //         onPress={() => onBackClick()}
  //         style={{ flexDirection: "row", alignItems: "center" }}
  //       >
  //         <Image
  //           style={{ height: 22, width: 22 }}
  //           resizeMode="contain"
  //           source={ImageConstant.EDITOR_PICK.BACK}
  //         />
  //         <Text
  //           style={{ fontSize: RFValue(15), marginLeft: 15, fontWeight: "500" }}
  //         >
  //           Favourites
  //         </Text>
  //       </Pressable>

  //       <View
  //         style={{
  //           alignItems: "center",
  //           flexDirection: "row",
  //         }}
  //       >
  //         {/* <Image
  //           style={{ height: 22, width: 22 }}
  //           resizeMode="contain"
  //           source={ImageConstant.HOME.SEARCH}
  //         /> */}
  //       </View>
  //     </View>
  //   );
  // };

  const VideoContent = () => {
    return (
      <FlatList
        data={favoriteList}
        numColumns={2}
        keyExtractor={(item) => item.title.toString()}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={<ListEmptyComponent title={"No songs yet"} />}
        contentContainerStyle={{
          backgroundColor: "transparent",
        }}
        renderItem={(item) => renderItem(item)}
      />
    );
  };
  const renderItem = (item) => {
    const { title, about, genre, coverPhotoUrl, songUrl, _id, isSelected } =
      item.item;
    // let rating = "4.7";
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

            <View style={globalStyle.EditorPick_row_container}>
              <Image
                style={globalStyle.starImg}
                source={ImageConstant.HOME.STAR}
              />
              {/** <Text style={globalStyle.rating_txt}>{rating}</Text> */}
            </View>
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
          onPress={() =>
            navigation.navigate("Player", {
              title,
              songUrl,
              coverPhotoUrl,
              _id,
            })
          }
          style={{
            flex: 0.49,
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
              resizeMode: "cover",
            }}
            resizeMode="cover"
            imageStyle={{ borderRadius: 4 }}
            source={{ uri: coverPhotoUrl }}
          >
            {/** <View
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
                4.7
              </Text>
            </View>*/}
          </ImageBackground>
          <Text numberOfLines={2} style={{ marginTop: 6, fontWeight: "400" }}>
            {title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              marginTop: 8,
              fontWeight: "400",
              color: "gray",
            }}
          >
            {about}
          </Text>
        </Pressable>
      );
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingHorizontal: 0,
        }}
      >
        <Loader isLoading={showLoader} />
        {/* <Header onBackClick={() => navigation.goBack()} /> */}
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
                  onPress={() => deleteSongsFromFavoritesCall()}
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
                {`Favourites`}
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
              {/* <Pressable
                // onPress={() => onTouchOutside()}
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
              </Pressable> */}
            </View>
          </View>
        )}
        {VideoContent()}
      </View>
    </>
  );
};
export default Favorites;
