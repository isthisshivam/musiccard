import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import ImageConstant from "../../utility/constant/ImageConstant";
import globalStyle from "../../assets/styles/styles";
import COLORS from "../../utility/constant/Colors";

const Options = (props) => {
  const { onClick, title, image } = props;
  return (
    <Pressable
      onPress={() => onClick()}
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
        {image && (
          <Image
            style={{ height: 22, width: 22, resizeMode: "contain" }}
            source={image}
          ></Image>
        )}

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
          {title}
        </Text>
      </View>
      <Image
        style={{ height: 18, width: 18, resizeMode: "contain" }}
        source={ImageConstant.HOME.SEE_MORE}
      ></Image>
    </Pressable>
  );
};

export default Options;
