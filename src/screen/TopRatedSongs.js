import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  Pressable,
  ImageBackground,
  View,
  FlatList,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ImageConstant from "../utility/constant/ImageConstant";
import { getAllTopRatedSongs } from "../redux/services/getAllTopRatedSongsService";
import globalStyle from "../assets/styles/styles";
import CommonUtility from "../utility/constant/CommonUtility";
import APP_STRING from "../utility/constant/StringConstants";
import Loader from "../component/Ui/loader";
var token = null;
const TopRatedSongs = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [topRatedSongsArray, setTopRatedSongs] = useState([]);
  useEffect(() => {
    gteTopRatedSongsCall();
  }, []);
  const gteTopRatedSongsCall = async () => {
    token = await CommonUtility.getInstance().getUserToken();
    try {
      setShowLoader(true);
      const response = await getAllTopRatedSongs(token);
      if (response) {
        setTopRatedSongs(response);
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
          <Text style={globalStyle.editor_pick_heading}>Top Rated Songs</Text>
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
        data={topRatedSongsArray}
        numColumns={2}
        keyExtractor={(item) => item.title.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        //contentContainerStyle={globalStyle.EditorPick_flatlist_container}
        renderItem={(item) => renderItem(item)}
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
              <Text style={globalStyle.rating_txt}>
                {parseFloat(averageRating.toFixed(2))}
              </Text>
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
      <View
        style={[
          { backgroundColor: "white", flex: 1 },
          //  globalStyle.EditorPick_container,
        ]}
      >
        {<Header onBackClick={() => navigation.goBack()} />}
        <Loader isLoading={showLoader}></Loader>
        {VideoContent()}
      </View>
    </>
  );
};
export default TopRatedSongs;
