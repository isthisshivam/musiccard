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
import { getAllTrendingArtist } from "../redux/services/getAllTrendingArtist";
import globalStyle from "../assets/styles/styles";
import CommonUtility from "../utility/constant/CommonUtility";
import APP_STRING from "../utility/constant/StringConstants";
import Loader from "../component/Ui/loader";
var token = null;
const TrendingArtist = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [trendingArtistArray, setTrendingArtist] = useState([]);
  useEffect(() => {
    getAllTrendingArtistCall();
  }, []);
  const getAllTrendingArtistCall = async () => {
    token = await CommonUtility.getInstance().getUserToken();
    try {
      setShowLoader(true);
      const response = await getAllTrendingArtist(token);
      if (response) {
        setTrendingArtist(response);
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
          <Text style={globalStyle.editor_pick_heading}>Trending Artist</Text>
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
        data={trendingArtistArray}
        numColumns={2}
        keyExtractor={(item) => item.firstname.toString()}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={globalStyle.EditorPick_flatlist_container}
        renderItem={(item) => renderItem(item)}
      />
    );
  };
  const renderItem = (item) => {
    const { firstname, about, profilePhotoUrl, songUrl, _id, averageRating } =
      item.item;
    item.item;
    return (
      <Pressable
        onPress={() => navigation.navigate("SingerProfile", _id)}
        style={globalStyle.EditorPick_imageView_container}
      >
        <ImageBackground
          style={globalStyle.image_view_editor_pick}
          resizeMode="cover"
          imageStyle={globalStyle.border_radius_4}
          source={{ uri: profilePhotoUrl }}
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
        <Text numberOfLines={1} style={globalStyle.songname}>
          {firstname}
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

        {VideoContent()}
      </View>
      <Loader isLoading={showLoader}></Loader>
    </>
  );
};
export default TrendingArtist;
