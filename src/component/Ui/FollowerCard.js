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

const FollowerCard = (props) => {
  const { onClick, item } = props;
  console.log("onclic==", props.item.item);
  //alert(JSON.stringify(item.item.followingUser.firstname));
  return (
    <Pressable
      onPress={() => onClick(props?.item?.item?.followingUser?._id)}
      style={[
        globalStyle.follower_container,
        globalStyle.justifyContent_spaceBetween,
      ]}
    >
      <View style={[globalStyle.flexRow, globalStyle.alignItems_center]}>
        <Image
          style={globalStyle.following_img_container}
          source={{ uri: item?.item?.followingUser?.profilePhotoUrl }}
        ></Image>
        <Text
          style={[
            globalStyle.playlist_item_name,
            globalStyle.muli_Light,
            globalStyle.marginLeft_13,
          ]}
        >
          {item?.item?.followingUser?.firstname}
        </Text>
      </View>
      <Image
        style={globalStyle.img_container_row}
        source={ImageConstant.HOME.SEE_MORE}
      ></Image>
    </Pressable>
  );
};
export default FollowerCard;
