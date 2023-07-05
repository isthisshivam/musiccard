import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  Pressable,
  ImageBackground,
  View,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ImageConstant from "../utility/constant/ImageConstant";
import { getUsersPickService } from "../redux/services/userPickService";
import ListEmptyComponent from "../component/Ui/listEmptyComponent";
import globalStyle from "../assets/styles/styles";
import CommonUtility from "../utility/constant/CommonUtility";
import APP_STRING from "../utility/constant/StringConstants";
import Loader from "../component/Ui/loader";
var token = null;
var userName = null;
var userPickArray = [];
const UserPickSong = () => {
  const navigation = useNavigation();
  const loggedInUserData = useSelector((state) => state.loggedInUserReducer);
  const [showLoader, setShowLoader] = useState(false);
  if (loggedInUserData) {
    const { firstname, lastname } = loggedInUserData.userData;
    userName = firstname + " " + lastname;
  }
  useEffect(() => {
    getUsersPickSongs();
  }, []);

  const getUsersPickSongs = async () => {
    try {
      setShowLoader(true);
      const response = await getUsersPickService(token);
      if (response) {
        userPickArray = response;
        setShowLoader(false);
      }
    } catch (e) {
      setShowLoader(false);
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
          <Text style={globalStyle.editor_pick_heading}>
            {userName + ` Pick`}
          </Text>
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
  const VideoContent = () => {
    return (
      <FlatList
        data={userPickArray}
        numColumns={2}
        keyExtractor={(item) => item.title.toString()}
        showsHorizontalScrollIndicator={false}
        //contentContainerStyle={globalStyle.EditorPick_flatlist_container}
        renderItem={(item) => renderItem(item)}
        ListEmptyComponent={<ListEmptyComponent title={"No Songs yet"} />}
      />
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

  return (
    <>
      <View style={globalStyle.EditorPick_container}>
        {<Header onBackClick={() => navigation.goBack()} />}
        <Loader isLoading={showLoader}></Loader>
        {VideoContent()}
      </View>
    </>
  );
};
export default UserPickSong;
