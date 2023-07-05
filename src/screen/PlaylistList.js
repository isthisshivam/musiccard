import React, { useState, useEffect, useRef } from "react";
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
const { width, height } = Dimensions.get("window");
import CheckBox from "@react-native-community/checkbox";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import ImageConstant from "../utility/constant/ImageConstant";
import DummyData from "../DummyData/DummyData";
import DialogView from "../component/Ui/dialog";
import PlayListBottomSheet from "../component/Ui/playlistBottmSheet";
import globalStyle from "../assets/styles/styles";
import BUTTON from "../component/Ui/button";
import ListEmptyComponent from "../component/Ui/listEmptyComponent";
import APP_STRING from "../utility/constant/StringConstants";
import COLORS from "../utility/constant/Colors";
import CommonUtility from "../utility/constant/CommonUtility";
import { deletePlaylist } from "../redux/services/deletePlaylistService";
import { getPlaylistDetails } from "../redux/services/getPlaylistDetailsService";
import { renamePlaylistPatch } from "../redux/services/renamePlaylistService";
import { deleteSongsFromPlaylist } from "../redux/services/deleteSongsFromParticularPlaylist";

const PlaylistList = (props) => {
  const navigation = useNavigation();
  const refRBSheet = useRef(null);
  const [willInflate, setWillInflate] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isEditable, setEditable] = useState(false);
  const [isAllSongsSelected, setAllSongsSelected] = useState(false);
  const [willInflateEditPlaylistModal, setInflateEditPlaylistModal] =
    useState(false);
  const [playlistId, setPlaylistId] = useState("");
  const [isUpdating, setUpdating] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [playlistHeader, setPlaylistHeader] = useState(props.route.params.name);

  useEffect(() => {
    setPreviousProps(props);
  }, []);

  const setPreviousProps = (props) => {
    setPlaylistId(props.route.params._id);
    setPlaylistName(props.route.params.name);
    getPlaylist();
  };

  const getPlaylist = async () => {
    try {
      setShowLoader(true);
      const response = await getPlaylistDetails(props.route.params._id);
      if (response) {
        let newSongs = response.songs.map((v) => ({
          ...v,
          isSelected: false,
          isEditable: false,
        }));
        setPlaylistSongs(newSongs);
      }
      setShowLoader(false);
    } catch (e) {
      setShowLoader(false);
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };

  onDeletePlaylistPress = async () => {
    try {
      const response = await deletePlaylist(playlistId);
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(
          APP_STRING.PLAYLIST_DELETED_SUCCESSFULLY
        );
      }, 100);
      navigation.goBack();
    } catch (e) {
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };
  onRenamePlaylistPress = async () => {
    if (!playlistName.trim()) {
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(
          APP_STRING.ENTER_PLAYLIST_NAME
        );
      }, 100);
      return;
    }
    try {
      let payload = {
        name: playlistName,
      };
      const response = await renamePlaylistPatch(playlistId, payload);
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(
          APP_STRING.PLAYLIST_RENAMED_SUCCESSFULLY
        );
        setPlaylistHeader(playlistName);
      }, 100);
    } catch (e) {
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
    // close the model after renaming the playlist
    onTouchOutsideEditPlaylistModal();
  };

  const VideoContent = () => {
    return (
      <FlatList
        data={playlistSongs}
        numColumns={2}
        keyExtractor={(item) => item.title.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          {
            //marginHorizontal: 10,
          }
        }
        ListEmptyComponent={() => (
          <ListEmptyComponent title={"No songs yet."}></ListEmptyComponent>
        )}
        renderItem={(item) => renderItem(item)}
      />
    );
  };
  const onTouchOutside = () => {
    setWillInflate(!willInflate);
  };
  const onTouchOutsideEditPlaylistModal = () => {
    setInflateEditPlaylistModal(!willInflateEditPlaylistModal);
  };
  const onEditClick = () => {
    refRBSheet.current.open();
  };
  const onEditCancelClick = () => {
    setEditable(false);
    setAllSongsSelected(false);
    let newSongs = playlistSongs.map((v) => ({
      ...v,
      isSelected: false,
      isEditable: false,
    }));
    setPlaylistSongs(newSongs);
    setSelectedSongs([]);
  };
  const onSelectSongs = (item) => {
    const { _id, isSelected } = item.item;
    const thePlaylist = playlistSongs.map((theList) => {
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

    setPlaylistSongs(thePlaylist);
    setUpdating(!isUpdating);
  };

  const deleteSongsFromPlaylistCall = async () => {
    try {
      let payload = {
        songs: selectedSongs,
      };
      let response = await deleteSongsFromPlaylist(playlistId, payload);

      setTimeout(() => {
        setPlaylistSongs(response.songs);
        setSelectedSongs([]);
        setEditable(false);
        setUpdating(!isUpdating);
      }, 100);
      //getPlaylist();
      // if (response.songs) {
      //   setPlaylistSongs(response.songs);
      //   console.log("response is=>>>>>>>>>>>>", JSON.stringify(response.songs));
      //   setEditable(false);
      //   setUpdating(!isUpdating);
      //   setTimeout(() => {
      //     CommonUtility.getInstance().inflateToast(
      //       APP_STRING.SONG_HAS_REMOVED_IN_PLAYLIST
      //     );
      //   }, 1000);
      // }
    } catch (e) {
      setEditable(false);
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };
  const onAllSongsSelection = (newValue) => {
    setAllSongsSelected(newValue);
    let newSongs = playlistSongs.map((v) => ({
      ...v,
      isSelected: newValue,
    }));
    setPlaylistSongs(newSongs);
    if (newValue) {
      setSelectedSongs(playlistSongs);
    } else {
      setSelectedSongs([]);
    }
  };
  const renamePlaylistCall = () => {
    refRBSheet.current.close();
    onTouchOutsideEditPlaylistModal();
  };
  const editPlaylistCall = () => {
    let newSongs = playlistSongs.map((v) => ({
      ...v,
      isSelected: false,
      isEditable: true,
    }));
    setPlaylistSongs(newSongs);
    refRBSheet.current.close();
    setEditable(true);
  };
  const renderItem = (item) => {
    const {
      title,
      coverPhotoUrl,
      about,
      _id,
      songUrl,
      isSelected,
      isEditable,
      averageRating,
    } = item.item;
    let rating = "4.7";
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
            ) : (
              <></>
            )}
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
            source={
              coverPhotoUrl
                ? { uri: coverPhotoUrl }
                : ImageConstant.HOME.IMAGE_PLACEHOLDER
            }
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
          <Text numberOfLines={1} style={globalStyle.about}>
            {about}
          </Text>
        </Pressable>
      );
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
            <Text>Delete Playlist</Text>
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
          <Text style={{ fontSize: 18 }}>{playlistName}</Text>
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
                marginRight: 10,
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
              action={() => [onDeletePlaylistPress(), onTouchOutside()]}
            />
          </View>
        </View>
      </>
    );
  };

  const EditPlaylistNameModal = () => {
    return (
      <DialogView
        onTouchOutside={() => onTouchOutsideEditPlaylistModal()}
        willInflate={willInflateEditPlaylistModal}
        children={EditPlaylistModalContent()}
        onBackPress={() => setInflateEditPlaylistModal(false)}
      ></DialogView>
    );
  };
  const EditPlaylistModalContent = () => {
    return (
      <>
        <View style={globalStyle.connectEmail_wrapper}>
          <View style={globalStyle.alignItems_center}>
            <Pressable onPress={() => onTouchOutsideEditPlaylistModal()}>
              <Image
                style={globalStyle.back_image}
                resizeMode="contain"
                source={ImageConstant.EDITOR_PICK.BACK}
              />
            </Pressable>

            <Text style={{ marginLeft: 20 }}>Edit Playlist Name</Text>
          </View>
          <Pressable onPress={() => [onTouchOutsideEditPlaylistModal()]}>
            <Image
              style={globalStyle.closeDialog}
              resizeMode="contain"
              source={ImageConstant.LOG_IN.CLOSE}
            />
          </Pressable>
        </View>
        <View style={globalStyle.mainContainer}>
          <TextInput
            onChangeText={(text) => setPlaylistName(text)}
            placeholder="enter playlist name"
            maxLength={22}
            value={playlistName}
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
              action={() => [onRenamePlaylistPress()]}
            />
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
          // alignItems: "center",
          paddingHorizontal: 0,
        }}
      >
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
                  onPress={() => [deleteSongsFromPlaylistCall()]}
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
                {playlistHeader}
              </Text>
            </Pressable>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Pressable
                onPress={() => [onEditClick()]}
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  height: 35,
                  width: 35,
                  marginRight: 10,
                }}
              >
                <Image
                  style={{ height: 20, width: 20 }}
                  resizeMode="contain"
                  source={ImageConstant.MY_PROFILE.EDIT}
                />
              </Pressable>
              <Pressable
                onPress={() => onTouchOutside()}
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
            </View>
          </View>
        )}
        <PlayListBottomSheet
          renamePlaylist={() => {
            setPlaylistName(playlistHeader);
            renamePlaylistCall();
          }}
          editPlaylist={() => editPlaylistCall()}
          reference={refRBSheet}
        ></PlayListBottomSheet>
        {VideoContent()}
        {Modal()}
        {EditPlaylistNameModal()}
      </View>
    </>
  );
};
export default PlaylistList;
