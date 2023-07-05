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
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import ImageConstant from "../utility/constant/ImageConstant";
import DummyData from "../DummyData/DummyData";
import Loader from "../component/Ui/loader";
import { getAllEditorPickSongs } from "../redux/services/getAllEditorPickSongsService";
import globalStyle from "../assets/styles/styles";
import CommonUtility from "../utility/constant/CommonUtility";
var editorPickArray = [];
var token = null;
const EditorPick = () => {
  const navigation = useNavigation();
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    getAllEditorPickSongsCall();
  }, []);
  const getAllEditorPickSongsCall = async () => {
    try {
      token = await CommonUtility.getInstance().getUserToken();

      setShowLoader(true);
      const response = await getAllEditorPickSongs(token);
      if (response) {
        editorPickArray = response;
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
          <Text style={globalStyle.editor_pick_heading}>EditorPick</Text>
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
        data={editorPickArray}
        numColumns={2}
        keyExtractor={(item) => item.title.toString()}
        showsHorizontalScrollIndicator={false}
        // style={{ backgroundColor: "white", flex: 1 }}
        //style={globalStyle.EditorPick_flatlist_container}
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
export default EditorPick;
