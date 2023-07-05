import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import ImagePicker from "react-native-image-crop-picker";
import COLORS from "../../utility/constant/Colors";
import globalStyle from "../../assets/styles/styles";
import ImageConstant from "../../utility/constant/ImageConstant";

const UploadCard = (props) => {
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
export default UploadCard;
